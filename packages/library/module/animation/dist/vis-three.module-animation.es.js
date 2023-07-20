var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
import { Compiler, Rule, getSymbolConfig, defineProcessor, AniScriptGeneratorManager, SUPPORT_LIFE_CYCLE } from "@vis-three/middleware";
import { AnimationObjectGroup, Object3D, AnimationMixer } from "three";
class AnimationCompiler extends Compiler {
  constructor() {
    super();
    __publicField(this, "scriptAniSymbol", "vis.scriptAni");
  }
  playAnimation(fun) {
    this.engine.renderManager.addEventListener("render", fun);
  }
  stopAnimation(fun) {
    this.engine.renderManager.removeEventListener("render", fun);
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
    if (config.type === "ScriptAnimation") {
      const fun = this.map.get(config.vid);
      config[Symbol.for(this.scriptAniSymbol)] = fun;
    }
    return this;
  }
  remove(config) {
    if (config.type === "ScriptAnimation") {
      this.engine.removeEventListener(
        "render",
        config[Symbol.for(this.scriptAniSymbol)]
      );
      this.restoreAttribute(config);
      delete config[Symbol.for(this.scriptAniSymbol)];
    }
    super.remove(config);
    return this;
  }
  compile(vid, notice) {
    const config = this.target[vid];
    if (config.type === "ScriptAnimation") {
      this.restoreAttribute(config);
      super.compile(vid, notice);
      const oldFun = this.map.get(vid);
      const fun = config[Symbol.for(this.scriptAniSymbol)];
      this.map.set(config.vid, fun);
      this.weakMap.delete(oldFun);
      this.weakMap.set(fun, vid);
      return this;
    }
    super.compile(vid, notice);
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
    play: true
  });
};
const getMixerAnimationConfig = function() {
  return Object.assign(getAnimationConfig(), {
    target: "",
    time: 0,
    timeScale: 1
  });
};
const getScriptAnimationConfig = function() {
  return Object.assign(getAnimationConfig(), {
    target: "",
    script: { name: "" },
    attribute: ""
  });
};
const createFunction = function(config, engine) {
  let object = engine.compilerManager.getObjectBySymbol(
    config.target
  );
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
      play({ target, compiler, value }) {
        if (value) {
          compiler.playAnimation(target);
        } else {
          compiler.stopAnimation(target);
        }
      },
      $reg: [
        {
          reg: new RegExp(".*"),
          handler({ config, engine, compiler }) {
            const fun = config[Symbol.for(compiler.scriptAniSymbol)];
            compiler.stopAnimation(fun);
            const newFun = createFunction(config, engine);
            config[Symbol.for(compiler.scriptAniSymbol)] = newFun;
            config.play && compiler.playAnimation(fun);
          }
        }
      ]
    }
  },
  create(config, engine, compiler) {
    const fun = createFunction(config, engine);
    config.play && compiler.playAnimation(fun);
    config[Symbol.for(compiler.scriptAniSymbol)] = fun;
    return fun;
  },
  dispose(target, engine, compiler) {
    compiler.stopAnimation(target);
  }
});
const cachePlayMap = /* @__PURE__ */ new WeakMap();
var MixerAnimationProcessor = defineProcessor({
  type: "MixerAnimation",
  config: getMixerAnimationConfig,
  create(config, engine, compiler) {
    let target;
    if (Array.isArray(config.target)) {
      target = new AnimationObjectGroup();
      config.target.forEach((vid) => {
        const object = engine.getObjectBySymbol(vid);
        if (!object) {
          console.warn(
            `mixer animation processor can not found vid in engine: ${vid}`
          );
        } else {
          target.add(object);
        }
      });
    } else {
      target = engine.getObjectBySymbol(config.target);
      if (!target) {
        console.warn(
          `mixer animation processor can not found vid in engine: ${config.target}`
        );
        target = new Object3D();
      }
    }
    const mixer = new AnimationMixer(target);
    mixer.time = config.time;
    mixer.timeScale = config.timeScale;
    if (config.play) {
      const fun = (event) => {
        mixer.update(event.delta);
      };
      compiler.playAnimation(fun);
      cachePlayMap.set(mixer, fun);
    }
    return mixer;
  },
  dispose(target, engine, compiler) {
    const fun = cachePlayMap.get(target);
    if (fun) {
      compiler.stopAnimation(fun);
      cachePlayMap.delete(target);
    }
    target.uncacheRoot(target.getRoot());
    target._actions.forEach((action) => {
      const clip = action.getClip();
      target.uncacheClip(clip);
      target.uncacheAction(clip);
    });
  }
});
var index = {
  type: "animation",
  compiler: AnimationCompiler,
  rule: AnimationRule,
  processors: [ScriptAnimationProcessor, MixerAnimationProcessor],
  lifeOrder: SUPPORT_LIFE_CYCLE.NINE
};
export { AnimationCompiler, index as default, getMixerAnimationConfig, getScriptAnimationConfig };
