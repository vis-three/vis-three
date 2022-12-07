import { Camera, Object3D, Scene, WebGLRenderer } from "three";
import { TransformControls } from "three/examples/jsm/controls/TransformControls";
import Stats from "three/examples/jsm/libs/stats.module";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer";
import { EventManager } from "../manager/EventManager";
import { KeyboardManager } from "../manager/KeyboardManager";
import { PointerManager } from "../manager/PointerManager";
import { RenderManager } from "../manager/RenderManager";
import { VisOrbitControls } from "../optimize/VisOrbitControls";
import { DISPLAYMODE } from "../../packages/plugins/DisplayModePlugin";
import { VIEWPOINT } from "../../packages/plugins/ViewpointPlugin";
import { Engine, ENGINEPLUGIN } from "./Engine";

export class ModelingEngine extends Engine {
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

  constructor() {
    super();
    this.install(ENGINEPLUGIN.RENDERMANAGER)
      .install(ENGINEPLUGIN.WEBGLRENDERER, {
        antialias: true,
        alpha: true,
      })
      .install(ENGINEPLUGIN.POINTERMANAGER)
      .install(ENGINEPLUGIN.EVENTMANAGER)
      .install(ENGINEPLUGIN.EFFECTCOMPOSER, {
        WebGLMultisampleRenderTarget: true,
      })
      .install(ENGINEPLUGIN.SELECTION)
      .install(ENGINEPLUGIN.AXESHELPER)
      .install(ENGINEPLUGIN.GRIDHELPER)
      .install(ENGINEPLUGIN.OBJECTHELPER)
      .install(ENGINEPLUGIN.VIEWPOINT)
      .install(ENGINEPLUGIN.DISPLAYMODE)
      .install(ENGINEPLUGIN.STATS)
      .install(ENGINEPLUGIN.ORBITCONTROLS)
      .install(ENGINEPLUGIN.KEYBOARDMANAGER)
      .install(ENGINEPLUGIN.TRANSFORMCONTROLS)
      .complete();
  }
}
