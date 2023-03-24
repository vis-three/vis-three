import { defineModule } from "../module";
import { ControlsCompiler } from "./ControlsCompiler";
import { ControlsRule } from "./ControlsRule";


export default defineModule({
  type: "controls",
  compiler: ControlsCompiler,
  rule: ControlsRule,
  processors: [],
});
