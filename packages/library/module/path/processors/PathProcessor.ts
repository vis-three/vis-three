import { defineProcessor, EngineSupport } from "@vis-three/middleware";
import { PathCompiler } from "../PathCompiler";
import { getPathConfig, PathConfig } from "../PathConfig";

export default defineProcessor<
  PathConfig,
  object,
  EngineSupport,
  PathCompiler
>({
  type: "Path",
  config: getPathConfig,
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
