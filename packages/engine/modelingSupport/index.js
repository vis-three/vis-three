import { EngineSupport } from "@vis-three/middleware";
import { WebGLRendererPlugin, } from "@vis-three/plugin-webgl-renderer";
import { EffectComposerPlugin, } from "@vis-three/plugin-effect-composer";
import { OrbitControlsPlugin, } from "@vis-three/plugin-orbit-controls";
import { CameraAdaptivePlugin } from "@vis-three/plugin-camera-adaptive";
import { SelectionSupportPlugin, } from "@vis-three/plugin-selection-support";
import { AxesHelperPlugin, } from "@vis-three/plugin-axes-helper";
import { GridHelperPlugin, } from "@vis-three/plugin-grid-helper";
import { VIEWPOINT, ViewpointPlugin, } from "@vis-three/plugin-viewpoint";
import { TransformControlsPlugin, } from "@vis-three/plugin-transform-controls";
import { StatsPlugin } from "@vis-three/plugin-stats";
import { KeyboardManagerPlugin, } from "@vis-three/plugin-keyboard-manager";
import { CSS2DRendererPlugin, } from "@vis-three/plugin-css2d-renderer";
import { CSS3DRendererPlugin, } from "@vis-three/plugin-css3d-renderer";
import { SelectionPlugin } from "@vis-three/plugin-selection";
import { CSS2DRenderStrategy } from "@vis-three/strategy-css2d-render";
import { CSS3DRenderStrategy } from "@vis-three/strategy-css3d-render";
import { EffectRenderStrategy } from "@vis-three/strategy-effect-render";
import { OrbitRenderStrategy } from "@vis-three/strategy-orbit-render";
import { OrbitViewpointStrategy } from "@vis-three/strategy-orbit-viewpoint";
import { TransSelectEventSupportStrategy } from "@vis-three/strategy-trans-select-event-support";
import { StatsRenderStrategy } from "@vis-three/strategy-stats-render";
import { GridViewpointStrategy } from "@vis-three/strategy-grid-viewpoint";
import { TransformKeyboardStrategy } from "@vis-three/strategy-transform-keyboard";
import { CSS3DRendererSupportStrategy } from "@vis-three/strategy-css3d-renderer-support";
import { WebGLRendererSupportStrategy } from "@vis-three/strategy-webgl-renderer-support";
import { TransformControlsSupportStrategy } from "@vis-three/strategy-transform-controls-support";
import { OrbitControlsSupportStrategy } from "@vis-three/strategy-orbit-controls-support";
import { ComposerSupportStrategy } from "@vis-three/strategy-composer-support";
import * as moduleLibrary from "@vis-three/library-module";
import * as parserLibrary from "@vis-three/library-parser";
import { PathDrawingPlugin, } from "@vis-three/plugin-path-drawing";
import { MultiRendererEventStrategy } from "@vis-three/strategy-multi-renderer";
export { VIEWPOINT };
export class ModelingEngineSupport extends EngineSupport {
    constructor() {
        super();
        for (const module of Object.values(moduleLibrary)) {
            this.registModule(module);
        }
        for (const parser of Object.values(parserLibrary)) {
            this.resourceManager.addParser(new parser());
        }
        this.install(WebGLRendererPlugin({
            antialias: true,
            alpha: true,
        }))
            .install(CSS2DRendererPlugin())
            .install(CSS3DRendererPlugin())
            .install(EffectComposerPlugin({
            MSAA: true,
        }))
            .install(OrbitControlsPlugin())
            .install(CameraAdaptivePlugin())
            .install(SelectionPlugin())
            .install(SelectionSupportPlugin())
            .install(AxesHelperPlugin())
            .install(GridHelperPlugin())
            .install(ViewpointPlugin())
            .install(TransformControlsPlugin())
            .install(StatsPlugin())
            .install(KeyboardManagerPlugin())
            .install(PathDrawingPlugin());
        this.exec(CSS2DRenderStrategy())
            .exec(CSS3DRenderStrategy())
            .exec(EffectRenderStrategy())
            .exec(OrbitRenderStrategy())
            .exec(OrbitViewpointStrategy())
            .exec(TransSelectEventSupportStrategy())
            .exec(StatsRenderStrategy())
            .exec(GridViewpointStrategy())
            .exec(TransformKeyboardStrategy())
            .exec(CSS3DRendererSupportStrategy())
            .exec(WebGLRendererSupportStrategy())
            .exec(TransformControlsSupportStrategy())
            .exec(OrbitControlsSupportStrategy())
            .exec(ComposerSupportStrategy())
            .exec(MultiRendererEventStrategy());
    }
}
