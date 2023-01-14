import { EngineSupport, WebGLRendererConfig } from "@vis-three/middleware";
import { WebGLRendererEngine } from "@vis-three/webgl-renderer-plugin";
import { WebGLRenderer } from "three";
export interface WebGLRendererSupportEngine extends EngineSupport, WebGLRendererEngine {
}
declare const _default: import("@vis-three/middleware").Processor<WebGLRendererConfig, WebGLRenderer, WebGLRendererSupportEngine>;
export default _default;
