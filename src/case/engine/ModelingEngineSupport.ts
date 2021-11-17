import { ModelingEngine } from "../../main";
import { LoadedEvent, LoaderManager, LoaderManagerEventType } from "../../manager/LoaderManager";
import { ResourceManager } from "../../manager/ResourceManager";
import { GeometryCompiler } from "../geometry/GeometryCompiler";
import { GeometryDataSupport } from "../geometry/GeometryDataSupport";
import { LightCompiler } from "../light/LightCompiler";
import { LightDataSupport } from "../light/LightDataSupport";
import { MaterialCompiler } from "../material/MaterialCompiler";
import { MaterialDataSupport } from "../material/MaterialDataSupport";
import { ModelCompiler } from "../model/ModelCompiler";
import { ModelDataSupport } from "../model/ModelDataSupport";
import { TextureCompiler } from "../texture/TextureCompiler";
import { TextureDataSupport } from "../texture/TextureDataSupport";

export interface ModelingEngineSupportParametets {
  dom?: HTMLElement
  lightDataSupport: LightDataSupport,
  geometryDataSupport: GeometryDataSupport,
  modelDataSupport: ModelDataSupport,
  textureDataSupport: TextureDataSupport,
  materialDataSupport: MaterialDataSupport,
  resourceManager: ResourceManager
}

export class ModelingEngineSupport extends ModelingEngine {

  private textureCompiler: TextureCompiler
  private materialCompiler: MaterialCompiler
  private lightCompiler: LightCompiler
  private modelCompiler: ModelCompiler
  private geometryCompiler: GeometryCompiler

  constructor (parameters: ModelingEngineSupportParametets) {
    super(parameters.dom)

    const textureCompiler = new TextureCompiler({
      target: parameters.textureDataSupport.getData()
    })

    const materialCompiler = new MaterialCompiler({
      target: parameters.materialDataSupport.getData()
    })

    const lightCompiler = new LightCompiler({
      scene: this.scene,
      target: parameters.lightDataSupport.getData()
    })

    const geometryCompiler = new GeometryCompiler({
      target: parameters.geometryDataSupport.getData()
    })

    const modelCompiler = new ModelCompiler({
      scene: this.scene,
      target: parameters.modelDataSupport.getData()
    })

    const resourceManager = parameters.resourceManager

    // 建立编译器链接
    materialCompiler.linkTextureMap(textureCompiler.getMap())
    modelCompiler.linkGeometryMap(geometryCompiler.getMap())
    modelCompiler.linkMaterialMap(materialCompiler.getMap())

    textureCompiler.linkRescourceMap(resourceManager.getMappingResourceMap())
    geometryCompiler.linkRescourceMap(resourceManager.getMappingResourceMap())

    // 添加通知
    parameters.textureDataSupport.addCompiler(textureCompiler)
    parameters.materialDataSupport.addCompiler(materialCompiler)
    parameters.lightDataSupport.addCompiler(lightCompiler)
    parameters.geometryDataSupport.addCompiler(geometryCompiler)
    parameters.modelDataSupport.addCompiler(modelCompiler)

    this.textureCompiler = textureCompiler
    this.materialCompiler = materialCompiler
    this.lightCompiler = lightCompiler
    this.modelCompiler = modelCompiler
    this.geometryCompiler = geometryCompiler
  }
}