var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
import { getSymbolConfig, defineProcessor, globalAntiShake, Bus, COMPILER_EVENT, Compiler, Rule, SUPPORT_LIFE_CYCLE } from "@vis-three/middleware";
import { BooleanModifier } from "@vis-three/library-modifier";
import { syncObject } from "@vis-three/utils";
const getModifierConfig = function() {
  return Object.assign(getSymbolConfig(), {
    name: "",
    visible: true,
    source: "",
    index: 0
  });
};
const getBooleanModifierConfig = function() {
  return Object.assign(getModifierConfig(), {
    target: "",
    mode: "subtract"
  });
};
const modifyKey = [
  "position.x",
  "position.y",
  "position.z",
  "rotation.x",
  "rotation.y",
  "rotation.z",
  "scale.x",
  "scale.y",
  "scale.z",
  "parent"
];
const cacheTarget = /* @__PURE__ */ new Map();
var BooleanModifierProcessor = defineProcessor({
  type: "BooleanModifier",
  config: getBooleanModifierConfig,
  commands: {
    set: {
      source: () => {
      },
      target: ({ target: modifier, config, engine, compiler }) => {
        globalAntiShake.exec((finish) => {
          if (config.target) {
            const target = engine.compilerManager.getObjectBySymbol(
              config.target
            );
            if (!target) {
              finish && console.warn(
                `Boolean modifier processor can not found object by vid: ${config.target}`
              );
              return false;
            }
            modifier.target = target;
            const renderFun = compiler.cacheRenderFun.get(modifier);
            if (!renderFun) {
              console.error(
                `can not found cache render fun in ${compiler.MODULE} compiler`
              );
              return true;
            }
            const oldTarget = cacheTarget.get(modifier);
            if (oldTarget) {
              for (const key of modifyKey) {
                Bus.compilerEvent.off(
                  oldTarget,
                  `${COMPILER_EVENT.COMPILE}:${key}`,
                  renderFun
                );
              }
              Bus.compilerEvent.off(
                oldTarget.geometry,
                COMPILER_EVENT.UPDATE,
                renderFun
              );
            }
            for (const key of modifyKey) {
              Bus.compilerEvent.on(
                target,
                `${COMPILER_EVENT.COMPILE}:${key}`,
                renderFun
              );
            }
            Bus.compilerEvent.on(
              target.geometry,
              COMPILER_EVENT.UPDATE,
              renderFun
            );
            cacheTarget.set(modifier, target);
            renderFun();
            return true;
          }
          return true;
        });
      },
      $reg: [
        {
          reg: new RegExp(".*"),
          handler({ value, key, target: modifier, compiler }) {
            modifier[key] = value;
            const renderFun = compiler.cacheRenderFun.get(modifier);
            if (!renderFun) {
              console.error(
                `can not found cache render fun in ${compiler.MODULE} compiler`
              );
              return;
            }
            renderFun();
          }
        }
      ]
    }
  },
  create: function(config, engine, compiler) {
    const modifier = new BooleanModifier({
      mode: config.mode
    });
    const renderFun = () => {
      modifier.render();
      compiler.chainRender(modifier);
    };
    compiler.cacheRenderFun.set(modifier, renderFun);
    globalAntiShake.exec((finish) => {
      if (config.source) {
        const source = engine.compilerManager.getObjectBySymbol(
          config.source
        );
        if (!source) {
          finish && console.warn(
            `Boolean modifier processor can not found object by vid: ${config.source}`
          );
          return false;
        }
        for (const key of modifyKey) {
          Bus.compilerEvent.on(
            source,
            `${COMPILER_EVENT.COMPILE}:${key}`,
            renderFun
          );
        }
        Bus.compilerEvent.check(source.geometry) && Bus.compilerEvent.on(
          source.geometry,
          COMPILER_EVENT.UPDATE,
          renderFun
        );
        modifier.source = source;
        compiler.integrateModifer(modifier);
        renderFun();
        return true;
      }
      return true;
    });
    globalAntiShake.exec((finish) => {
      if (config.target) {
        const target = engine.compilerManager.getObjectBySymbol(
          config.target
        );
        if (!target) {
          finish && console.warn(
            `Boolean modifier processor can not found object by vid: ${config.target}`
          );
          return false;
        }
        modifier.target = target;
        for (const key of modifyKey) {
          Bus.compilerEvent.on(
            target,
            `${COMPILER_EVENT.COMPILE}:${key}`,
            renderFun
          );
        }
        Bus.compilerEvent.on(target.geometry, COMPILER_EVENT.UPDATE, renderFun);
        cacheTarget.set(modifier, target);
        renderFun();
        return true;
      }
      return true;
    });
    syncObject(config, modifier, { target: true, source: true });
    return modifier;
  },
  dispose: function(target, engine, compiler) {
    target.dispose();
  }
});
class ModifierCompiler extends Compiler {
  constructor() {
    super();
    __publicField(this, "cacheRenderFun", /* @__PURE__ */ new Map());
    __publicField(this, "sourceModifiers", /* @__PURE__ */ new Map());
  }
  integrateModifer(modifier) {
    if (!this.sourceModifiers.has(modifier.source)) {
      this.sourceModifiers.set(modifier.source, []);
    }
    const list = this.sourceModifiers.get(modifier.source);
    if (!list.includes(modifier)) {
      list.push(modifier);
    }
  }
  chainRender(modifier) {
    if (!this.sourceModifiers.has(modifier.source)) {
      console.error(
        `${this.MODULE} compiler can not found modifier list`,
        modifier
      );
      return;
    }
    const list = this.sourceModifiers.get(modifier.source);
    if (!list.includes(modifier)) {
      console.error(
        `${this.MODULE} compiler: can not found this modifier in source list`,
        modifier
      );
    }
    const renderList = list.slice(list.indexOf(modifier) + 1, list.length);
    for (const modifier2 of renderList) {
      modifier2.render();
    }
  }
}
const ModifierRule = function(notice, compiler) {
  Rule(notice, compiler);
};
var index = {
  type: "modifier",
  compiler: ModifierCompiler,
  rule: ModifierRule,
  processors: [BooleanModifierProcessor],
  lifeOrder: SUPPORT_LIFE_CYCLE.NINE
};
export { index as default };
