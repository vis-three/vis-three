import { SUPPORT_LIFE_CYCLE } from "@vis-three/middleware";
import { HelperCompiler } from "./HelperCompiler";
export * from "./expand/objectHelper";
export * from "./HelperConfig";
export * from "./HelperCompiler";
declare const _default: {
    type: string;
    compiler: typeof HelperCompiler;
    rule: import("@vis-three/middleware").Rule<HelperCompiler>;
    processors: import("@vis-three/middleware").Processor<import("./HelperConfig").ObjectHelperConfig, import("./processors/ObjectHelperProcessor").ObjectHelper, import("@vis-three/middleware").EngineSupport, HelperCompiler>[];
    lifeOrder: SUPPORT_LIFE_CYCLE;
};
export default _default;
