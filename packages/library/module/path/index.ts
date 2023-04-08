import { SUPPORT_LIFE_CYCLE } from "@vis-three/middleware";
import { PathCompiler } from "./PathCompiler";
import { PathRule } from "./PathRule";
import PathProcessor from "./processors/PathProcessor";

export default {
  type: "path",
  compiler: PathCompiler,
  rule: PathRule,
  processors: [PathProcessor],
  lifeOrder: SUPPORT_LIFE_CYCLE.ZERO,
};