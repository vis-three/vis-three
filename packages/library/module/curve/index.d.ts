import { CurveCompiler } from "./CurveCompiler";
export * from "./extends";
declare const _default: {
    type: string;
    object: boolean;
    compiler: typeof CurveCompiler;
    rule: import("@vis-three/middleware").Rule<CurveCompiler>;
    processors: import("@vis-three/middleware").Processor<import("./CurveConfig").ArcCurveConfig, import("./extends").ArcCurve, import("@vis-three/middleware").EngineSupport, CurveCompiler>[];
    lifeOrder: number;
};
export default _default;
