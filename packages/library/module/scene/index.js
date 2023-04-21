import { SUPPORT_LIFE_CYCLE } from "@vis-three/middleware";
import { SceneCompiler } from "./SceneCompiler";
import SceneExtend from "./SceneExtend";
import SceneProcessor from "./SceneProcessor";
import { SceneRule } from "./SceneRule";
export default {
    type: "scene",
    object: true,
    compiler: SceneCompiler,
    rule: SceneRule,
    processors: [SceneProcessor],
    extend: SceneExtend,
    lifeOrder: SUPPORT_LIFE_CYCLE.THREE + 1,
};
