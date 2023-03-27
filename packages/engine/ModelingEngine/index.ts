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
} from "@vis-three/plugin-render-manager";
import {
  Screenshot,
  WebGLRendererEngine,
  WebGLRendererPlugin,
} from "@vis-three/plugin-webgl-renderer";
import {
  PointerManager,
  PointerManagerEngine,
  PointerManagerPlugin,
} from "@vis-three/plugin-pointer-manager";
import {
  EventManager,
  EventManagerEngine,
  EventManagerPlugin,
} from "@vis-three/plugin-event-manager";
import {
  EffectComposerEngine,
  EffectComposerPlugin,
} from "@vis-three/plugin-effect-composer";
import {
  OrbitControlsEngine,
  OrbitControlsPlugin,
  VisOrbitControls,
} from "@vis-three/plugin-orbit-controls";
import { CameraAdaptivePlugin } from "@vis-three/plugin-camera-adaptive";
import { SelectionEngine, SelectionPlugin } from "@vis-three/plugin-selection";
import {
  AxesHelperEngine,
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
  VisTransformControls,
} from "@vis-three/plugin-transform-controls";
import { StatsEngine, StatsPlugin } from "@vis-three/plugin-stats";
import {
  KeyboardManager,
  KeyboardManagerEngine,
  KeyboardManagerPlugin,
} from "@vis-three/plugin-keyboard-manager";
import {
  ObjectHelperEngine,
  ObjectHelperPlugin,
  ObjectHelperManager,
} from "@vis-three/plugin-object-helper";
import {
  CSS2DRendererEngine,
  CSS2DRendererPlugin,
} from "@vis-three/plugin-css2d-renderer";
import {
  CSS3DRendererEngine,
  CSS3DRendererPlugin,
} from "@vis-three/plugin-css3d-renderer";

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
