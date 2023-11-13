import { SUPPORT_LIFE_CYCLE } from "@vis-three/middleware";
import { ReflectorCompiler } from "./ReflectorCompiler";
declare const _default: {
    type: string;
    object: boolean;
    compiler: typeof ReflectorCompiler;
    rule: import("@vis-three/module-object").ObjectRule<ReflectorCompiler, import("./ReflectorConfig").ReflectorConfig, import("three/examples/jsm/objects/Reflector").Reflector>;
    processors: import("@vis-three/middleware").Processor<import("./ReflectorConfig").ReflectorConfig, import("three/examples/jsm/objects/Reflector").Reflector, import("@vis-three/middleware").EngineSupport, ReflectorCompiler>[];
    lifeOrder: SUPPORT_LIFE_CYCLE;
};
export default _default;
