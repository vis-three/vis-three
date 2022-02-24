import { DataSupport } from './../core/DataSupport';
import { TextureDataSupport } from "../middleware/texture/TextureDataSupport";
import { MaterialDataSupport } from "../middleware/material/MaterialDataSupport";
import { LightDataSupport } from "../middleware/light/LightDataSupport";
import { GeometryDataSupport } from "../middleware/geometry/GeometryDataSupport";
import { CameraDataSupport } from "../middleware/camera/CameraDataSupport";
import { TextureCompilerTarget } from "../middleware/texture/TextureCompiler";
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
import { EventCompilerTarget } from '../middleware/event/EventCompiler';
import { EventDataSupport } from '../middleware/event/EventDataSupport';
import { LineDataSupport } from '../middleware/line/LineDataSupport';
import { MeshCompilerTarget } from '../middleware/mesh/MeshCompiler';
import { MeshDataSupport } from '../middleware/mesh/MeshDataSupport';
import { PointsCompilerTarget } from '../middleware/points/PointsCompiler';
import { PointsDataSupport } from '../middleware/points/PointsDataSupport';

export interface LoadOptions {
  [MODULETYPE.TEXTURE]?: TextureCompilerTarget
  [MODULETYPE.MATERIAL]?: MaterialCompilerTarget
  [MODULETYPE.GEOMETRY]?: GeometryCompilerTarget

  [MODULETYPE.LIGHT]?: LightCompilerTarget
  [MODULETYPE.CAMERA]?: CameraCompilerTarget
  [MODULETYPE.SPRITE]?: SpriteCompilerTarget
  [MODULETYPE.LINE]?: LightCompilerTarget
  [MODULETYPE.MESH]?: MeshCompilerTarget
  [MODULETYPE.POINTS]?: PointsCompilerTarget

  [MODULETYPE.RENDERER]?: RendererCompilerTarget
  [MODULETYPE.SCENE]?: SceneCompilerTarget
  [MODULETYPE.CONTROLS]?: ControlsCompilerTarget
  [MODULETYPE.EVENT]?: EventCompilerTarget
}

export interface DataSupportManagerParameters {
  cameraDataSupport?: CameraDataSupport
  lightDataSupport?: LightDataSupport
  geometryDataSupport?: GeometryDataSupport
  textureDataSupport?: TextureDataSupport
  materialDataSupport?: MaterialDataSupport
  rendererDataSupport?: RendererDataSupport
  sceneDataSupport?: SceneDataSupport
  controlsDataSupport?: ControlsDataSupport
  spriteDataSupport?: SpriteDataSupport
  eventDataSupport?: EventDataSupport
  lineDataSupport?: LineDataSupport
  meshDataSupport?: MeshDataSupport
  pointsDataSupport?: PointsDataSupport
}

export class DataSupportManager {
  cameraDataSupport!: CameraDataSupport
  lightDataSupport!: LightDataSupport
  geometryDataSupport!: GeometryDataSupport
  textureDataSupport!: TextureDataSupport
  materialDataSupport!: MaterialDataSupport
  rendererDataSupport!: RendererDataSupport
  sceneDataSupport!: SceneDataSupport
  controlsDataSupport!: ControlsDataSupport
  spriteDataSupport!: SpriteDataSupport
  eventDataSupport!: EventDataSupport
  lineDataSupport!: LineDataSupport
  meshDataSupport!: MeshDataSupport
  pointsDataSupport!: PointsDataSupport

  private dataSupportMap: Map<MODULETYPE, DataSupport<CompilerTarget, Compiler>>

  constructor (parameters?: DataSupportManagerParameters) {

    this.cameraDataSupport = new CameraDataSupport()
    this.lightDataSupport = new LightDataSupport()
    this.geometryDataSupport = new GeometryDataSupport()
    this.textureDataSupport = new TextureDataSupport()
    this.materialDataSupport = new MaterialDataSupport()
    this.rendererDataSupport = new RendererDataSupport()
    this.sceneDataSupport = new SceneDataSupport()
    this.controlsDataSupport = new ControlsDataSupport()
    this.spriteDataSupport = new SpriteDataSupport()
    this.eventDataSupport = new EventDataSupport()
    this.lineDataSupport = new LineDataSupport()
    this.meshDataSupport = new MeshDataSupport()
    this.pointsDataSupport = new PointsDataSupport()

    if (parameters) {
      Object.keys(parameters).forEach(key => {
        this[key] !== undefined && (this[key] = parameters[key])
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
      config[module] && dataSupport.load(config[module]!)
    })
    return this
  }

  toJSON (extendsConfig?: object): string {
    const jsonObject = extendsConfig || {}
    const dataSupportMap = this.dataSupportMap
    dataSupportMap.forEach((dataSupport, module) => {
      jsonObject[module] = dataSupport.getData()
    })

    return JSON.stringify(jsonObject)
  }

}