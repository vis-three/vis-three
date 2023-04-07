import { defineProcessor, EngineSupport } from "@vis-three/middleware";
import { TemplateCompiler } from "../TemplateCompiler";
import { getTemplateConfig, TemplateConfig } from "../TemplateConfig";

export default defineProcessor<
  TemplateConfig,
  object,
  EngineSupport,
  TemplateCompiler
>({
  type: "template",
  config: getTemplateConfig,
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
