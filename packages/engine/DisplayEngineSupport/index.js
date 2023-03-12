import { EngineSupport } from "@vis-three/middleware";
import { WebGLRendererPlugin, } from "@vis-three/webgl-renderer-plugin";
import { CSS2DRendererPlugin, } from "@vis-three/css2d-renderer-plugin";
import { CSS3DRendererPlugin, } from "@vis-three/css3d-renderer-plugin";
import { EffectComposerPlugin, } from "@vis-three/effect-composer-plugin";
import { OrbitControlsPlugin, } from "@vis-three/orbit-controls-plugin";
import { CameraAdaptivePlugin } from "@vis-three/camera-adaptive-plugin";
import { CSS2DRenderStrategy } from "@vis-three/css2d-render-strategy";
import { CSS3DRenderStrategy } from "@vis-three/css3d-render-strategy";
import { EffectRenderStrategy } from "@vis-three/effect-render-strategy";
import { OrbitRenderStrategy } from "@vis-three/orbit-render-strategy";
import { CSS3DRendererSupportStrategy } from "@vis-three/css3d-renderer-support-strategy";
import { WebGLRendererSupportStrategy } from "@vis-three/webgl-renderer-support-strategy";
import { OrbitControlsSupportStrategy } from "@vis-three/orbit-controls-support-strategy";
import PassModule from "@vis-three/module-pass";
export class DisplayEngineSupport extends EngineSupport {
    constructor(parameters) {
        super(parameters);
        this.install(WebGLRendererPlugin({
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
            .exec(CSS3DRendererSupportStrategy())
            .exec(WebGLRendererSupportStrategy())
            .exec(OrbitControlsSupportStrategy());
        this.registModule(PassModule);
    }
}
