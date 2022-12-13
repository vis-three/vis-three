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
import { Engine, VisOrbitControls } from "@vis-three/core";
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
    ObjectHelperEngine
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

  declare setStats: (show: boolean) => this;
  declare setTransformControls: (show: boolean) => this;
  declare setViewpoint: (viewpoint: VIEWPOINT) => this;
  declare setAxesHelper: (params: { show: boolean }) => this;
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
  }
}
