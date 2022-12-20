import { EngineSupport } from "@vis-three/middleware";
import { WebGLRendererPlugin, } from "@vis-three/webgl-renderer-plugin";
import { EffectComposerPlugin, } from "@vis-three/effect-composer-plugin";
import { OrbitControlsPlugin, } from "@vis-three/orbit-controls-plugin";
import { CameraAdaptivePlugin } from "@vis-three/camera-adaptive-plugin";
import { SelectionPlugin } from "@vis-three/selection-plugin";
import { AxesHelperPlugin, } from "@vis-three/axes-helper-plugin";
import { GridHelperPlugin, } from "@vis-three/grid-helper-plugin";
import { ViewpointPlugin, } from "@vis-three/viewpoint-plugin";
import { TransformControlsPlugin, } from "@vis-three/transform-controls-plugin";
import { StatsPlugin } from "@vis-three/stats-plugin";
import { KeyboardManagerPlugin, } from "@vis-three/keyboard-manager-plugin";
import { ObjectHelperPlugin, } from "@vis-three/object-helper-plugin";
import { CSS2DRendererPlugin, } from "@vis-three/css2d-renderer-plugin";
import { CSS3DRendererPlugin, } from "@vis-three/css3d-renderer-plugin";
import { CSS2DRenderStrategy } from "@vis-three/css2d-render-strategy";
import { CSS3DRenderStrategy } from "@vis-three/css3d-render-strategy";
import { EffectRenderStrategy } from "@vis-three/effect-render-strategy";
import { OrbitRenderStrategy } from "@vis-three/orbit-render-strategy";
import { OrbitViewpointStrategy } from "@vis-three/orbit-viewpoint-strategy";
import { TransSelectEventStrategy } from "@vis-three/trans-select-event-strategy";
import { StatsRenderStrategy } from "@vis-three/stats-render-strategy";
import { GridViewpointStrategy } from "@vis-three/grid-viewpoint-strategy";
import { TransformKeyboardStrategy } from "@vis-three/transform-keyboard-strategy";
import { HelperSelectInteractStrategy } from "@vis-three/helper-select-interact-strategy";
export class ModelingEngineSupport extends EngineSupport {
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
            .install(CameraAdaptivePlugin())
            .install(SelectionPlugin())
            .install(AxesHelperPlugin())
            .install(GridHelperPlugin())
            .install(ViewpointPlugin())
            .install(TransformControlsPlugin())
            .install(StatsPlugin())
            .install(KeyboardManagerPlugin())
            .install(ObjectHelperPlugin());
        this.exec(CSS2DRenderStrategy())
            .exec(CSS3DRenderStrategy())
            .exec(EffectRenderStrategy())
            .exec(OrbitRenderStrategy())
            .exec(OrbitViewpointStrategy())
            .exec(TransSelectEventStrategy())
            .exec(StatsRenderStrategy())
            .exec(GridViewpointStrategy())
            .exec(TransformKeyboardStrategy())
            .exec(HelperSelectInteractStrategy());
    }
}
