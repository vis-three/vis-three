import { Color, HemisphereLight } from "three";
import { HemisphereLightConfig } from "../LightConfig";
declare const _default: import("@vis-three/tdcm").ModelOption<HemisphereLightConfig, HemisphereLight, import("@vis-three/module-object").ObjectModelContext & import("./LightModel").LightContext, import("@vis-three/module-object").ObjectModelShared & import("./LightModel").LightShared & {
    cacheColor: Color;
}, import("./LightModel").WebGLRendererEngineSupport, import("@vis-three/tdcm").Compiler<import("./LightModel").WebGLRendererEngineSupport>, Record<string, import("@vis-three/tdcm").LoadUnit>>;
export default _default;
