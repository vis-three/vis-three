import { SUPPORT_LIFE_CYCLE } from "@vis-three/middleware";
import { Object3DCompiler } from "./Object3DCompiler";
import Object3DProcessor from "./processors/Object3DProcessor";
import { Object3DRule } from "./Object3DRule";

export * from "./Object3DConfig";
export * from "./Object3DCompiler";

export default {
  type: "object3D",
  object: true,
  compiler: Object3DCompiler,
  rule: Object3DRule,
  processors: [Object3DProcessor],
  lifeOrder: SUPPORT_LIFE_CYCLE.THREE,
};
