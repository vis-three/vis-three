import { SUPPORT_LIFE_CYCLE } from "@vis-three/middleware";
import { PointsCompiler } from "./PointsCompiler";
import { PointsRule } from "./PointsRule";
declare const _default: {
    type: string;
    object: boolean;
    compiler: typeof PointsCompiler;
    rule: PointsRule;
    processors: import("@vis-three/middleware").Processor<import("./PointsConfig").PointsConfig, import("three").Points<import("three").BufferGeometry, import("three").Material | import("three").Material[]>, import("@vis-three/middleware").EngineSupport, PointsCompiler>[];
    lifeOrder: SUPPORT_LIFE_CYCLE;
};
export default _default;
