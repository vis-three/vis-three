import { defineModel } from "@vis-three/tdcm";
import {
  AnimationActionConfig,
  getAnimationActionConfig,
} from "../AnimationActionConfig";
import { AnimationAction, AnimationClip, AnimationMixer } from "three";
import { syncObject } from "@vis-three/utils";

export default defineModel<AnimationActionConfig, { action?: AnimationAction }>(
  {
    type: "AnimationAction",
    config: getAnimationActionConfig,
    commands: {
      set: {
        clip({ target, config, value, engine }) {
          if (target.action) {
            target.action.getMixer().uncacheAction(target.action.getClip());
          }

          const mixer = engine.getObjectBySymbol(
            config.mixer
          ) as AnimationMixer;

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

          target.action = action;
        },
      },
    },
    create({ config, engine }) {
      if (!config.mixer) {
        console.warn(`animation action model must have mixer`);
        return {};
      }

      if (!config.clip) {
        return {};
      }

      const mixer = engine.getObjectBySymbol(config.mixer) as AnimationMixer;

      if (!mixer) {
        console.warn(
          `animation action model can not found animation mixer in engine: ${config.mixer}`
        );

        return {};
      }

      const clip = engine.getObjectBySymbol(config.clip) as AnimationClip;

      if (!clip) {
        console.warn(
          `animation action model can not found animation clip in engine: ${config.clip}`
        );

        return {};
      }

      const action = mixer.clipAction(clip);

      syncObject(config, action, {
        clip: true,
        mixer: true,
      });

      action.play();

      return { action };
    },
    dispose({ target }) {
      if (target.action) {
        const mixer = target.action.getMixer();
        mixer.uncacheAction(target.action.getClip());
        mixer.uncacheClip(target.action.getClip());
      }
    },
  }
);
