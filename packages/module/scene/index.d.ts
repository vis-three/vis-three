import { SceneCompiler } from "./SceneCompiler";
import { SceneRule } from "./SceneRule";
declare const _default: {
    type: string;
    object: boolean;
    compiler: typeof SceneCompiler;
    rule: SceneRule;
    processors: import("@vis-three/middleware").Processor<import("./SceneConfig").SceneConfig, import("three").Scene, import("@vis-three/middleware").EngineSupport, SceneCompiler>[];
};
export default _default;
