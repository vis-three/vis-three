import { defineModule } from "../module";
import { LineCompiler } from "./LineCompiler";
import LineProcessor from "./LineProcessor";
import { LineRule } from "./LineRule";

export default defineModule({
  type: "line",
  object: true,
  compiler: LineCompiler,
  rule: LineRule,
  processors: [LineProcessor],
});
