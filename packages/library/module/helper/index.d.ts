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
    expand: {
        processors: RegExp;
        command: {
            add: {
                helper(): void;
            };
            set: {
                helper(): void;
            };
        };
    }[];
};
export default _default;
