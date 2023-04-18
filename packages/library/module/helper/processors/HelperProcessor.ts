import { defineProcessor, EngineSupport } from "@vis-three/middleware";
import { HelperCompiler } from "../HelperCompiler";
import { getHelperConfig, HelperConfig } from "../HelperConfig";

export default defineProcessor<
  HelperConfig,
  object,
  EngineSupport,
  HelperCompiler
>({
  type: "Helper",
  config: getHelperConfig,
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
