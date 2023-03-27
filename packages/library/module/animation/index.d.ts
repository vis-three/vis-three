import { AnimationCompiler } from "./AnimationCompiler";
declare const _default: {
    type: string;
    compiler: typeof AnimationCompiler;
    rule: import("@vis-three/middleware").Rule<AnimationCompiler>;
    processors: import("@vis-three/middleware").Processor<import("./AnimationConfig").ScriptAnimationConfig, (event: import("@vis-three/middleware").RenderEvent) => void, import("@vis-three/middleware").EngineSupport, AnimationCompiler>[];
};
export default _default;
