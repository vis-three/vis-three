import { Engine } from "@vis-three/core";
import { WebGLRendererPlugin, } from "@vis-three/plugin-webgl-renderer";
import { EffectComposerPlugin, } from "@vis-three/plugin-effect-composer";
import { OrbitControlsPlugin, } from "@vis-three/plugin-orbit-controls";
import { RenderManagerPlugin, } from "@vis-three/plugin-render-manager";
import { PointerManagerPlugin, } from "@vis-three/plugin-pointer-manager";
import { CSS2DRendererPlugin, } from "@vis-three/plugin-css2d-renderer";
import { CSS3DRendererPlugin, } from "@vis-three/plugin-css3d-renderer";
import { EventManagerPlugin, } from "@vis-three/plugin-event-manager";
import { CameraAdaptivePlugin } from "@vis-three/plugin-camera-adaptive";
import { CSS2DRenderStrategy } from "@vis-three/strategy-css2d-render";
import { CSS3DRenderStrategy } from "@vis-three/strategy-css3d-render";
import { EffectRenderStrategy } from "@vis-three/strategy-effect-render";
import { OrbitRenderStrategy } from "@vis-three/strategy-orbit-render";
import { MultiRendererEventStrategy } from "@vis-three/strategy-multi-renderer";
export class DisplayEngine extends Engine {
    constructor() {
        super();
        this.install(RenderManagerPlugin())
            .install(PointerManagerPlugin())
            .install(EventManagerPlugin())
            .install(WebGLRendererPlugin({
            antialias: true,
            alpha: true,
        }))
            .install(CSS2DRendererPlugin())
            .install(CSS3DRendererPlugin())
            .install(EffectComposerPlugin({
            WebGLMultisampleRenderTarget: true,
        }))
            .install(OrbitControlsPlugin())
            .install(CameraAdaptivePlugin());
        this.exec(CSS2DRenderStrategy())
            .exec(CSS3DRenderStrategy())
            .exec(EffectRenderStrategy())
            .exec(OrbitRenderStrategy())
            .exec(MultiRendererEventStrategy());
    }
}
