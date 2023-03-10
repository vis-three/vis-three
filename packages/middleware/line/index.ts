import { defineModule } from "../module";
import { LineCompiler } from "./LineCompiler";
import LineProcessor from "./LineProcessor";
import { LineRule } from "./LineRule";

export default defineModule({
  type: "line",
  compiler: LineCompiler,
  rule: LineRule,
  processors: [LineProcessor],
});
