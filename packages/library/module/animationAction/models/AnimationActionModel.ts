import { defineModel } from "@vis-three/tdcm";
import {
  AnimationActionConfig,
  getAnimationActionConfig,
} from "../AnimationActionConfig";
import { AnimationAction, AnimationClip, AnimationMixer } from "three";
import { syncObject } from "@vis-three/utils";

export default defineModel<AnimationActionConfig, AnimationAction>({
  type: "AnimationAction",
  config: getAnimationActionConfig,
  commands: {
    set: {
      clip({ model, target, config, value, engine, compiler }) {
        target.getMixer().uncacheAction(target.getClip());

        compiler.symbolMap.delete(target);

        const mixer = engine.getObjectBySymbol(config.mixer) as AnimationMixer;

        if (!mixer) {
          console.warn(
            `animation action model can not found animation mixer in engine: ${config.mixer}`
          );
          return;
        }

        const clip = engine.getObjectBySymbol(value) as AnimationClip;

        if (!clip) {
          console.warn(
            `animation action model can not found animation clip in engine: ${value}`
          );
        }

        const action = mixer.clipAction(clip);

        action.play();

        model.puppet = action;

        compiler.symbolMap.set(action, config.vid);
      },
    },
  },
  create({ config, engine }) {
    if (!config.mixer) {
      console.warn(`animation action model must have mixer`);
      return {} as AnimationAction;
    }

    if (!config.clip) {
      return {} as AnimationAction;
    }

    const mixer = engine.getObjectBySymbol(config.mixer) as AnimationMixer;

    if (!mixer) {
      console.warn(
        `animation action model can not found animation mixer in engine: ${config.mixer}`
      );

      return {} as AnimationAction;
    }

    const clip = engine.getObjectBySymbol(config.clip) as AnimationClip;

    if (!clip) {
      console.warn(
        `animation action model can not found animation clip in engine: ${config.clip}`
      );

      return {} as AnimationAction;
    }

    const action = mixer.clipAction(clip);

    syncObject(config, action, {
      clip: true,
      mixer: true,
    });

    action.play();

    return action;
  },
  dispose({ target }) {
    const mixer = target.getMixer();
    mixer.uncacheAction(target.getClip());
    mixer.uncacheClip(target.getClip());
  },
});
