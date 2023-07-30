import { defineProcessor, EngineSupport } from "@vis-three/middleware";
import { ReflectorCompiler } from "../ReflectorCompiler";
import { getReflectorConfig, ReflectorConfig } from "../ReflectorConfig";

export default defineProcessor<
  ReflectorConfig,
  object,
  EngineSupport,
  ReflectorCompiler
>({
  type: "Reflector",
  config: getReflectorConfig,
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
