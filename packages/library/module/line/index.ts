import { SUPPORT_LIFE_CYCLE } from "@vis-three/middleware";
import { LineCompiler } from "./LineCompiler";
import LineProcessor from "./processors/LineProcessor";
import { LineRule } from "./LineRule";
import LineSegmentsProcessor from "./processors/LineSegmentsProcessor";

export * from "./LineCompiler";
export * from "./LineConfig";

export default {
  type: "line",
  object: true,
  compiler: LineCompiler,
  rule: LineRule,
  processors: [LineProcessor, LineSegmentsProcessor],
  lifeOrder: SUPPORT_LIFE_CYCLE.THREE,
};
