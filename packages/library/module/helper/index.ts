import { SUPPORT_LIFE_CYCLE } from "@vis-three/middleware";
import { HelperCompiler } from "./HelperCompiler";
import { HelperRule } from "./HelperRule";
import HelperProcessor from "./processors/HelperProcessor";

export default {
  type: "helper",
  object: true,
  compiler: HelperCompiler,
  rule: HelperRule,
  processors: [HelperProcessor],
  lifeOrder: SUPPORT_LIFE_CYCLE.ZERO,
};