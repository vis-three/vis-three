import { PassCompiler } from "./PassCompiler";
import { PassRule } from "./PassRule";
import SelectiveBloomPassProcessor from "./processors/SelectiveBloomPassProcessor";
import SMAAPassProcessor from "./processors/SMAAPassProcessor";
import SSRPassProcessor from "./processors/SSRPassProcessor";
import UnrealBloomPassProcessor from "./processors/UnrealBloomPassProcessor";

export * from "./PassCompiler";
export * from "./PassConfig";

export default {
  type: "pass",
  compiler: PassCompiler,
  rule: PassRule,
  processors: [
    UnrealBloomPassProcessor,
    SMAAPassProcessor,
    SelectiveBloomPassProcessor,
    SSRPassProcessor,
  ],
};
