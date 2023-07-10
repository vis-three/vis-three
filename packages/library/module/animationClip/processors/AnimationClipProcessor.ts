import { defineProcessor, EngineSupport } from "@vis-three/middleware";
import { AnimationClipCompiler } from "../AnimationClipCompiler";
import { getAnimationClipConfig, AnimationClipConfig } from "../AnimationClipConfig";

export default defineProcessor<
  AnimationClipConfig,
  object,
  EngineSupport,
  AnimationClipCompiler
>({
  type: "AnimationClip",
  config: getAnimationClipConfig,
  commands: {
    add: {},
    set: {},
    delete: {},
  },
  create(config, engine): object {
    return {};
  },
  dispose() {},
});
