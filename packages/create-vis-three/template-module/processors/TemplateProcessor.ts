import {
  defineProcessor,
  EngineSupport,
  SymbolConfig,
} from "@vis-three/middleware";
import { TemplateCompiler } from "../TemplateCompiler";
import { getTemplateConfig } from "../TemplateConfig";

export default defineProcessor<
  SymbolConfig,
  object,
  EngineSupport,
  TemplateCompiler
>({
  type: "templateObject",
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
