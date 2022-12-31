import { EngineSupport, EngineSupportParameters } from "@vis-three/middleware";
import { Screenshot, WebGLRendererEngine } from "@vis-three/webgl-renderer-plugin";
import { CSS2DRendererEngine } from "@vis-three/css2d-renderer-plugin";
import { CSS3DRendererEngine } from "@vis-three/css3d-renderer-plugin";
import { EffectComposerEngine } from "@vis-three/effect-composer-plugin";
import { OrbitControlsEngine } from "@vis-three/orbit-controls-plugin";
import { WebGLRenderer } from "three";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer";
import { CSS2DRenderer } from "three/examples/jsm/renderers/CSS2DRenderer";
import { CSS3DRenderer } from "three/examples/jsm/renderers/CSS3DRenderer";
export declare class DisplayEngineSupport extends EngineSupport implements WebGLRendererEngine, EffectComposerEngine, OrbitControlsEngine, CSS2DRendererEngine, CSS3DRendererEngine {
    webGLRenderer: WebGLRenderer;
    getScreenshot: (params?: Screenshot | undefined) => Promise<string>;
    effectComposer: EffectComposer;
    orbitControls: any;
    css2DRenderer: CSS2DRenderer;
    css3DRenderer: CSS3DRenderer;
    constructor(parameters?: EngineSupportParameters);
}
