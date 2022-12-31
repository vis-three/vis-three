import { WebGLRendererPlugin, } from "@vis-three/webgl-renderer-plugin";
import { CSS2DRendererPlugin, } from "@vis-three/css2d-renderer-plugin";
import { CSS3DRendererPlugin, } from "@vis-three/css3d-renderer-plugin";
import { EffectComposerPlugin, } from "@vis-three/effect-composer-plugin";
import { OrbitControlsPlugin, } from "@vis-three/orbit-controls-plugin";
import { CameraAdaptivePlugin } from "@vis-three/camera-adaptive-plugin";
import { RenderManagerPlugin, } from "@vis-three/render-manager-plugin";
import { PointerManagerPlugin, } from "@vis-three/pointer-manager-plugin";
import { EventManagerPlugin, } from "@vis-three/event-manager-plugin";
import { CSS2DRenderStrategy } from "@vis-three/css2d-render-strategy";
import { CSS3DRenderStrategy } from "@vis-three/css3d-render-strategy";
import { EffectRenderStrategy } from "@vis-three/effect-render-strategy";
import { OrbitRenderStrategy } from "@vis-three/orbit-render-strategy";
import { Engine } from "@vis-three/core";
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
            .exec(OrbitRenderStrategy());
    }
}
