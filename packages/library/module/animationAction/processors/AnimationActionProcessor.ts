import { defineProcessor, EngineSupport } from "@vis-three/middleware";
import { AnimationActionCompiler } from "../AnimationActionCompiler";
import { getAnimationActionConfig, AnimationActionConfig } from "../AnimationActionConfig";

export default defineProcessor<
  AnimationActionConfig,
  object,
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
  create(config, engine): object {
    return {};
  },
  dispose() {},
});
