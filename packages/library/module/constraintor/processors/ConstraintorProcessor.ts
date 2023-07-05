import { defineProcessor, EngineSupport } from "@vis-three/middleware";
import { ConstraintorCompiler } from "../ConstraintorCompiler";
import { getConstraintorConfig, ConstraintorConfig } from "../ConstraintorConfig";

export default defineProcessor<
  ConstraintorConfig,
  object,
  EngineSupport,
  ConstraintorCompiler
>({
  type: "Constraintor",
  config: getConstraintorConfig,
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
