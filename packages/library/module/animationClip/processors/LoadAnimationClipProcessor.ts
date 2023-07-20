import { EngineSupport, defineProcessor } from "@vis-three/middleware";
import {
  LoadAnimationClipConfig,
  getLoadAnimationClipConfig,
} from "../AnimationClipConfig";
import { AnimationClip } from "three";
import { AnimationClipCompiler } from "../AnimationClipCompiler";

export default defineProcessor<
  LoadAnimationClipConfig,
  AnimationClip,
  EngineSupport,
  AnimationClipCompiler
>({
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
  dispose(target) {},
});
