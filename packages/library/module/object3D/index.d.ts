import { SUPPORT_LIFE_CYCLE } from "@vis-three/middleware";
import { Object3DCompiler } from "./Object3DCompiler";
import { Object3DRule } from "./Object3DRule";
export * from "./Object3DConfig";
export * from "./Object3DCompiler";
declare const _default: {
    type: string;
    object: boolean;
    compiler: typeof Object3DCompiler;
    rule: Object3DRule;
    processors: import("@vis-three/middleware").Processor<import("@vis-three/module-object").ObjectConfig, import("three").Object3D<import("three").Event>, import("@vis-three/middleware").EngineSupport, Object3DCompiler>[];
    lifeOrder: SUPPORT_LIFE_CYCLE;
};
export default _default;
