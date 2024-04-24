import {
  EngineSupport,
  EngineSupportParameters,
  ModuleOptions,
} from "@vis-three/middleware";
import {
  AxesHelper,
  Color,
  Event,
  GridHelper,
  Object3D,
  Vector3,
  WebGLRenderer,
  WebGLRendererParameters,
} from "three";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer";
import { CSS2DRenderer } from "three/examples/jsm/renderers/CSS2DRenderer";
import { CSS3DRenderer } from "three/examples/jsm/renderers/CSS3DRenderer";
import {
  Screenshot,
  WebGLRendererEngine,
  WebGLRendererPlugin,
} from "@vis-three/plugin-webgl-renderer";

import {
  EffectComposerEngine,
  EffectComposerParameters,
  EffectComposerPlugin,
} from "@vis-three/plugin-effect-composer";
import {
  OrbitControlsEngine,
  OrbitControlsPlugin,
} from "@vis-three/plugin-orbit-controls";
import { CameraAdaptivePlugin } from "@vis-three/plugin-camera-adaptive";
import {
  SelectionSupportEngine,
  SelectionSupportPlugin,
} from "@vis-three/plugin-selection-support";
import {
  AxesHelperEngine,
  AxesHelperOptions,
  AxesHelperPlugin,
} from "@vis-three/plugin-axes-helper";
import {
  GridHelperEngine,
  GridHelperPlugin,
} from "@vis-three/plugin-grid-helper";
import {
  VIEWPOINT,
  ViewpointEngine,
  ViewpointPlugin,
} from "@vis-three/plugin-viewpoint";
import {
  TransformControlsEngine,
  TransformControlsPlugin,
  TransformControls,
} from "@vis-three/plugin-transform-controls";
import { StatsEngine, StatsPlugin } from "@vis-three/plugin-stats";
import {
  KeyboardManager,
  KeyboardManagerEngine,
  KeyboardManagerPlugin,
} from "@vis-three/plugin-keyboard-manager";
import {
  CSS2DRendererEngine,
  CSS2DRendererPlugin,
} from "@vis-three/plugin-css2d-renderer";
import {
  CSS3DRendererEngine,
  CSS3DRendererPlugin,
} from "@vis-three/plugin-css3d-renderer";
import { SelectionEngine, SelectionPlugin } from "@vis-three/plugin-selection";
import { VisStats } from "@vis-three/plugin-stats/VisStats";

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
import {
  PathDrawingEngine,
  PathDrawingPlugin,
} from "@vis-three/plugin-path-drawing";
import {
  Face,
  PathSketcher,
} from "@vis-three/plugin-path-drawing/PathSketcher";
import { MultiRendererEventStrategy } from "@vis-three/strategy-multi-renderer";
import {
  SelectionPromptParameters,
  SelectionPromptStrategy,
} from "@vis-three/strategy-selection-prompt";

export { VIEWPOINT };

export interface ModelingEngineSupportParameters
  extends EngineSupportParameters {
  WebGLRendererPlugin: WebGLRendererParameters;
  EffectComposerPlugin: EffectComposerParameters;
  SelectionPromptStrategy: SelectionPromptParameters;
}

export class ModelingEngineSupport
  extends EngineSupport
  implements
    WebGLRendererEngine,
    EffectComposerEngine,
    OrbitControlsEngine,
    KeyboardManagerEngine,
    StatsEngine,
    TransformControlsEngine,
    ViewpointEngine,
    GridHelperEngine,
    AxesHelperEngine,
    SelectionSupportEngine,
    CSS2DRendererEngine,
    CSS3DRendererEngine,
    PathDrawingEngine
{
  declare webGLRenderer: WebGLRenderer;
  declare getScreenshot: (params?: Screenshot | undefined) => Promise<string>;
  declare effectComposer: EffectComposer;
  declare orbitControls;
  declare keyboardManager: KeyboardManager;
  declare stats: VisStats;
  declare setStats: (show: boolean) => StatsEngine;
  declare transing: boolean;
  declare transformControls: TransformControls;
  declare setTransformControls: (show: boolean) => TransformControlsEngine;
  declare setViewpoint;
  declare gridHelper: GridHelper;
  declare setGridHelper: (show: boolean) => GridHelperEngine;
  declare axesHelper: AxesHelper;
  declare setAxesHelper: (params: AxesHelperOptions) => AxesHelperEngine;
  declare selectionDisable: boolean;
  declare selectionBox: Set<Object3D<Event>>;
  declare setSelectionBox: (objects: Object3D<Event>[]) => SelectionEngine;
  declare setSelectionBoxBySymbol: (
    symbols: string[]
  ) => SelectionSupportEngine;
  declare css2DRenderer: CSS2DRenderer;
  declare css3DRenderer: CSS3DRenderer;
  declare pathSketcher: PathSketcher;
  declare drawPathByPlane: (
    normal: Vector3,
    constant: number,
    offset: Vector3
  ) => PathDrawingEngine;
  declare drawPathByFace: (face: Face, offset: Vector3) => PathDrawingEngine;

  constructor(params: Partial<ModelingEngineSupportParameters> = {}) {
    super(params);
    for (const module of Object.values(moduleLibrary)) {
      this.registModule(module as ModuleOptions<any>);
    }

    for (const parser of Object.values(parserLibrary)) {
      this.resourceManager.addParser(new parser());
    }

    this.install(
      WebGLRendererPlugin(
        params.WebGLRendererPlugin || {
          antialias: true,
          alpha: true,
        }
      )
    )
      .install(CSS2DRendererPlugin())
      .install(CSS3DRendererPlugin())
      .install(
        EffectComposerPlugin(
          params.EffectComposerPlugin || {
            MSAA: true,
          }
        )
      )
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
      .exec(MultiRendererEventStrategy())
      .exec(
        SelectionPromptStrategy(
          params.SelectionPromptStrategy || {
            visibleEdgeColor: new Color("rgb(236, 65, 118)"),
            edgeStrength: 5,
            edgeThickness: 2,
            downSampleRatio: 1.5,
          }
        )
      );
  }
}
