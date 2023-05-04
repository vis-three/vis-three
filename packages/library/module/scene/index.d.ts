import { SceneCompiler } from "./SceneCompiler";
import SceneExtend from "./SceneExtend";
import { SceneRule } from "./SceneRule";
export * from "./SceneCompiler";
export * from "./SceneConfig";
declare const _default: {
    type: string;
    object: boolean;
    compiler: typeof SceneCompiler;
    rule: SceneRule;
    processors: import("@vis-three/middleware").Processor<import("./SceneConfig").SceneConfig, import("three").Scene, import("@vis-three/middleware").EngineSupport, SceneCompiler>[];
    extend: typeof SceneExtend;
    lifeOrder: number;
};
export default _default;
