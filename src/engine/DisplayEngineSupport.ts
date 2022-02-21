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
import { Engine, EnginePlugin } from "./Engine";
import { CompilerManager } from "../manager/CompilerManager";
import { DataSupportManager } from "../manager/DataSupportManager";
import { LoaderManager } from "../manager/LoaderManager";
import { MappedEvent, ResourceManager } from "../manager/ResourceManager";
import { EngineSupport, EngineSupportLoadOptions, EngineSupportParameters } from "./EngineSupport";

export class DisplayEngineSupport extends Engine implements EngineSupport {

  IS_ENGINESUPPORT: boolean = true

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

  declare loaderManager: LoaderManager
  declare resourceManager: ResourceManager
  declare dataSupportManager: DataSupportManager
  declare compilerManager: CompilerManager

  declare loadResources: (urlList: Array<string>) => this
  declare registerResources: (resourceMap: {[key: string]: unknown}) => this
  declare toJSON: () => string

  constructor (parameters?: EngineSupportParameters) {
    super()
    this.install(EnginePlugin.WEBGLRENDERER, {
      antialias: true,
      alpha: true
    })
    this.install(EnginePlugin.SCENE)
    this.install(EnginePlugin.RENDERMANAGER)
    this.install(EnginePlugin.EFFECTCOMPOSER, {
      WebGLMultisampleRenderTarget: true
    })
    this.install(EnginePlugin.ORBITCONTROLS)
    this.install(EnginePlugin.POINTERMANAGER)
    this.install(EnginePlugin.EVENTMANAGER)
    .install(EnginePlugin.LOADERMANAGER)
    .install(EnginePlugin.RESOURCEMANAGER)

    if (parameters) {
      this.install(EnginePlugin.DATASUPPORTMANAGER, parameters.dataSupportManager)
    } else {
      this.install(EnginePlugin.DATASUPPORTMANAGER)
    }

    this.install(EnginePlugin.COMPILERMANAGER)
  }

  loadConfig (config: EngineSupportLoadOptions, callback?: (event?: MappedEvent) => void): this {
    const loadLifeCycle = () => {
      const dataSupportManager = this.dataSupportManager

      // 生成贴图
      config.texture && dataSupportManager.load({texture: config.texture})
        
      // 生成材质
      config.material && dataSupportManager.load({material: config.material})

      // 其他

      delete config.texture
      delete config.material

      dataSupportManager.load(config)
    }
    // 导入外部资源
    if (config.assets && config.assets.length) {

      this.loaderManager.reset().load(config.assets)

      const mappedFun = (event: MappedEvent) => {

        delete config.assets
        loadLifeCycle()
        
  
        this.resourceManager.removeEventListener('mapped', mappedFun)
        callback && callback(event)
      }
  
      this.resourceManager.addEventListener<MappedEvent>('mapped', mappedFun)
    } else {
      loadLifeCycle()
      callback && callback()
    }

    return this
  }
}