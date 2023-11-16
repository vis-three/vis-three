import { SUPPORT_LIFE_CYCLE } from "@vis-three/middleware";
import { WaterCompiler } from "./WaterCompiler";
declare const _default: {
    type: string;
    object: boolean;
    compiler: typeof WaterCompiler;
    rule: import("@vis-three/module-object").ObjectRule<WaterCompiler, import("./WaterConfig").DeepWaterConfig, import("three").Object3D<import("three").Event>>;
    processors: import("@vis-three/middleware").Processor<import("./WaterConfig").DeepWaterConfig, import("three/examples/jsm/objects/Water").Water, import("@vis-three/middleware").EngineSupport, WaterCompiler>[];
    lifeOrder: SUPPORT_LIFE_CYCLE;
};
export default _default;
