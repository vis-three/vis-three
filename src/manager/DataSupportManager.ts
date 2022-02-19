import { DataSupport } from './../core/DataSupport';
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
import { Compiler, CompilerTarget } from "../core/Compiler";
import { SpriteCompilerTarget } from '../middleware/sprite/SpriteCompiler';
import { SpriteDataSupport } from '../middleware/sprite/SpriteDataSupport';

export interface LoadOptions {
  [MODULETYPE.TEXTURE]?: TextureCompilerTarget
  [MODULETYPE.MATERIAL]?: MaterialCompilerTarget
  [MODULETYPE.GEOMETRY]?: GeometryCompilerTarget

  [MODULETYPE.LIGHT]?: LightCompilerTarget
  [MODULETYPE.MODEL]?: ModelCompilerTarget
  [MODULETYPE.CAMERA]?: CameraCompilerTarget
  [MODULETYPE.SPRITE]?: SpriteCompilerTarget

  [MODULETYPE.RENDERER]?: RendererCompilerTarget
  [MODULETYPE.SCENE]?: SceneCompilerTarget
  [MODULETYPE.CONTROLS]?: ControlsCompilerTarget
}

export interface DataSupportManagerParameters {
  cameraDataSupport: CameraDataSupport
  lightDataSupport: LightDataSupport
  geometryDataSupport: GeometryDataSupport
  modelDataSupport: ModelDataSupport
  textureDataSupport: TextureDataSupport
  materialDataSupport: MaterialDataSupport
  rendererDataSupport: RendererDataSupport
  sceneDataSupport: SceneDataSupport
  controlsDataSupport: ControlsDataSupport
  spriteDataSupport: SpriteDataSupport
}

export class DataSupportManager {
  private cameraDataSupport!: CameraDataSupport
  private lightDataSupport!: LightDataSupport
  private geometryDataSupport!: GeometryDataSupport
  private modelDataSupport!: ModelDataSupport
  private textureDataSupport!: TextureDataSupport
  private materialDataSupport!: MaterialDataSupport
  private rendererDataSupport!: RendererDataSupport
  private sceneDataSupport!: SceneDataSupport
  private controlsDataSupport!: ControlsDataSupport
  private spriteDataSupport!: SpriteDataSupport

  private dataSupportMap: Map<MODULETYPE, DataSupport<CompilerTarget, Compiler>>

  constructor (parameters?: DataSupportManagerParameters) {

    this.cameraDataSupport = new CameraDataSupport()
    this.lightDataSupport = new LightDataSupport()
    this.geometryDataSupport = new GeometryDataSupport()
    this.modelDataSupport = new ModelDataSupport()
    this.textureDataSupport = new TextureDataSupport()
    this.materialDataSupport = new MaterialDataSupport()
    this.rendererDataSupport = new RendererDataSupport()
    this.sceneDataSupport = new SceneDataSupport()
    this.controlsDataSupport = new ControlsDataSupport()
    this.spriteDataSupport = new SpriteDataSupport()

    if (parameters) {
      Object.keys(parameters).forEach(key => {
        this[key] = parameters[key]
      })
    }

    const dataSupportMap = new Map()
    for (let module in MODULETYPE) {
      dataSupportMap.set(MODULETYPE[module], this[`${MODULETYPE[module]}DataSupport`])
    }

    this.dataSupportMap = dataSupportMap
  }

  getDataSupport<D> (type: MODULETYPE): D | null {
    if (this.dataSupportMap.has(type)) {
      return this.dataSupportMap.get(type)! as unknown as D
    } else {
      console.warn(`can not found this type in dataSupportManager: ${type}`)
      return null
    }
  }

  getSupportData<C extends CompilerTarget, D extends DataSupport<C, Compiler>> (type: MODULETYPE): C | null {
    if (this.dataSupportMap.has(type)) {
      return (this.dataSupportMap.get(type)! as D).getData()
    } else {
      console.warn(`can not found this type in dataSupportManager: ${type}`)
      return null
    }
  }

  setSupportData<C extends CompilerTarget, D extends DataSupport<C, Compiler>> (type: MODULETYPE, data: C): this {
    if (this.dataSupportMap.has(type)) {
      (this.dataSupportMap.get(type)! as D).setData(data)
    } else {
      console.warn(`can not found this type in dataSupportManager: ${type}`)
    }
    return this
  }

  load (config: LoadOptions): this {
    const dataSupportMap = this.dataSupportMap
    dataSupportMap.forEach((dataSupport, module) => {
      config[module] && dataSupport.load(config[module])
    })
    return this
  }

  toJSON (): string {
    const jsonObject = {}
    const dataSupportMap = this.dataSupportMap
    dataSupportMap.forEach((dataSupport, module) => {
      jsonObject[module] = dataSupport.toJSON()
    })

    return JSON.stringify(jsonObject)
  }

}