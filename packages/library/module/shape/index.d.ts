import { SUPPORT_LIFE_CYCLE } from "@vis-three/middleware";
import { ShapeCompiler } from "./ShapeCompiler";
export * from "./ShapeCompiler";
export * from "./ShapeConfig";
declare const _default: {
    type: string;
    compiler: typeof ShapeCompiler;
    rule: import("@vis-three/middleware").Rule<ShapeCompiler>;
    processors: import("@vis-three/middleware").Processor<import("./ShapeConfig").ShapeConfig, import("three").Shape, import("@vis-three/middleware").EngineSupport, ShapeCompiler>[];
    lifeOrder: SUPPORT_LIFE_CYCLE;
};
export default _default;
