import { CompilerManager } from "../manager/CompilerManager";
import { DataSupportManager } from "../manager/DataSupportManager";
import { LoaderManager } from "../manager/LoaderManager";
import { MappedEvent, ResourceManager } from "../manager/ResourceManager";
import { ENGINEPLUGIN } from "./Engine";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { TransformControls } from "three/examples/jsm/controls/TransformControls";
import Stats from "three/examples/jsm/libs/stats.module";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer";
import { ModelingScene } from "../extends/ModelingScene/ModelingScene";
import { EventManager } from "../manager/EventManager";
import { PointerManager } from "../manager/PointerManager";
import { RenderManager } from "../manager/RenderManager";
import {
  Camera,
  WebGLRenderer
} from "three";
import { EngineSupport, EngineSupportLoadOptions, EngineSupportParameters } from "./EngineSupport";
import { KeyboardManager } from "../manager/KeyboardManager";

export class ModelingEngineSupport extends EngineSupport {

  IS_ENGINESUPPORT: boolean = true

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
  declare keyboardManager: KeyboardManager
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

  constructor (parameters?: EngineSupportParameters) {
    super(parameters)
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
    .install(ENGINEPLUGIN.KEYBOARDMANAGER)
    .install(ENGINEPLUGIN.TRANSFORMCONTROLS)
    .complete()
  }
}