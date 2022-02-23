import {
  Camera,
  Scene,
  WebGLRenderer
} from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { TransformControls } from "three/examples/jsm/controls/TransformControls";
import Stats from "three/examples/jsm/libs/stats.module";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer";
import { ModelingScene } from "../extends/ModelingScene/ModelingScene";
import { EventManager } from "../manager/EventManager";
import { PointerManager } from "../manager/PointerManager";
import { RenderManager } from "../manager/RenderManager";
import { Engine, ENGINEPLUGIN } from "./Engine";

export class ModelingEngine extends Engine{

  declare dom: HTMLElement
  declare webGLRenderer: WebGLRenderer
  declare currentCamera: Camera
  declare scene: ModelingScene
  declare orbitControls: OrbitControls
  declare transformControls: TransformControls
  declare effectComposer: EffectComposer
  declare renderManager: RenderManager
  declare pointerManager: PointerManager
  declare eventManager: EventManager
  declare stats: Stats 
  declare transing: boolean

  declare setSize: (width: number, height: number) => this
  declare setCamera: (camera: Camera) => this
  declare setDom: (dom: HTMLElement) => this
  declare setStats: (show: boolean) => this
  declare setTransformControls: (show: boolean) => this

  declare play: () => this
  declare stop: () => this
  declare render: () => this

  constructor () {
    super()
    this.install(ENGINEPLUGIN.WEBGLRENDERER, {
      antialias: true,
      alpha: true
    })
    .install(ENGINEPLUGIN.MODELINGSCENE, {
      hasDefaultPerspectiveCamera: true,
      hasDefaultOrthographicCamera: true,
      hasAxesHelper: true,
      hasGridHelper: true,
      hasDisplayMode: true,
      displayMode: 'env'
    })
    .install(ENGINEPLUGIN.RENDERMANAGER)
    .install(ENGINEPLUGIN.STATS)
    .install(ENGINEPLUGIN.EFFECTCOMPOSER, {
      WebGLMultisampleRenderTarget: true
    })
    .install(ENGINEPLUGIN.ORBITCONTROLS)
    .install(ENGINEPLUGIN.POINTERMANAGER)
    .install(ENGINEPLUGIN.EVENTMANAGER)
    .install(ENGINEPLUGIN.TRANSFORMCONTROLS)
  }
}