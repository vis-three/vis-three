import { Compiler, Rule, getSymbolConfig, defineProcessor, SUPPORT_LIFE_CYCLE } from "@vis-three/middleware";
import { validate } from "uuid";
import { LoopRepeat, AnimationMixer, Object3D, AnimationClip } from "three";
import { AnimationAction } from "three/src/animation/AnimationAction";
class AnimationActionCompiler extends Compiler {
  constructor() {
    super();
  }
}
const AnimationActionRule = function(input, compiler, validateFun = validate) {
  Rule(input, compiler, validateFun);
};
const getAnimationActionConfig = function() {
  return Object.assign(getSymbolConfig(), {
    mixer: "",
    clip: "",
    clampWhenFinished: true,
    enabled: true,
    loop: LoopRepeat,
    paused: false,
    repetitions: Infinity,
    timeScale: 1,
    weight: 1,
    zeroSlopeAtEnd: true,
    zeroSlopeAtStart: true
  });
};
const emptyAction = new AnimationAction(
  new AnimationMixer(new Object3D()),
  new AnimationClip("empty", 1, [])
);
var AnimationActionProcessor = defineProcessor({
  type: "AnimationAction",
  config: getAnimationActionConfig,
  commands: {
    add: {},
    set: {},
    delete: {}
  },
  create(config, engine) {
    if (!config.mixer) {
      console.warn(`animation action processor must have mixer`);
      return emptyAction;
    }
    if (!config.clip) {
      console.warn(`animation action processor must have clip`);
      return emptyAction;
    }
    const mixer = engine.getObjectBySymbol(config.mixer);
    if (!mixer) {
      console.warn(
        `animation action processor can not found animation mixer in engine: ${config.mixer}`
      );
      return emptyAction;
    }
    const clip = engine.getObjectBySymbol(config.clip);
    if (!clip) {
      console.warn(
        `animation action processor can not found animation clip in engine: ${config.clip}`
      );
      return emptyAction;
    }
    const action = mixer.clipAction(clip);
    action.play();
    return action;
  },
  dispose(target) {
    const mixer = target.getMixer();
    mixer.uncacheAction(target.getClip());
    mixer.uncacheClip(target.getClip());
  }
});
var index = {
  type: "animation-action",
  compiler: AnimationActionCompiler,
  rule: AnimationActionRule,
  processors: [AnimationActionProcessor],
  lifeOrder: SUPPORT_LIFE_CYCLE.NINE + 1
};
export { AnimationActionCompiler, index as default, getAnimationActionConfig };
