import { EngineSupport, EngineSupportParameters } from "@vis-three/middleware";
import { AxesHelper, Event, GridHelper, Object3D, WebGLRenderer } from "three";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer";
import { CSS2DRenderer } from "three/examples/jsm/renderers/CSS2DRenderer";
import { CSS3DRenderer } from "three/examples/jsm/renderers/CSS3DRenderer";
import {
  Screenshot,
  WebGLRendererEngine,
  WebGLRendererPlugin,
} from "@vis-three/webgl-renderer-plugin";

import {
  EffectComposerEngine,
  EffectComposerPlugin,
} from "@vis-three/effect-composer-plugin";
import {
  OrbitControlsEngine,
  OrbitControlsPlugin,
} from "@vis-three/orbit-controls-plugin";
import { CameraAdaptivePlugin } from "@vis-three/camera-adaptive-plugin";
import {
  SelectionSupportEngine,
  SelectionSupportPlugin,
} from "@vis-three/selection-support-plugin";
import {
  AxesHelperEngine,
  AxesHelperOptions,
  AxesHelperPlugin,
} from "@vis-three/axes-helper-plugin";
import {
  GridHelperEngine,
  GridHelperPlugin,
} from "@vis-three/grid-helper-plugin";
import {
  VIEWPOINT,
  ViewpointEngine,
  ViewpointPlugin,
} from "@vis-three/viewpoint-plugin";
import {
  TransformControlsEngine,
  TransformControlsPlugin,
  VisTransformControls,
} from "@vis-three/transform-controls-plugin";
import { StatsEngine, StatsPlugin } from "@vis-three/stats-plugin";
import {
  KeyboardManager,
  KeyboardManagerEngine,
  KeyboardManagerPlugin,
} from "@vis-three/keyboard-manager-plugin";
import {
  ObjectHelperEngine,
  ObjectHelperPlugin,
  ObjectHelperManager,
} from "@vis-three/object-helper-plugin";
import {
  CSS2DRendererEngine,
  CSS2DRendererPlugin,
} from "@vis-three/css2d-renderer-plugin";
import {
  CSS3DRendererEngine,
  CSS3DRendererPlugin,
} from "@vis-three/css3d-renderer-plugin";

import { CSS2DRenderStrategy } from "@vis-three/css2d-render-strategy";
import { CSS3DRenderStrategy } from "@vis-three/css3d-render-strategy";
import { EffectRenderStrategy } from "@vis-three/effect-render-strategy";
import { OrbitRenderStrategy } from "@vis-three/orbit-render-strategy";
import { OrbitViewpointStrategy } from "@vis-three/orbit-viewpoint-strategy";
import { TransSelectEventSupportStrategy } from "@vis-three/trans-select-event-support-strategy";
import { StatsRenderStrategy } from "@vis-three/stats-render-strategy";
import { GridViewpointStrategy } from "@vis-three/grid-viewpoint-strategy";
import { TransformKeyboardStrategy } from "@vis-three/transform-keyboard-strategy";
import { HelperSelectInteractStrategy } from "@vis-three/helper-select-interact-strategy";
import { VisStats } from "@vis-three/stats-plugin/VisStats";
import {
  ComposerSupportStrategy,
  PassDataSupport,
  PASS_CONFIGTYPE,
} from "@vis-three/composer-support-strategy";
import { CSS3DRendererSupportStrategy } from "@vis-three/css3d-renderer-support-strategy";
import { WebGLRendererSupportStrategy } from "@vis-three/webgl-renderer-support-strategy";
import { TransformControlsSupportStrategy } from "@vis-three/transform-controls-support-strategy";
import { TransformControlsHelperFilterStrategy } from "@vis-three/transform-controls-helper-filter-strategy";
import { OrbitControlsSupportStrategy } from "@vis-three/orbit-controls-support-strategy";
import { SelectionEngine, SelectionPlugin } from "@vis-three/selection-plugin";

export { VIEWPOINT, PassDataSupport, PASS_CONFIGTYPE };
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
    ObjectHelperEngine,
    CSS2DRendererEngine,
    CSS3DRendererEngine
{
  declare webGLRenderer: WebGLRenderer;
  declare getScreenshot: (params?: Screenshot | undefined) => Promise<string>;
  declare effectComposer: EffectComposer;
  declare orbitControls;
  declare keyboardManager: KeyboardManager;
  declare stats: VisStats;
  declare setStats: (show: boolean) => StatsEngine;
  declare transing: boolean;
  declare transformControls: VisTransformControls;
  declare setTransformControls: (show: boolean) => TransformControlsEngine;
  declare setViewpoint;
  declare gridHelper: GridHelper;
  declare setGridHelper: (show: boolean) => GridHelperEngine;
  declare axesHelper: AxesHelper;
  declare setAxesHelper: (params: AxesHelperOptions) => AxesHelperEngine;
  declare selectionBox: Set<Object3D<Event>>;
  declare setSelectionBox: (objects: Object3D<Event>[]) => SelectionEngine;
  declare setSelectionBoxBySymbol: (
    symbols: string[]
  ) => SelectionSupportEngine;
  declare objectHelperManager: ObjectHelperManager;
  declare setObjectHelper: (show: boolean) => ObjectHelperEngine;
  declare css2DRenderer: CSS2DRenderer;
  declare css3DRenderer: CSS3DRenderer;

  constructor(parameters?: EngineSupportParameters) {
    super(parameters);
    this.install(
      WebGLRendererPlugin({
        antialias: true,
        alpha: true,
      })
    )
      .install(CSS2DRendererPlugin())
      .install(CSS3DRendererPlugin())
      .install(
        EffectComposerPlugin({
          WebGLMultisampleRenderTarget: true,
        })
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
      .install(ObjectHelperPlugin());

    this.exec(CSS2DRenderStrategy())
      .exec(CSS3DRenderStrategy())
      .exec(EffectRenderStrategy())
      .exec(OrbitRenderStrategy())
      .exec(OrbitViewpointStrategy())
      .exec(TransSelectEventSupportStrategy())
      .exec(StatsRenderStrategy())
      .exec(GridViewpointStrategy())
      .exec(TransformKeyboardStrategy())
      .exec(HelperSelectInteractStrategy())
      .exec(ComposerSupportStrategy())
      .exec(CSS3DRendererSupportStrategy())
      .exec(WebGLRendererSupportStrategy())
      .exec(TransformControlsSupportStrategy())
      .exec(TransformControlsHelperFilterStrategy())
      .exec(OrbitControlsSupportStrategy());
  }
}
