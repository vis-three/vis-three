import { SUPPORT_LIFE_CYCLE } from "@vis-three/middleware";
import { CSS2DCompiler } from "./CSS2DCompiler";
import CSS2DPlaneProcessor from "./CSS2DPlaneProcessor";
import { CSS2DRule } from "./CSS2DRule";
export default {
    type: "css2D",
    object: true,
    compiler: CSS2DCompiler,
    rule: CSS2DRule,
    processors: [CSS2DPlaneProcessor],
    lifeOrder: SUPPORT_LIFE_CYCLE.THREE,
};
