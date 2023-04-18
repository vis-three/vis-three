import { SUPPORT_LIFE_CYCLE } from "@vis-three/middleware";
import { HelperCompiler } from "./HelperCompiler";
declare const _default: {
    type: string;
    object: boolean;
    compiler: typeof HelperCompiler;
    rule: import("@vis-three/middleware").Rule<HelperCompiler>;
    processors: import("@vis-three/middleware").Processor<import("./HelperConfig").HelperConfig, object, import("@vis-three/middleware").EngineSupport, HelperCompiler>[];
    lifeOrder: SUPPORT_LIFE_CYCLE;
};
export default _default;
