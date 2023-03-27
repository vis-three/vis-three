import { Object3DCompiler } from "./Object3DCompiler";
import Object3DProcessor from "./Object3DProcessor";
import { Object3DRule } from "./Object3DRule";

export default {
  type: "object3D",
  object: true,
  compiler: Object3DCompiler,
  rule: Object3DRule,
  processors: [Object3DProcessor],
};
