import { ShapeCompiler } from "./ShapeCompiler";
import ShapeProcessor from "./ShapeProcessor";
import { ShapeRule } from "./ShapeRule";

export default {
  type: "shpae",
  compiler: ShapeCompiler,
  rule: ShapeRule,
  processors: [ShapeProcessor],
};
