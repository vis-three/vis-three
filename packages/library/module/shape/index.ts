import { SUPPORT_LIFE_CYCLE } from "@vis-three/middleware";
import { ShapeCompiler } from "./ShapeCompiler";
import { ShapeRule } from "./ShapeRule";
import ShapeProcessor from "./processors/ShapeProcessor";

export default {
  type: "shape",
  object: true,
  compiler: ShapeCompiler,
  rule: ShapeRule,
  processors: [ShapeProcessor],
  lifeOrder: SUPPORT_LIFE_CYCLE.ONE,
};
