import { ShaderMaterial } from "three";
import { ShaderMaterialConfig } from "../MaterialConfig";
declare const _default: import("@vis-three/tdcm").ModelOption<ShaderMaterialConfig, ShaderMaterial, {}, import("./MaterialModel").MaterialModelShared & {
    defaultVertexShader: string;
    defaultFragmentShader: string;
}, import("@vis-three/tdcm").EngineSupport, import("@vis-three/tdcm").Compiler<import("@vis-three/tdcm").EngineSupport>>;
export default _default;
