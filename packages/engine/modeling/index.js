import { Engine } from "@vis-three/core";
import { RenderManagerPlugin, } from "@vis-three/plugin-render-manager";
import { WebGLRendererPlugin, } from "@vis-three/plugin-webgl-renderer";
import { PointerManagerPlugin, } from "@vis-three/plugin-pointer-manager";
import { EventManagerPlugin, } from "@vis-three/plugin-event-manager";
import { EffectComposerPlugin, } from "@vis-three/plugin-effect-composer";
import { OrbitControlsPlugin, } from "@vis-three/plugin-orbit-controls";
import { CameraAdaptivePlugin } from "@vis-three/plugin-camera-adaptive";
import { SelectionPlugin } from "@vis-three/plugin-selection";
import { AxesHelperPlugin, } from "@vis-three/plugin-axes-helper";
import { GridHelperPlugin, } from "@vis-three/plugin-grid-helper";
import { ViewpointPlugin, } from "@vis-three/plugin-viewpoint";
import { TransformControlsPlugin, } from "@vis-three/plugin-transform-controls";
import { StatsPlugin } from "@vis-three/plugin-stats";
import { KeyboardManagerPlugin, } from "@vis-three/plugin-keyboard-manager";
import { ObjectHelperPlugin, } from "@vis-three/plugin-object-helper";
import { CSS2DRendererPlugin, } from "@vis-three/plugin-css2d-renderer";
import { CSS3DRendererPlugin, } from "@vis-three/plugin-css3d-renderer";
import { CSS2DRenderStrategy } from "@vis-three/strategy-css2d-render";
import { CSS3DRenderStrategy } from "@vis-three/strategy-css3d-render";
import { EffectRenderStrategy } from "@vis-three/strategy-effect-render";
import { OrbitRenderStrategy } from "@vis-three/strategy-orbit-render";
import { OrbitViewpointStrategy } from "@vis-three/strategy-orbit-viewpoint";
import { TransSelectEventStrategy } from "@vis-three/strategy-trans-select-event";
import { StatsRenderStrategy } from "@vis-three/strategy-stats-render";
import { GridViewpointStrategy } from "@vis-three/strategy-grid-viewpoint";
import { TransformKeyboardStrategy } from "@vis-three/strategy-transform-keyboard";
import { HelperSelectInteractStrategy } from "@vis-three/strategy-helper-select-interact";
export class ModelingEngine extends Engine {
    constructor() {
        super();
        this.install(RenderManagerPlugin())
            .install(WebGLRendererPlugin({
            antialias: true,
            alpha: true,
        }))
            .install(CSS2DRendererPlugin())
            .install(CSS3DRendererPlugin())
            .install(PointerManagerPlugin())
            .install(EventManagerPlugin())
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
