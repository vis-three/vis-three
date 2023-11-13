import { SUPPORT_LIFE_CYCLE } from "@vis-three/middleware";
import { ReflectorCompiler } from "./ReflectorCompiler";
import { ReflectorRule } from "./ReflectorRule";
import ReflectorProcessor from "./processors/ReflectorProcessor";

export default {
  type: "reflector",
  object: true,
  compiler: ReflectorCompiler,
  rule: ReflectorRule,
  processors: [ReflectorProcessor],
  lifeOrder: SUPPORT_LIFE_CYCLE.THREE,
};
