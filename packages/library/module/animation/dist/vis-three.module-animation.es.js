var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
import { Compiler, Rule, getSymbolConfig, defineProcessor, AniScriptGeneratorManager, SUPPORT_LIFE_CYCLE } from "@vis-three/middleware";
class AnimationCompiler extends Compiler {
  constructor() {
    super();
    __publicField(this, "scriptAniSymbol", "vis.scriptAni");
  }
  restoreAttribute(config) {
    if (!config.target || !config.attribute) {
      return this;
    }
    let target = this.engine.getObjectBySymbol(config.target);
    let configure = this.engine.getConfigBySymbol(config.target);
    if (!target || !configure) {
      console.warn(
        "AnimationCompiler: can not found object target or config in engine",
        config.vid
      );
    }
    const attirbuteList = config.attribute.split(".");
    attirbuteList.shift();
    const attribute = attirbuteList.pop();
    for (const key of attirbuteList) {
      if (target[key] && configure[key]) {
        target = target[key];
        configure = configure[key];
      } else {
        console.warn(
          `AnimationCompiler: object and config attribute are not sync`
        );
        return this;
      }
    }
    target[attribute] = configure[attribute];
    return this;
  }
  cover(config) {
    super.cover(config);
    const fun = this.map.get(config.vid);
    config[Symbol.for(this.scriptAniSymbol)] = fun;
    return this;
  }
  remove(config) {
    this.engine.removeEventListener(
      "render",
      config[Symbol.for(this.scriptAniSymbol)]
    );
    this.restoreAttribute(config);
    delete config[Symbol.for(this.scriptAniSymbol)];
    super.remove(config);
    return this;
  }
  compile(vid, notice) {
    const config = this.target[vid];
    this.restoreAttribute(config);
    super.compile(vid, notice);
    const oldFun = this.map.get(vid);
    const fun = config[Symbol.for(this.scriptAniSymbol)];
    this.map.set(config.vid, fun);
    this.weakMap.delete(oldFun);
    this.weakMap.set(fun, vid);
    return this;
  }
}
const AnimationRule = function(notice, compiler) {
  if (notice.key === "name" && notice.path.length === 1) {
    return;
  }
  Rule(notice, compiler);
};
const getAnimationConfig = function() {
  return Object.assign(getSymbolConfig(), {
    name: "",
    target: "",
    attribute: "",
    play: true
  });
};
const getScriptAnimationConfig = function() {
  return Object.assign(getAnimationConfig(), {
    script: {
      name: ""
    }
  });
};
const getKeyframeAnimationConfig = function() {
  return Object.assign(getAnimationConfig(), {
    script: {
      name: ""
    }
  });
};
const createFunction = function(config, engine) {
  let object = engine.compilerManager.getObjectBySymbol(config.target);
  if (!object) {
    console.warn(`can not found object in enigne: ${config.target}`);
    return () => {
    };
  }
  const attributeList = config.attribute.split(".");
  attributeList.shift();
  const attribute = attributeList.pop();
  for (const key of attributeList) {
    if (object[key] === void 0) {
      console.warn(
        `animaton processor: target object can not found key: ${key}`,
        object
      );
      return () => {
      };
    }
    object = object[key];
  }
  return AniScriptGeneratorManager.generateScript(
    engine,
    object,
    attribute,
    config.script
  );
};
var ScriptAnimationProcessor = defineProcessor({
  type: "ScriptAnimation",
  config: getScriptAnimationConfig,
  commands: {
    set: {
      play({ target, engine, value }) {
        if (value) {
          engine.renderManager.addEventListener("render", target);
        } else {
          engine.renderManager.removeEventListener(
            "render",
            target
          );
        }
      },
      $reg: [
        {
          reg: new RegExp(".*"),
          handler({ config, engine, compiler }) {
            const fun = config[Symbol.for(compiler.scriptAniSymbol)];
            engine.renderManager.removeEventListener("render", fun);
            const newFun = createFunction(config, engine);
            config[Symbol.for(compiler.scriptAniSymbol)] = newFun;
            config.play && engine.renderManager.addEventListener("render", fun);
          }
        }
      ]
    }
  },
  create(config, engine, compiler) {
    const fun = createFunction(config, engine);
    config.play && engine.renderManager.addEventListener("render", fun);
    config[Symbol.for(compiler.scriptAniSymbol)] = fun;
    return fun;
  },
  dispose() {
  }
});
var index = {
  type: "animation",
  compiler: AnimationCompiler,
  rule: AnimationRule,
  processors: [ScriptAnimationProcessor],
  lifeOrder: SUPPORT_LIFE_CYCLE.NINE
};
export { AnimationCompiler, index as default, getKeyframeAnimationConfig, getScriptAnimationConfig };
