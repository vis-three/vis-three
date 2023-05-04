import { SUPPORT_LIFE_CYCLE } from "@vis-three/middleware";
import { PathCompiler } from "./PathCompiler";
export * from "./PathCompiler";
export * from "./PathConfig";
declare const _default: {
    type: string;
    compiler: typeof PathCompiler;
    rule: import("@vis-three/middleware").Rule<PathCompiler>;
    processors: import("@vis-three/middleware").Processor<import("./PathConfig").PathConfig, import("three").Path, import("@vis-three/middleware").EngineSupport, PathCompiler>[];
    lifeOrder: SUPPORT_LIFE_CYCLE;
};
export default _default;
