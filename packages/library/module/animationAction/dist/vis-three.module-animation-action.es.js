import { Compiler, Bus, Rule, getSymbolConfig, defineProcessor, SUPPORT_LIFE_CYCLE } from "@vis-three/middleware";
import { validate } from "uuid";
import { LoopRepeat, Object3D, AnimationMixer, AnimationClip } from "three";
import { AnimationAction } from "three/src/animation/AnimationAction";
import { syncObject } from "@vis-three/utils";
class AnimationActionCompiler extends Compiler {
  constructor() {
    super();
  }
  updateAction(vid, action) {
    const oldAction = this.map.get(vid);
    if (!oldAction) {
      console.warn(
        `Animation action compiler update action can not found oldAction by:${vid}`
      );
      return;
    }
    this.map.delete(vid);
    this.weakMap.delete(oldAction);
    Bus.compilerEvent.dispose(oldAction);
    this.map.set(vid, action);
    this.weakMap.set(action, vid);
    Bus.compilerEvent.create(action);
    this.cacheCompile = void 0;
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
const emptyObject = new Object3D();
const getEmptyAction = () => new AnimationAction(
  new AnimationMixer(emptyObject),
  new AnimationClip("empty", 1, [])
);
var AnimationActionProcessor = defineProcessor({
  type: "AnimationAction",
  config: getAnimationActionConfig,
  commands: {
    set: {
      clip({ target, config, value, engine, compiler }) {
        let mixer = target.getMixer();
        mixer.uncacheAction(target.getClip());
        mixer = engine.getObjectBySymbol(config.mixer);
        if (!mixer) {
          console.warn(
            `animation action processor can not found animation mixer in engine: ${config.mixer}`
          );
          return;
        }
        const clip = engine.getObjectBySymbol(value);
        if (!clip) {
          console.warn(
            `animation action processor can not found animation clip in engine: ${value}`
          );
        }
        const action = mixer.clipAction(clip);
        action.play();
        compiler.updateAction(config.vid, action);
      }
    }
  },
  create(config, engine) {
    if (!config.mixer) {
      console.warn(`animation action processor must have mixer`);
      return getEmptyAction();
    }
    if (!config.clip) {
      return getEmptyAction();
    }
    const mixer = engine.getObjectBySymbol(config.mixer);
    if (!mixer) {
      console.warn(
        `animation action processor can not found animation mixer in engine: ${config.mixer}`
      );
      return getEmptyAction();
    }
    const clip = engine.getObjectBySymbol(config.clip);
    if (!clip) {
      console.warn(
        `animation action processor can not found animation clip in engine: ${config.clip}`
      );
      return getEmptyAction();
    }
    const action = mixer.clipAction(clip);
    syncObject(config, action, {
      clip: true,
      mixer: true
    });
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
  type: "animationAction",
  compiler: AnimationActionCompiler,
  rule: AnimationActionRule,
  processors: [AnimationActionProcessor],
  lifeOrder: SUPPORT_LIFE_CYCLE.NINE + 1
};
export { AnimationActionCompiler, index as default, getAnimationActionConfig };
