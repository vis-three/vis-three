import { EngineSupport } from "@vis-three/tdcm";
import { ReflectorConfig } from "../ReflectorConfig";
import { Reflector } from "three/examples/jsm/objects/Reflector.js";
declare const _default: import("@vis-three/tdcm").ModelOption<ReflectorConfig, Reflector, import("@vis-three/module-object").ObjectModelContext, import("@vis-three/module-object").ObjectModelShared & {
    setSize: (reflector: Reflector, config: ReflectorConfig, engine: EngineSupport) => void;
}, EngineSupport, import("@vis-three/tdcm").Compiler<EngineSupport>>;
export default _default;
