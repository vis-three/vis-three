import { SUPPORT_LIFE_CYCLE } from "@vis-three/middleware";
import { BoneCompiler } from "./BoneCompiler";
import BoneProcessor from "./processors/BoneProcessor";
import { BoneRule } from "./BoneRule";

export * from "./BoneCompiler";
export * from "./BoneConfig";

export default {
  type: "bone",
  object: true,
  compiler: BoneCompiler,
  rule: BoneRule,
  processors: [BoneProcessor],
  lifeOrder: SUPPORT_LIFE_CYCLE.THREE - 2,
};
