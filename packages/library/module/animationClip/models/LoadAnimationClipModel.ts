import { defineModel } from "@vis-three/tdcm";
import {
  getLoadAnimationClipConfig,
  LoadAnimationClipConfig,
} from "../AnimationClipConfig";
import { AnimationClip } from "three";

export default defineModel<LoadAnimationClipConfig, AnimationClip>({
  type: "LoadAnimationClip",
  config: getLoadAnimationClipConfig,
  create({ config, engine }) {
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
  dispose(target) {},
});
