import { SUPPORT_LIFE_CYCLE } from "@vis-three/middleware";
import { GroupCompiler } from "./GroupCompiler";
import GroupProcessor from "./processors/GroupProcessor";
import { GroupRule } from "./GroupRule";

export * from "./GroupCompiler";
export * from "./GroupConfig";

export default {
  type: "group",
  object: true,
  compiler: GroupCompiler,
  rule: GroupRule,
  processors: [GroupProcessor],
  lifeOrder: SUPPORT_LIFE_CYCLE.THREE,
};
