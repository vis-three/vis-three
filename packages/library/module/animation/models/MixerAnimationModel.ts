import { defineModel, RenderEvent } from "@vis-three/tdcm";
import {
  getMixerAnimationConfig,
  MixerAnimationConfig,
} from "../AnimationConfig";
import { AnimationMixer, AnimationObjectGroup, Object3D } from "three";
import { ENGINE_EVENT } from "@vis-three/core";

export default defineModel<
  MixerAnimationConfig,
  AnimationMixer,
  {
    mixerAni?: (event: RenderEvent) => void;
  }
>({
  type: "MixerAnimation",
  config: getMixerAnimationConfig,
  context() {
    return {
      mixerAni: undefined,
    };
  },
  create({ model, config, engine, compiler }) {
    let target: Object3D | AnimationObjectGroup;

    if (Array.isArray(config.target)) {
      target = new AnimationObjectGroup();
      config.target.forEach((vid) => {
        const object = engine.getObjectBySymbol(vid);
        if (!object) {
          console.warn(
            `mixer animation processor can not found vid in engine: ${vid}`
          );
        } else {
          (<AnimationObjectGroup>target).add(object);
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
      const fun = (event: RenderEvent) => {
        mixer.update(event.delta);
      };

      engine.renderManager.addEventListener<RenderEvent>(
        ENGINE_EVENT.RENDER,
        fun
      );

      model.mixerAni = fun;
    }

    return mixer;
  },
  dispose({ model, target, engine }) {
    if (model.mixerAni) {
      engine.renderManager.removeEventListener<RenderEvent>(
        ENGINE_EVENT.RENDER,
        model.mixerAni
      );

      model.mixerAni = undefined;
    }

    target.uncacheRoot(target.getRoot());
    //@ts-ignore
    target._actions.forEach((action: AnimationAction) => {
      const clip = action.getClip();
      target.uncacheClip(clip);
      target.uncacheAction(clip);
    });
  },
});
