import { PassCompiler } from "./PassCompiler";
import { PassRule } from "./PassRule";
import SelectiveBloomPassProcessor from "./SelectiveBloomPassProcessor";
import SMAAPassProcessor from "./SMAAPassProcessor";
import UnrealBloomPassProcessor from "./UnrealBloomPassProcessor";

export default {
  type: "pass",
  compiler: PassCompiler,
  rule: PassRule,
  processors: [
    UnrealBloomPassProcessor,
    SMAAPassProcessor,
    SelectiveBloomPassProcessor,
  ],
};
