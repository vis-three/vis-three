import { AnimationActionCompiler } from "./AnimationActionCompiler";
export * from "./AnimationActionConfig";
export * from "./AnimationActionCompiler";
declare const _default: {
    type: string;
    object: boolean;
    compiler: typeof AnimationActionCompiler;
    rule: import("@vis-three/middleware").Rule<AnimationActionCompiler>;
    processors: import("@vis-three/middleware").Processor<import("./AnimationActionConfig").AnimationActionConfig, import("three").AnimationAction, import("@vis-three/middleware").EngineSupport, AnimationActionCompiler>[];
    lifeOrder: number;
};
export default _default;
