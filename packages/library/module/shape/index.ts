import { SUPPORT_LIFE_CYCLE } from "@vis-three/middleware";
import { ShapeCompiler } from "./ShapeCompiler";
import { ShapeRule } from "./ShapeRule";
import ShapeProcessor from "./processors/ShapeProcessor";

export * from "./ShapeCompiler";
export * from "./ShapeConfig";

export default {
  type: "shape",
  compiler: ShapeCompiler,
  rule: ShapeRule,
  processors: [ShapeProcessor],
  lifeOrder: SUPPORT_LIFE_CYCLE.ONE,
};
