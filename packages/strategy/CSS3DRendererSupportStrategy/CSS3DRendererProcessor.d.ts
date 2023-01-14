import { CSS3DRendererEngine } from "@vis-three/css3d-renderer-plugin";
import { CSS3DRendererConfig, EngineSupport } from "@vis-three/middleware";
import { CSS3DRenderer } from "three/examples/jsm/renderers/CSS3DRenderer";
export interface CSS3DRendererSupportEngine extends EngineSupport, CSS3DRendererEngine {
}
declare const _default: import("@vis-three/middleware").Processor<CSS3DRendererConfig, CSS3DRenderer, CSS3DRendererSupportEngine>;
export default _default;
