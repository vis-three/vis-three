import { LUTPassConfig } from "../PassConfig";
import { PassModuleEngine, PassCompiler } from "../PassCompiler";
import { LUTPass } from "three/examples/jsm/postprocessing/LUTPass.js";
import { Data3DTexture, DataTexture } from "three";
declare const _default: import("@vis-three/tdcm").ModelOption<LUTPassConfig, LUTPass, {}, {
    getResource: (config: LUTPassConfig, engine: PassModuleEngine) => DataTexture | Data3DTexture | undefined;
}, PassModuleEngine, PassCompiler>;
export default _default;
