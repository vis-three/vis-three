import { Object3D } from "three";
import { ModelingEngine } from "../../main";
import { DataSupportManager } from "../../manager/DataSupportManager";
import { ResourceManager } from "../../manager/ResourceManager";
import { Compiler, CompilerTarget } from "../../middleware/Compiler";
import { ObjectChangedEvent, VISTRANSFORMEVENTRYPE } from "../../optimize/VisTransformControls";
import { CameraCompiler } from "../camera/CameraCompiler";
import { CameraDataSupport } from "../camera/CameraDataSupport";
import { SymbolConfig } from "../common/CommonConfig";
import { MODULETYPE } from "../constants/MODULETYPE";
import { GeometryCompiler } from "../geometry/GeometryCompiler";
import { GeometryDataSupport } from "../geometry/GeometryDataSupport";
import { LightCompiler } from "../light/LightCompiler";
import { LightDataSupport } from "../light/LightDataSupport";
import { MaterialCompiler } from "../material/MaterialCompiler";
import { MaterialDataSupport } from "../material/MaterialDataSupport";
import { ModelCompiler } from "../model/ModelCompiler";
import { ModelDataSupport } from "../model/ModelDataSupport";
import { RendererCompiler } from "../render/RendererCompiler";
import { RendererDataSupport } from "../render/RendererDataSupport";
import { SceneCompiler } from "../scene/SceneCompiler";
import { SceneDataSupport } from "../scene/SceneDataSupport";
import { TextureCompiler } from "../texture/TextureCompiler";
import { TextureDataSupport } from "../texture/TextureDataSupport";
export interface ModelingEngineSupportParameters {
  dom?: HTMLElement
  dataSupportManager: DataSupportManager
  resourceManager: ResourceManager
}

export class ModelingEngineSupport extends ModelingEngine {

  private compilerMap: Map<MODULETYPE, Compiler>

  private resourceManager: ResourceManager
  private dataSupportManager: DataSupportManager

  private objectConfigMap: WeakMap<Object3D, SymbolConfig>

  constructor (parameters: ModelingEngineSupportParameters) {
    super(parameters.dom)

    // 所有support
    const dataSupportManager = parameters.dataSupportManager
    const textureDataSupport = dataSupportManager.getDataSupport(MODULETYPE.TEXTURE)! as TextureDataSupport
    const materialDataSupport = dataSupportManager.getDataSupport(MODULETYPE.MATERIAL)! as MaterialDataSupport
    const cameraDataSupport = dataSupportManager.getDataSupport(MODULETYPE.CAMERA)! as CameraDataSupport
    const lightDataSupport =  dataSupportManager.getDataSupport(MODULETYPE.LIGHT)! as LightDataSupport
    const geometryDataSupport =  dataSupportManager.getDataSupport(MODULETYPE.GEOMETRY)! as GeometryDataSupport
    const modelDataSupport =  dataSupportManager.getDataSupport(MODULETYPE.MODEL)! as ModelDataSupport
    const rendererDataSupport = dataSupportManager.getDataSupport(MODULETYPE.RENDERER)! as RendererDataSupport
    const sceneDataSupport = dataSupportManager.getDataSupport(MODULETYPE.SCENE)! as SceneDataSupport

    // 物体配置数据
    const cameraSupportData = cameraDataSupport.getData()
    const lightSupportData = lightDataSupport.getData()
    const modelSupportData = modelDataSupport.getData()
    

    const textureCompiler = new TextureCompiler({
      target: textureDataSupport.getData()
    })

    const materialCompiler = new MaterialCompiler({
      target: materialDataSupport.getData()
    })

    const cameraCompiler = new CameraCompiler({
      target: cameraSupportData,
      scene: this.scene
    })

    const lightCompiler = new LightCompiler({
      scene: this.scene,
      target: lightSupportData
    })

    const geometryCompiler = new GeometryCompiler({
      target: geometryDataSupport.getData()
    })

    const modelCompiler = new ModelCompiler({
      scene: this.scene,
      target: modelSupportData
    })

    const rendererCompiler = new RendererCompiler({
      target: rendererDataSupport.getData(),
      glRenderer: this.renderer
    })

    const sceneCompiler = new SceneCompiler({
      target: sceneDataSupport.getData(),
      scene: this.scene
    })

    const resourceManager = parameters.resourceManager

    // 建立编译器链接
    sceneCompiler.linkTextureMap(textureCompiler.getMap())
    materialCompiler.linkTextureMap(textureCompiler.getMap())
    modelCompiler.linkGeometryMap(geometryCompiler.getMap())
    modelCompiler.linkMaterialMap(materialCompiler.getMap())

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

    // 引擎操作更新support —— 同步变换操作
    
    const tempMap = new Map()

    cameraCompiler.getMap().forEach((camera, vid) => {
      tempMap.set(vid, camera)
    })

    lightCompiler.getMap().forEach((light, vid) => {
      tempMap.set(vid, light)
    })

    modelCompiler.getMap().forEach((model, vid) => {
      tempMap.set(vid, model)
    })

    const objectConfigMap = new WeakMap()

    Object.keys(cameraSupportData).forEach(vid => {
      objectConfigMap.set(tempMap.get(vid), cameraSupportData[vid])
    })

    Object.keys(lightSupportData).forEach(vid => {
      objectConfigMap.set(tempMap.get(vid), lightSupportData[vid])
    })

    Object.keys(modelSupportData).forEach(vid => {
      objectConfigMap.set(tempMap.get(vid), modelSupportData[vid])
    })
    
    tempMap.clear() // 清除缓存

    this.transformControls.addEventListener(VISTRANSFORMEVENTRYPE.OBJECTCHANGED, (event) => {
      const e = event as unknown as ObjectChangedEvent
      const mode = e.mode
      
      e.transObjectSet.forEach(object => {
        const config = objectConfigMap.get(object)
        config[mode].x = object[mode].x
        config[mode].y = object[mode].y
        config[mode].z = object[mode].z
      })
    })


    // 缓存编译器
    const compilerMap = new Map()
    compilerMap.set(MODULETYPE.TEXTURE, textureCompiler)
    compilerMap.set(MODULETYPE.MATERIAL, materialCompiler)
    compilerMap.set(MODULETYPE.CAMERA, cameraCompiler)
    compilerMap.set(MODULETYPE.LIGHT, lightCompiler)
    compilerMap.set(MODULETYPE.MODEL, modelCompiler)
    compilerMap.set(MODULETYPE.GEOMETRY, geometryCompiler)
    compilerMap.set(MODULETYPE.RENDERER, rendererCompiler)
    compilerMap.set(MODULETYPE.SCENE, sceneCompiler)

    this.compilerMap = compilerMap

    this.dataSupportManager = parameters.dataSupportManager
    this.resourceManager = parameters.resourceManager

    this.objectConfigMap = objectConfigMap
  }

  getDataSupportManager (): DataSupportManager {
    return this.dataSupportManager
  }

  getResourceManager (): ResourceManager {
    return this.resourceManager
  }

  getCompiler<C extends Compiler> (module: MODULETYPE): C {
    return this.compilerMap.get(module) as C
  }
}