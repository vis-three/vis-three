import { SUPPORT_LIFE_CYCLE } from "@vis-three/middleware";
import { AnimationClipCompiler } from "./AnimationClipCompiler";
export * from "./AnimationClipConfig";
export * from "./AnimationClipCompiler";
declare const _default: {
    type: string;
    object: boolean;
    compiler: typeof AnimationClipCompiler;
    rule: import("@vis-three/middleware").Rule<AnimationClipCompiler>;
    processors: (import("@vis-three/middleware").Processor<import("./AnimationClipConfig").AnimationClipConfig, object, import("@vis-three/middleware").EngineSupport, AnimationClipCompiler> | import("@vis-three/middleware").Processor<import("./AnimationClipConfig").LoadAnimationClipConfig, import("three").AnimationClip, import("@vis-three/middleware").EngineSupport, AnimationClipCompiler>)[];
    lifeOrder: SUPPORT_LIFE_CYCLE;
};
export default _default;
