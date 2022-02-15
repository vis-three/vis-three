import { Engine, EnginePlugin, EnginePluginParams } from '../../engine/Engine';
import { LoadedEvent, LoaderManager } from '../../manager/LoaderManager';
import { MappedEvent, ResourceManager } from '../../manager/ResourceManager';
import { EffectComposerPlugin } from '../../plugins/EffectComposerPlugin';
import { EventManagerPlugin } from '../../plugins/EventManagerPlugin';
import { ModelingSceneSupportPlugin } from '../../plugins/ModelingScenePlugin';
import { OrbitControlsSupportPlugin } from '../../plugins/OrbitControlsPlugin';
import { PointerManagerPlugin } from '../../plugins/PointerManagerPlugin';
import { RendererManagerPlugin } from '../../plugins/RenderManagerPlugin';
import { SceneSupportPlugin } from '../../plugins/ScenePlugin';
import { StatsPlugin } from '../../plugins/StatsPlugin';
import { TransformControlsSupportPlugin } from '../../plugins/TransformControlsPlugin';
import { WebGLRendererSupportPlugin } from '../../plugins/WebGLRendererPlugin';
import { CameraCompiler } from '../camera/CameraCompiler';
import { CameraDataSupport } from '../camera/CameraDataSupport';
import { MODULETYPE } from '../constants/MODULETYPE';
import { ControlsCompiler } from '../controls/ControlsCompiler';
import { ControlsDataSupport } from '../controls/ControlsDataSupport';
import { GeometryCompiler } from '../geometry/GeometryCompiler';
import { GeometryDataSupport } from '../geometry/GeometryDataSupport';
import { LightCompiler } from '../light/LightCompiler';
import { LightDataSupport } from '../light/LightDataSupport';
import { MaterialCompiler } from '../material/MaterialCompiler';
import { MaterialDataSupport } from '../material/MaterialDataSupport';
import { ModelCompiler } from '../model/ModelCompiler';
import { ModelDataSupport } from '../model/ModelDataSupport';
import { RendererCompiler } from '../render/RendererCompiler';
import { RendererDataSupport } from '../render/RendererDataSupport';
import { SceneCompiler } from '../scene/SceneCompiler';
import { SceneDataSupport } from '../scene/SceneDataSupport';
import { TextureCompiler } from '../texture/TextureCompiler';
import { TextureDataSupport } from '../texture/TextureDataSupport';
import { DataSupportManager, LoadOptions } from '../../manager/DataSupportManager';

export interface EngineSupportLoadOptions extends LoadOptions{
  assets?: string[]
}

export interface EngineSupportParameters {
  dataSupportManager: DataSupportManager
}

// 插件处理集合
let pluginHandler: Map<string, Function> = new Map()
pluginHandler.set('WebGLRenderer', WebGLRendererSupportPlugin)
pluginHandler.set('Scene', SceneSupportPlugin)
pluginHandler.set('ModelingScene', ModelingSceneSupportPlugin)
pluginHandler.set('RenderManager', RendererManagerPlugin)
pluginHandler.set('Stats', StatsPlugin)
pluginHandler.set('EffectComposer', EffectComposerPlugin)
pluginHandler.set('PointerManager', PointerManagerPlugin)
pluginHandler.set('EventManager', EventManagerPlugin)
pluginHandler.set('OrbitControls', OrbitControlsSupportPlugin)
pluginHandler.set('TransformControls', TransformControlsSupportPlugin)

export class EngineSupport extends Engine {

  static pluginHandler: Map<string, Function> | undefined = pluginHandler

  dataSupportManager: DataSupportManager = new DataSupportManager()
  resourceManager: ResourceManager = new ResourceManager()
  loaderManager: LoaderManager = new LoaderManager()

  constructor (parameters?: EngineSupportParameters) {
    super()

    if (parameters && parameters.dataSupportManager) {
      this.dataSupportManager = parameters.dataSupportManager
    }

    this.loaderManager.addEventListener<LoadedEvent>('loaded', event => {
      this.resourceManager.mappingResource(event.resourceMap)
    })
  }


  // 注入无需loader的外部资源例如scirpt生成的资源
  mappingResource (resourceMap: Map<string, unknown>): this {
    this.resourceManager.mappingResource(resourceMap)
    return this
  }

  // load 生命周期
  load (config: EngineSupportLoadOptions) {
    // 导入外部资源
    this.loaderManager.reset().load(config.assets || [])

    const mappedFun = () => {
 
      const dataSupportManager = this.dataSupportManager

      // 生成贴图
      config.texture && dataSupportManager.load({texture: config.texture})

      // 生成材质
      config.material && dataSupportManager.load({material: config.material})

      // 其他
      delete config.assets
      delete config.texture
      delete config.material

      dataSupportManager.load(config)

      this.resourceManager.removeEventListener('mapped', mappedFun)
    }

    this.resourceManager.addEventListener<MappedEvent>('mapped', mappedFun)
  }

