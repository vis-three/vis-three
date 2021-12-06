import { TextureDataSupport } from "../case/texture/TextureDataSupport";
import { ModelDataSupport } from "../case/model/ModelDataSupport";
import { MaterialDataSupport } from "../case/material/MaterialDataSupport";
import { LightDataSupport } from "../case/light/LightDataSupport";
import { GeometryDataSupport } from "../case/geometry/GeometryDataSupport";
import { CameraDataSupport } from "../case/camera/CameraDataSupport";
import { TextureCompilerTarget } from "../case/texture/TextureCompiler";
import { ModelCompilerTarget } from "../case/model/ModelCompiler";
import { LightCompilerTarget } from "../case/light/LightCompiler";
import { GeometryCompilerTarget } from "../case/geometry/GeometryCompiler";
import { CameraCompilerTarget } from "../case/camera/CameraCompiler";
import { MaterialCompilerTarget } from "../case/material/MaterialCompiler";
import { MODULETYPE } from "../case/constants/MODULETYPE";
import { RendererCompilerTarget } from "../case/render/RendererCompiler";
import { RendererDataSupport } from "../case/render/RendererDataSupport";

export interface DataSupportManagerLoadOptions {
  [MODULETYPE.TEXTURE]?: TextureCompilerTarget,
  [MODULETYPE.MATERIAL]?: MaterialCompilerTarget,
  [MODULETYPE.LIGHT]?: LightCompilerTarget,
  [MODULETYPE.GEOMETRY]?: GeometryCompilerTarget,
  [MODULETYPE.MODEL]?: ModelCompilerTarget
  [MODULETYPE.CAMERA]?: CameraCompilerTarget
  [MODULETYPE.RENDERER]?: RendererCompilerTarget
}

export type DataSupportAllType =
  CameraDataSupport |
  LightDataSupport |
  GeometryDataSupport |
  ModelDataSupport |
  TextureDataSupport |
  MaterialDataSupport |
  RendererDataSupport

export interface DataSupportManagerParameters {
  cameraDataSupport?: CameraDataSupport
  lightDataSupport?: LightDataSupport
  geometryDataSupport?: GeometryDataSupport
  modelDataSupport?: ModelDataSupport
  textureDataSupport?: TextureDataSupport
  materialDataSupport?: MaterialDataSupport
  rendererDataSupport?: RendererDataSupport
}

export class DataSupportManager {
  private cameraDataSupport: CameraDataSupport
  private lightDataSupport: LightDataSupport
  private geometryDataSupport: GeometryDataSupport
  private modelDataSupport: ModelDataSupport
  private textureDataSupport: TextureDataSupport
  private materialDataSupport: MaterialDataSupport
  private rendererDataSupport: RendererDataSupport

  private dataSupportMap: Map<MODULETYPE, DataSupportAllType>


  constructor (parameters?: DataSupportManagerParameters) {
    this.cameraDataSupport = parameters?.cameraDataSupport || new CameraDataSupport()
    this.lightDataSupport = parameters?.lightDataSupport || new LightDataSupport()
    this.geometryDataSupport = parameters?.geometryDataSupport || new GeometryDataSupport()
    this.modelDataSupport = parameters?.modelDataSupport || new ModelDataSupport()
    this.textureDataSupport = parameters?.textureDataSupport || new TextureDataSupport()
    this.materialDataSupport = parameters?.materialDataSupport || new MaterialDataSupport()
    this.rendererDataSupport = parameters?.rendererDataSupport || new RendererDataSupport()

    const dataSupportMap = new Map()

    dataSupportMap.set(MODULETYPE.CAMERA, this.cameraDataSupport)
    dataSupportMap.set(MODULETYPE.LIGHT, this.lightDataSupport)
    dataSupportMap.set(MODULETYPE.GEOMETRY, this.geometryDataSupport)
    dataSupportMap.set(MODULETYPE.MODEL, this.modelDataSupport)
    dataSupportMap.set(MODULETYPE.TEXTURE, this.textureDataSupport)
    dataSupportMap.set(MODULETYPE.MATERIAL, this.materialDataSupport)
    dataSupportMap.set(MODULETYPE.RENDERER, this.rendererDataSupport)

    this.dataSupportMap = dataSupportMap
  }

  getDataSupport (type: MODULETYPE): DataSupportAllType | null {
    if (this.dataSupportMap.has(type)) {
      return this.dataSupportMap.get(type)!
    } else {
      console.warn(`can not found this type in dataSupportManager: ${type}`)
      return null
    }
  }

  load (config: DataSupportManagerLoadOptions): this {
    config.camera && this.cameraDataSupport.load(config.camera)
    config.geometry && this.geometryDataSupport.load(config.geometry)
    config.light && this.lightDataSupport.load(config.light)
    config.material && this.materialDataSupport.load(config.material)
    config.model && this.modelDataSupport.load(config.model)
    config.texture && this.textureDataSupport.load(config.texture)
    config.renderer && this.rendererDataSupport.load(config.renderer)
    return this
  }

  toJSON (): string {
    const jsonObject = {
      [MODULETYPE.RENDERER]: this.rendererDataSupport.toJSON(),
      [MODULETYPE.CAMERA]: this.cameraDataSupport.toJSON(),
      [MODULETYPE.GEOMETRY]: this.geometryDataSupport.toJSON(),
      [MODULETYPE.LIGHT]: this.lightDataSupport.toJSON(),
      [MODULETYPE.MATERIAL]: this.materialDataSupport.toJSON(),
      [MODULETYPE.MODEL]: this.modelDataSupport.toJSON(),
      [MODULETYPE.TEXTURE]: this.textureDataSupport.toJSON()
    }

    return JSON.stringify(jsonObject)
  }

}