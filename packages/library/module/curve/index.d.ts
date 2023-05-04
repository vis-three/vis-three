import { CurveCompiler } from "./CurveCompiler";
export * from "./extends";
export * from "./CurveCompiler";
export * from "./CurveConfig";
declare const _default: {
    type: string;
    compiler: typeof CurveCompiler;
    rule: import("@vis-three/middleware").Rule<CurveCompiler>;
    processors: (import("@vis-three/middleware").Processor<import("./CurveConfig").ArcCurveConfig, import("./extends").ArcCurve, import("@vis-three/middleware").EngineSupport, CurveCompiler> | import("@vis-three/middleware").Processor<import("./CurveConfig").LineCurveConfig, import("three").LineCurve, import("@vis-three/middleware").EngineSupport, CurveCompiler>)[];
    lifeOrder: number;
};
export default _default;
