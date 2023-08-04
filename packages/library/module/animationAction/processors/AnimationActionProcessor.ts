import { defineProcessor, EngineSupport } from "@vis-three/middleware";
import { AnimationActionCompiler } from "../AnimationActionCompiler";
import {
  getAnimationActionConfig,
  AnimationActionConfig,
} from "../AnimationActionConfig";
import { AnimationClip, AnimationMixer, Object3D } from "three";
import { AnimationAction } from "three/src/animation/AnimationAction";
import { syncObject } from "@vis-three/utils";

const emptyObject = new Object3D();

const getEmptyAction = () =>
  new AnimationAction(
    new AnimationMixer(emptyObject),
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
    set: {
      clip({ target, config, value, engine, compiler }) {
        let mixer = target.getMixer();
        mixer.uncacheAction(target.getClip());

        mixer = engine.getObjectBySymbol(config.mixer) as AnimationMixer;

        if (!mixer) {
          console.warn(
            `animation action processor can not found animation mixer in engine: ${config.mixer}`
          );
          return;
        }

        const clip = engine.getObjectBySymbol(value) as AnimationClip;

        if (!clip) {
          console.warn(
            `animation action processor can not found animation clip in engine: ${value}`
          );
        }

        const action = mixer.clipAction(clip);

        action.play();

        compiler.updateAction(config.vid, action);
      },
    },
  },
  create(config, engine) {
    if (!config.mixer) {
      console.warn(`animation action processor must have mixer`);
      return getEmptyAction();
    }

    if (!config.clip) {
      return getEmptyAction();
    }

    const mixer = engine.getObjectBySymbol(config.mixer) as AnimationMixer;

    if (!mixer) {
      console.warn(
        `animation action processor can not found animation mixer in engine: ${config.mixer}`
      );

      return getEmptyAction();
    }

    const clip = engine.getObjectBySymbol(config.clip) as AnimationClip;

    if (!clip) {
      console.warn(
        `animation action processor can not found animation clip in engine: ${config.clip}`
      );

      return getEmptyAction();
    }

    const action = mixer.clipAction(clip);

    syncObject(config, action, {
      clip: true,
      mixer: true,
    });

    action.play();

    return action;
  },
  dispose(target) {
    const mixer = target.getMixer();
    mixer.uncacheAction(target.getClip());
    mixer.uncacheClip(target.getClip());
  },
});
