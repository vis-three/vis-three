import { SUPPORT_LIFE_CYCLE } from "@vis-three/middleware";
import { SkeletonCompiler } from "./SkeletonCompiler";
import { SkeletonRule } from "./SkeletonRule";
import SkeletonProcessor from "./processors/SkeletonProcessor";
import LoadSkeletonProcessor from "./processors/LoadSkeletonProcessor";

export * from "./SkeletonCompiler";
export * from "./SkeletonConfig";

export default {
  type: "skeleton",
  compiler: SkeletonCompiler,
  rule: SkeletonRule,
  processors: [SkeletonProcessor, LoadSkeletonProcessor],
  lifeOrder: SUPPORT_LIFE_CYCLE.THREE - 1,
};
