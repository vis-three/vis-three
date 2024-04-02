import { SkeletonCompiler } from "./SkeletonCompiler";
export * from "./SkeletonCompiler";
export * from "./SkeletonConfig";
declare const _default: {
    type: string;
    compiler: typeof SkeletonCompiler;
    rule: import("@vis-three/middleware").Rule<SkeletonCompiler>;
    processors: (import("@vis-three/middleware").Processor<import("./SkeletonConfig").SkeletonConfig, import("three").Skeleton, import("@vis-three/middleware").EngineSupport, SkeletonCompiler> | import("@vis-three/middleware").Processor<import("./SkeletonConfig").LoadSkeletonConfig, import("three").Skeleton, import("@vis-three/middleware").EngineSupport, SkeletonCompiler>)[];
    lifeOrder: number;
};
export default _default;
