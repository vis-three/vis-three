import { Camera, Object3D, Scene, WebGLRenderer } from "three";
import { TransformControls } from "three/examples/jsm/controls/TransformControls";
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
export class ModelingEngine
  extends Engine
  implements
    WebGLRendererEngine,
    EffectComposerEngine,
    OrbitControlsEngine,
    RenderManagerEngine,
    PointerManagerEngine,
    EventManagerEngine
{
  declare dom: HTMLElement;
  declare webGLRenderer: WebGLRenderer;
  declare camera: Camera;
  declare scene: Scene;
  declare orbitControls: VisOrbitControls;
  declare transformControls: TransformControls;
  declare effectComposer: EffectComposer;
  declare renderManager: RenderManager;
  declare pointerManager: PointerManager;
  declare eventManager: EventManager;
  declare keyboardManager: KeyboardManager;
  declare stats: Stats;
  declare displayMode: DISPLAYMODE;
  declare selectionBox: Set<Object3D>;

  declare setStats: (show: boolean) => this;
  declare setTransformControls: (show: boolean) => this;
  declare setViewpoint: (viewpoint: VIEWPOINT) => this;
  declare setDisplayMode: (mode: DISPLAYMODE) => this;
  declare setAxesHelper: (params: { show: boolean }) => this;
  declare setGridHelper: (params: { show: boolean }) => this;
  declare setObjectHelper: (params: { show: boolean }) => this;

  declare play: () => this;
  declare stop: () => this;
  declare render: () => this;

  declaregetScreenshot: (params?: Screenshot | undefined) => Promise<string>;

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
      .install(ENGINEPLUGIN.SELECTION)
      .install(ENGINEPLUGIN.AXESHELPER)
      .install(ENGINEPLUGIN.GRIDHELPER)
      .install(ENGINEPLUGIN.OBJECTHELPER)
      .install(ENGINEPLUGIN.VIEWPOINT)
      .install(ENGINEPLUGIN.DISPLAYMODE)
      .install(ENGINEPLUGIN.STATS)
      .install(ENGINEPLUGIN.KEYBOARDMANAGER)
      .install(ENGINEPLUGIN.TRANSFORMCONTROLS)
      .complete();
  }
}
