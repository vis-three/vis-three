import { SUPPORT_LIFE_CYCLE } from "@vis-three/middleware";
import { AnimationCompiler } from "./AnimationCompiler";
export * from "./AnimationCompiler";
export * from "./AnimationConfig";
declare const _default: {
    type: string;
    compiler: typeof AnimationCompiler;
    rule: import("@vis-three/middleware").Rule<AnimationCompiler>;
    processors: import("@vis-three/middleware").Processor<import("./AnimationConfig").ScriptAnimationConfig, (event: import("@vis-three/middleware").RenderEvent) => void, import("@vis-three/middleware").EngineSupport, AnimationCompiler>[];
    lifeOrder: SUPPORT_LIFE_CYCLE;
};
export default _default;
