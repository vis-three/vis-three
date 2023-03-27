import { LineCompiler } from "./LineCompiler";
import LineProcessor from "./LineProcessor";
import { LineRule } from "./LineRule";

export default {
  type: "line",
  object: true,
  compiler: LineCompiler,
  rule: LineRule,
  processors: [LineProcessor],
};
