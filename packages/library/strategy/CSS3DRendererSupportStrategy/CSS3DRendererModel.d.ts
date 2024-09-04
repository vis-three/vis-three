import { EngineSupport } from "@vis-three/tdcm";
import { RendererConfig } from "@vis-three/module-renderer";
import { CSS3DRendererEngine } from "@vis-three/plugin-css3d-renderer";
import { CSS3DRenderer } from "three/examples/jsm/renderers/CSS3DRenderer.js";
export interface CSS3DRendererConfig extends RendererConfig {
}
export declare const getCSS3DRenderereConfig: () => CSS3DRendererConfig;
export interface CSS3DRendererSupportEngine extends EngineSupport, CSS3DRendererEngine {
}
declare const _default: import("@vis-three/tdcm").ModelOption<CSS3DRendererConfig, CSS3DRenderer, {}, {}, CSS3DRendererSupportEngine, import("@vis-three/tdcm").Compiler<CSS3DRendererSupportEngine>>;
export default _default;
