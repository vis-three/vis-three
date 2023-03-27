import { CSS3DRendererEngine } from "@vis-three/css3d-renderer-plugin";
import { EngineSupport } from "@vis-three/middleware";
import { RendererCompiler } from "@vis-three/module-renderer/RendererCompiler";
import { RendererConfig } from "@vis-three/module-renderer/RendererConfig";
import { CSS3DRenderer } from "three/examples/jsm/renderers/CSS3DRenderer";
export interface CSS3DRendererConfig extends RendererConfig {
}
export declare const getCSS3DRenderereConfig: () => CSS3DRendererConfig;
export interface CSS3DRendererSupportEngine extends EngineSupport, CSS3DRendererEngine {
}
declare const _default: import("@vis-three/middleware").Processor<CSS3DRendererConfig, CSS3DRenderer, CSS3DRendererSupportEngine, RendererCompiler>;
export default _default;