  // 安装完插件之后开始进行支持
  support (): this {

    // 需要最基本的插件支持
    if (!this.webGLRenderer) {
      console.warn(`support exec must after installed webGLRenderer`)
      return this
    }

    if (!this.scene) {
      console.warn(`support exec must after installed some scene`)
      return this
    }

    if (!this.renderManager) {
      console.warn(`support exec must after installed renderManager`)
      return this
    }

    const dataSupportManager = this.dataSupportManager
    const textureDataSupport = dataSupportManager.getDataSupport(MODULETYPE.TEXTURE)! as TextureDataSupport
    const materialDataSupport = dataSupportManager.getDataSupport(MODULETYPE.MATERIAL)! as MaterialDataSupport
    const cameraDataSupport = dataSupportManager.getDataSupport(MODULETYPE.CAMERA)! as CameraDataSupport
    const lightDataSupport =  dataSupportManager.getDataSupport(MODULETYPE.LIGHT)! as LightDataSupport
    const geometryDataSupport =  dataSupportManager.getDataSupport(MODULETYPE.GEOMETRY)! as GeometryDataSupport
    const modelDataSupport =  dataSupportManager.getDataSupport(MODULETYPE.MODEL)! as ModelDataSupport
    const rendererDataSupport = dataSupportManager.getDataSupport(MODULETYPE.RENDERER)! as RendererDataSupport
    const sceneDataSupport = dataSupportManager.getDataSupport(MODULETYPE.SCENE)! as SceneDataSupport
    const controlsDataSupport = dataSupportManager.getDataSupport(MODULETYPE.CONTROLS)! as ControlsDataSupport

    const textureCompiler = new TextureCompiler({
      target: textureDataSupport.getData()
    })

    const materialCompiler = new MaterialCompiler({
      target: materialDataSupport.getData()
    })

    const cameraCompiler = new CameraCompiler({
      target: cameraDataSupport.getData(),
      scene: this.scene!,
      engine: this
    })

    const lightCompiler = new LightCompiler({
      scene: this.scene!,
      target: lightDataSupport.getData()
    })

    const geometryCompiler = new GeometryCompiler({
      target: geometryDataSupport.getData()
    })

    const modelCompiler = new ModelCompiler({
      scene: this.scene,
      target: modelDataSupport.getData()
    })

    const rendererCompiler = new RendererCompiler({
      target: rendererDataSupport.getData(),
      glRenderer: this.webGLRenderer,
      engine: this
    })

    const sceneCompiler = new SceneCompiler({
      target: sceneDataSupport.getData(),
      scene: this.scene
    })

    const controlsCompiler = new ControlsCompiler({
      target: controlsDataSupport.getData(),
      transformControls: this.transformControls
    })

    const resourceManager = this.resourceManager

    // 建立编译器链接
    sceneCompiler.linkTextureMap(textureCompiler.getMap())
    materialCompiler.linkTextureMap(textureCompiler.getMap())

    modelCompiler
    .linkGeometryMap(geometryCompiler.getMap())
    .linkMaterialMap(materialCompiler.getMap())
    .linkObjectMap(lightCompiler.getMap())
    .linkObjectMap(cameraCompiler.getMap())
    .linkObjectMap(modelCompiler.getMap())

    cameraCompiler
    .linkObjectMap(lightCompiler.getMap())
    .linkObjectMap(cameraCompiler.getMap())
    .linkObjectMap(modelCompiler.getMap())

    textureCompiler.linkRescourceMap(resourceManager.getMappingResourceMap())
    geometryCompiler.linkRescourceMap(resourceManager.getMappingResourceMap())

    // 添加通知
    textureDataSupport.addCompiler(textureCompiler)
    materialDataSupport.addCompiler(materialCompiler)
    cameraDataSupport.addCompiler(cameraCompiler)
    lightDataSupport.addCompiler(lightCompiler)
    geometryDataSupport.addCompiler(geometryCompiler)
    modelDataSupport.addCompiler(modelCompiler)
    rendererDataSupport.addCompiler(rendererCompiler)
    sceneDataSupport.addCompiler(sceneCompiler)
    controlsDataSupport.addCompiler(controlsCompiler)

    return this
  }

  // 重载
  install(plugin: EnginePlugin, params?: EnginePluginParams): this {
    if (EngineSupport.pluginHandler!.has(plugin)) {
      EngineSupport.pluginHandler!.get(plugin)!.call(this, params)
    } else {
      console.error(`EngineSupport can not support ${plugin} plugin.`)
    }
    return this
  }
}