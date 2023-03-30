import { SUPPORT_LIFE_CYCLE } from "@vis-three/middleware";
import { CSS2DCompiler } from "./CSS2DCompiler";
import { CSS2DRule } from "./CSS2DRule";
declare const _default: {
    type: string;
    object: boolean;
    compiler: typeof CSS2DCompiler;
    rule: CSS2DRule;
    processors: import("@vis-three/middleware").Processor<import("./CSS2DConfig").CSS2DPlaneConfig, import("@vis-three/core").CSS2DPlane, import("@vis-three/middleware").EngineSupport, CSS2DCompiler>[];
    lifeOrder: SUPPORT_LIFE_CYCLE;
};
export default _default;
