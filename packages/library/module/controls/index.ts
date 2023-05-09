import { SUPPORT_LIFE_CYCLE } from "@vis-three/middleware";
import { ControlsCompiler } from "./ControlsCompiler";
import { ControlsRule } from "./ControlsRule";

export * from "./ControlsCompiler";
export * from "./ControlsConfig";

export default {
  type: "controls",
  compiler: ControlsCompiler,
  rule: ControlsRule,
  processors: [],
  lifeOrder: SUPPORT_LIFE_CYCLE.NINE,
};
