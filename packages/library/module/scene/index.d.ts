import { SUPPORT_LIFE_CYCLE } from "@vis-three/middleware";
import { SceneCompiler } from "./SceneCompiler";
import SceneExtend from "./SceneExtend";
import { SceneRule } from "./SceneRule";
declare const _default: {
    type: string;
    object: boolean;
    compiler: typeof SceneCompiler;
    rule: SceneRule;
    processors: import("@vis-three/middleware").Processor<import("./SceneConfig").SceneConfig, import("three").Scene, import("@vis-three/middleware").EngineSupport, SceneCompiler>[];
    extend: typeof SceneExtend;
    lifeOrder: SUPPORT_LIFE_CYCLE;
};
export default _default;
