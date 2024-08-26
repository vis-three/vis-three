import { LUTPassConfig } from "../PassConfig";
import { ComposerEngineSupport, PassCompiler } from "../PassCompiler";
import { LUTPass } from "three/examples/jsm/postprocessing/LUTPass.js";
import { Data3DTexture, DataTexture } from "three";
declare const _default: import("@vis-three/tdcm").ModelOption<LUTPassConfig, LUTPass, {}, {
    getResource: (config: LUTPassConfig, engine: ComposerEngineSupport) => DataTexture | Data3DTexture | undefined;
}, ComposerEngineSupport, PassCompiler>;
export default _default;
