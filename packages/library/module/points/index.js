import { PointsCompiler } from "./PointsCompiler";
import PointsProcessor from "./PointsProcessor";
import { PointsRule } from "./PointsRule";
export default {
    type: "points",
    object: true,
    compiler: PointsCompiler,
    rule: PointsRule,
    processors: [PointsProcessor],
};
