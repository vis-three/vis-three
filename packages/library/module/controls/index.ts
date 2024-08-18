import { defineModule, SUPPORT_LIFE_CYCLE } from "@vis-three/tdcm";
import { ControlsCompiler } from "./ControlsCompiler";
import ControlsRule from "./ControlsRule";

export * from "./ControlsCompiler";
export * from "./ControlsConfig";

export default defineModule({
  type: "controls",
  compiler: ControlsCompiler,
  rule: ControlsRule,
  models: [],
  lifeOrder: SUPPORT_LIFE_CYCLE.NINE,
});
