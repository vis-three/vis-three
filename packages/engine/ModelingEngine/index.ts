import {
  AxesHelper,
  Camera,
  Event,
  GridHelper,
  Object3D,
  Scene,
  WebGLRenderer,
} from "three";
import Stats from "three/examples/jsm/libs/stats.module";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer";
import { Engine } from "@vis-three/core";
import { CSS2DRenderer } from "three/examples/jsm/renderers/CSS2DRenderer";
import { CSS3DRenderer } from "three/examples/jsm/renderers/CSS3DRenderer";
import {
  RenderManager,
  RenderManagerEngine,
  RenderManagerPlugin,
} from "@vis-three/render-manager-plugin";
import {
  Screenshot,
  WebGLRendererEngine,
  WebGLRendererPlugin,
} from "@vis-three/webgl-renderer-plugin";
import {
  PointerManager,
  PointerManagerEngine,
  PointerManagerPlugin,
} from "@vis-three/pointer-manager-plugin";
import {
  EventManager,
  EventManagerEngine,
  EventManagerPlugin,
} from "@vis-three/event-manager-plugin";
import {
  EffectComposerEngine,
  EffectComposerPlugin,
} from "@vis-three/effect-composer-plugin";
import {
  OrbitControlsEngine,
  OrbitControlsPlugin,
  VisOrbitControls,
} from "@vis-three/orbit-controls-plugin";
import { CameraAdaptivePlugin } from "@vis-three/camera-adaptive-plugin";
import { SelectionEngine, SelectionPlugin } from "@vis-three/selection-plugin";
import {
  AxesHelperEngine,
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
import { TransSelectEventStrategy } from "@vis-three/trans-select-event-strategy";
import { StatsRenderStrategy } from "@vis-three/stats-render-strategy";
import { GridViewpointStrategy } from "@vis-three/grid-viewpoint-strategy";
import { TransformKeyboardStrategy } from "@vis-three/transform-keyboard-strategy";
import { HelperSelectInteractStrategy } from "@vis-three/helper-select-interact-strategy";
export class ModelingEngine
  extends Engine
  implements
    WebGLRendererEngine,
    EffectComposerEngine,
    OrbitControlsEngine,
    RenderManagerEngine,
    PointerManagerEngine,
    EventManagerEngine,
    KeyboardManagerEngine,
    StatsEngine,
    TransformControlsEngine,
    ViewpointEngine,
    GridHelperEngine,
    AxesHelperEngine,
    SelectionEngine,
    ObjectHelperEngine,
    CSS2DRendererEngine,
    CSS3DRendererEngine
{
  declare dom: HTMLElement;
  declare webGLRenderer: WebGLRenderer;
  declare camera: Camera;
  declare scene: Scene;
  declare orbitControls: VisOrbitControls;
  declare transformControls: VisTransformControls;
  declare effectComposer: EffectComposer;
  declare renderManager: RenderManager;
  declare pointerManager: PointerManager;
  declare eventManager: EventManager;
  declare keyboardManager: KeyboardManager;
  declare stats: Stats;
  declare selectionBox: Set<Object3D>;
  declare axesHelper: AxesHelper;
  declare gridHelper: GridHelper;
  declare transing: boolean;
  declare objectHelperManager: ObjectHelperManager;
  declare css3DRenderer: CSS3DRenderer;
  declare css2DRenderer: CSS2DRenderer;

  declare setStats: (show: boolean) => this;
  declare setTransformControls: (show: boolean) => this;
  declare setViewpoint: (viewpoint: VIEWPOINT) => this;
  declare setAxesHelper: (show: boolean) => this;
  declare setGridHelper: (show: boolean) => this;
  declare setObjectHelper: (show: boolean) => this;

  declare play: () => this;
  declare stop: () => this;
  declare render: () => this;

  declare getScreenshot: (params?: Screenshot | undefined) => Promise<string>;
  declare setSelectionBox: (objects: Object3D<Event>[]) => this;

  constructor() {
    super();
    this.install(RenderManagerPlugin())
      .install(
        WebGLRendererPlugin({
          antialias: true,
          alpha: true,
        })
      )
      .install(CSS2DRendererPlugin())
      .install(CSS3DRendererPlugin())
      .install(PointerManagerPlugin())
      .install(EventManagerPlugin())
      .install(
        EffectComposerPlugin({
          WebGLMultisampleRenderTarget: true,
        })
      )
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
