import { SSRPassConfig } from "../PassConfig";
import { PassModuleEngine, PassCompiler } from "../PassCompiler";
import { SSRPass } from "three/examples/jsm/postprocessing/SSRPass.js";
import { PlaneGeometry } from "three";
import { ReflectorForSSRPass } from "three/examples/jsm/objects/ReflectorForSSRPass.js";
declare const _default: import("@vis-three/tdcm").ModelOption<SSRPassConfig, SSRPass, {}, {
    defaultGroundGeometry: PlaneGeometry;
    setDefaultGroundGeometry: (config: SSRPassConfig) => PlaneGeometry;
    generateGround: (config: SSRPassConfig, engine: PassModuleEngine) => ReflectorForSSRPass;
    disposeGround: (reflector: ReflectorForSSRPass) => void;
}, PassModuleEngine, PassCompiler>;
export default _default;
