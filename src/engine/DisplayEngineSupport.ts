import {
  Camera,
  WebGLRenderer
} from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer";
import { ModelingScene } from "../extends/ModelingScene/ModelingScene";
import { EventManager } from "../manager/EventManager";
import { PointerManager } from "../manager/PointerManager";
import { RenderManager } from "../manager/RenderManager";
import { Engine, ENGINEPLUGIN } from "./Engine";
import { CompilerManager } from "../manager/CompilerManager";
import { DataSupportManager } from "../manager/DataSupportManager";
import { LoaderManager } from "../manager/LoaderManager";
import { MappedEvent, ResourceManager } from "../manager/ResourceManager";
import { EngineSupport, EngineSupportLoadOptions, EngineSupportParameters } from "./EngineSupport";

export class DisplayEngineSupport extends EngineSupport {

  declare dom: HTMLElement
  declare webGLRenderer: WebGLRenderer
  declare currentCamera: Camera
  declare scene: ModelingScene
  declare orbitControls: OrbitControls
  declare effectComposer: EffectComposer
  declare renderManager: RenderManager
  declare pointerManager: PointerManager
  declare eventManager: EventManager
  declare transing: boolean

  declare setSize: (width: number, height: number) => this
  declare setCamera: (camera: Camera) => this
  declare setDom: (dom: HTMLElement) => this

  declare play: () => this
  declare stop: () => this
  declare render: () => this

  constructor (parameters?: EngineSupportParameters) {
    super()
    this.install(ENGINEPLUGIN.WEBGLRENDERER, {
      antialias: true,
      alpha: true
    })
    this.install(ENGINEPLUGIN.SCENE)
    this.install(ENGINEPLUGIN.RENDERMANAGER)
    this.install(ENGINEPLUGIN.EFFECTCOMPOSER, {
      WebGLMultisampleRenderTarget: true
    })
    this.install(ENGINEPLUGIN.ORBITCONTROLS)
    this.install(ENGINEPLUGIN.POINTERMANAGER)
    this.install(ENGINEPLUGIN.EVENTMANAGER)
    .complete()
  }
}