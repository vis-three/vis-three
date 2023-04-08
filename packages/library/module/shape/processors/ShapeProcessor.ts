import { defineProcessor, EngineSupport } from "@vis-three/middleware";
import { ShapeCompiler } from "../ShapeCompiler";
import { getShapeConfig, ShapeConfig } from "../ShapeConfig";

export default defineProcessor<
  ShapeConfig,
  object,
  EngineSupport,
  ShapeCompiler
>({
  type: "Shape",
  config: getShapeConfig,
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
