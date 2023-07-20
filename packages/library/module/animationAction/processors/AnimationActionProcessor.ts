import { defineProcessor, EngineSupport } from "@vis-three/middleware";
import { AnimationActionCompiler } from "../AnimationActionCompiler";
import {
  getAnimationActionConfig,
  AnimationActionConfig,
} from "../AnimationActionConfig";
import { AnimationClip, AnimationMixer, Object3D } from "three";
import { AnimationAction } from "three/src/animation/AnimationAction";

const emptyAction = new AnimationAction(
  new AnimationMixer(new Object3D()),
  new AnimationClip("empty", 1, [])
);

export default defineProcessor<
  AnimationActionConfig,
  AnimationAction,
  EngineSupport,
  AnimationActionCompiler
>({
  type: "AnimationAction",
  config: getAnimationActionConfig,
  commands: {
    add: {},
    set: {},
    delete: {},
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

    const mixer = engine.getObjectBySymbol(config.mixer) as AnimationMixer;

    if (!mixer) {
      console.warn(
        `animation action processor can not found animation mixer in engine: ${config.mixer}`
      );

      return emptyAction;
    }

    const clip = engine.getObjectBySymbol(config.clip) as AnimationClip;

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
  },
});
