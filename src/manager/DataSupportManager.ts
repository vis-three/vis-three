import { TextureDataSupport } from "../middleware/texture/TextureDataSupport";
import { ModelDataSupport } from "../middleware/model/ModelDataSupport";
import { MaterialDataSupport } from "../middleware/material/MaterialDataSupport";
import { LightDataSupport } from "../middleware/light/LightDataSupport";
import { GeometryDataSupport } from "../middleware/geometry/GeometryDataSupport";
import { CameraDataSupport } from "../middleware/camera/CameraDataSupport";
import { TextureCompilerTarget } from "../middleware/texture/TextureCompiler";
import { ModelCompilerTarget } from "../middleware/model/ModelCompiler";
import { LightCompilerTarget } from "../middleware/light/LightCompiler";
import { GeometryCompilerTarget } from "../middleware/geometry/GeometryCompiler";
import { CameraCompilerTarget } from "../middleware/camera/CameraCompiler";
import { MaterialCompilerTarget } from "../middleware/material/MaterialCompiler";
import { MODULETYPE } from "../middleware/constants/MODULETYPE";
import { RendererCompilerTarget } from "../middleware/render/RendererCompiler";
import { RendererDataSupport } from "../middleware/render/RendererDataSupport";
import { SceneCompilerTarget } from "../middleware/scene/SceneCompiler";
import { SceneDataSupport } from "../middleware/scene/SceneDataSupport";
import { ControlsCompilerTarget } from "../middleware/controls/ControlsCompiler";
import { ControlsDataSupport } from "../middleware/controls/ControlsDataSupport";

export interface DataSupportManagerLoadOptions {
  [MODULETYPE.TEXTURE]?: TextureCompilerTarget
  [MODULETYPE.MATERIAL]?: MaterialCompilerTarget
  [MODULETYPE.LIGHT]?: LightCompilerTarget
  [MODULETYPE.GEOMETRY]?: GeometryCompilerTarget
  [MODULETYPE.MODEL]?: ModelCompilerTarget
  [MODULETYPE.CAMERA]?: CameraCompilerTarget
  [MODULETYPE.RENDERER]?: RendererCompilerTarget
  [MODULETYPE.SCENE]?: SceneCompilerTarget
  [MODULETYPE.CONTROLS]?: ControlsCompilerTarget
}

export type DataSupportAllType =
  CameraDataSupport |
  LightDataSupport |
  GeometryDataSupport |
  ModelDataSupport |
  TextureDataSupport |
  MaterialDataSupport |
  RendererDataSupport |
  SceneDataSupport |
  ControlsDataSupport

export interface DataSupportManagerParameters {
  cameraDataSupport?: CameraDataSupport
  lightDataSupport?: LightDataSupport
  geometryDataSupport?: GeometryDataSupport
  modelDataSupport?: ModelDataSupport
  textureDataSupport?: TextureDataSupport
  materialDataSupport?: MaterialDataSupport
  rendererDataSupport?: RendererDataSupport
  sceneDataSupport?: SceneDataSupport
  controlsDataSupport?: ControlsDataSupport
}

export class DataSupportManager {
  private cameraDataSupport: CameraDataSupport
  private lightDataSupport: LightDataSupport
  private geometryDataSupport: GeometryDataSupport
  private modelDataSupport: ModelDataSupport
  private textureDataSupport: TextureDataSupport
  private materialDataSupport: MaterialDataSupport
  private rendererDataSupport: RendererDataSupport
  private sceneDataSupport: SceneDataSupport
  private controlsDataSupport: ControlsDataSupport

  private dataSupportMap: Map<MODULETYPE, DataSupportAllType>


  constructor (parameters?: DataSupportManagerParameters) {
    this.cameraDataSupport = parameters?.cameraDataSupport || new CameraDataSupport()
    this.lightDataSupport = parameters?.lightDataSupport || new LightDataSupport()
    this.geometryDataSupport = parameters?.geometryDataSupport || new GeometryDataSupport()
    this.modelDataSupport = parameters?.modelDataSupport || new ModelDataSupport()
    this.textureDataSupport = parameters?.textureDataSupport || new TextureDataSupport()
    this.materialDataSupport = parameters?.materialDataSupport || new MaterialDataSupport()
    this.rendererDataSupport = parameters?.rendererDataSupport || new RendererDataSupport()
    this.sceneDataSupport = parameters?.sceneDataSupport || new SceneDataSupport()
    this.controlsDataSupport = parameters?.controlsDataSupport || new ControlsDataSupport()

    const dataSupportMap = new Map()

    dataSupportMap.set(MODULETYPE.CAMERA, this.cameraDataSupport)
    dataSupportMap.set(MODULETYPE.LIGHT, this.lightDataSupport)
    dataSupportMap.set(MODULETYPE.GEOMETRY, this.geometryDataSupport)
    dataSupportMap.set(MODULETYPE.MODEL, this.modelDataSupport)
    dataSupportMap.set(MODULETYPE.TEXTURE, this.textureDataSupport)
    dataSupportMap.set(MODULETYPE.MATERIAL, this.materialDataSupport)
    dataSupportMap.set(MODULETYPE.RENDERER, this.rendererDataSupport)
    dataSupportMap.set(MODULETYPE.SCENE, this.sceneDataSupport)
    dataSupportMap.set(MODULETYPE.CONTROLS, this.controlsDataSupport)

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
    config.scene && this.sceneDataSupport.load(config.scene)
    config.controls && this.controlsDataSupport.load(config.controls)
    return this
  }

  toJSON (): string {
    const jsonObject = {
      [MODULETYPE.RENDERER]: this.rendererDataSupport.toJSON(),
      [MODULETYPE.SCENE]: this.sceneDataSupport.toJSON(),
      [MODULETYPE.CAMERA]: this.cameraDataSupport.toJSON(),
      [MODULETYPE.GEOMETRY]: this.geometryDataSupport.toJSON(),
      [MODULETYPE.LIGHT]: this.lightDataSupport.toJSON(),
      [MODULETYPE.MATERIAL]: this.materialDataSupport.toJSON(),
      [MODULETYPE.MODEL]: this.modelDataSupport.toJSON(),
      [MODULETYPE.TEXTURE]: this.textureDataSupport.toJSON(),
      [MODULETYPE.CONTROLS]: this.controlsDataSupport.toJSON()
    }

    return JSON.stringify(jsonObject)
  }

}