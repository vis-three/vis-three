import { Compiler, Rule, getSymbolConfig, defineProcessor, SUPPORT_LIFE_CYCLE } from "@vis-three/middleware";
import { validate } from "uuid";
import { AnimationClip } from "three";
class AnimationClipCompiler extends Compiler {
  constructor() {
    super();
  }
}
const AnimationClipRule = function(input, compiler, validateFun = validate) {
  Rule(input, compiler, validateFun);
};
const getAnimationClipConfig = function() {
  return Object.assign(getSymbolConfig(), {
    duration: -1,
    tracks: []
  });
};
const getLoadAnimationClipConfig = function() {
  return Object.assign(getSymbolConfig(), {
    url: ""
  });
};
var AnimationClipProcessor = defineProcessor({
  type: "AnimationClip",
  config: getAnimationClipConfig,
  commands: {
    add: {},
    set: {},
    delete: {}
  },
  create(config, engine) {
    return {};
  },
  dispose() {
  }
});
var LoadAnimationClipProcessor = defineProcessor({
  type: "LoadAnimationClip",
  config: getLoadAnimationClipConfig,
  create(config, engine) {
    if (!config.url) {
      console.warn(`load animation clip processor must have url`);
      return new AnimationClip();
    }
    const resourceMap = engine.resourceManager.resourceMap;
    if (!resourceMap.has(config.url)) {
      console.warn(
        `load animation clip processor can not found url in engine: ${config.url}`
      );
      return new AnimationClip();
    }
    return resourceMap.get(config.url);
  },
  dispose(target) {
  }
});
var index = {
  type: "animation-clip",
  compiler: AnimationClipCompiler,
  rule: AnimationClipRule,
  processors: [AnimationClipProcessor, LoadAnimationClipProcessor],
  lifeOrder: SUPPORT_LIFE_CYCLE.ZERO
};
export { AnimationClipCompiler, index as default, getAnimationClipConfig, getLoadAnimationClipConfig };
