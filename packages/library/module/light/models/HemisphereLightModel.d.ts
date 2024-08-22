import { Color, HemisphereLight } from "three";
import { HemisphereLightConfig } from "../LightConfig";
declare const _default: import("@vis-three/tdcm").ModelOption<HemisphereLightConfig, HemisphereLight, import("@vis-three/module-object").ObjectModelContext & import("./LightModel").LightContext, import("./LightModel").LightShared & {
    cacheColor: Color;
}, import("./LightModel").WebGLRendererEngineSupport, import("@vis-three/tdcm").Compiler<import("./LightModel").WebGLRendererEngineSupport>>;
export default _default;
