import { CameraCompilerTarget } from "../middleware/camera/CameraCompiler"
import { SymbolConfig } from "../middleware/common/CommonConfig"
import { CONFIGTYPE } from "../middleware/constants/configType"
import { MODULETYPE } from "../middleware/constants/MODULETYPE"
import { GeometryCompilerTarget } from "../middleware/geometry/GeometryCompiler"
import { LightCompilerTarget } from "../middleware/light/LightCompiler"
import { MaterialCompilerTarget } from "../middleware/material/MaterialCompiler"
import { ModelCompilerTarget } from "../middleware/model/ModelCompiler"
import { RendererCompilerTarget } from "../middleware/render/RendererCompiler"
import { TextureCompilerTarget } from "../middleware/texture/TextureCompiler"
import { generateConfig } from "./generateConfig"

export type SupportDataAllType =
  TextureCompilerTarget |
  MaterialCompilerTarget |
  LightCompilerTarget |
  GeometryCompilerTarget |
  ModelCompilerTarget |
  CameraCompilerTarget |
  RendererCompilerTarget

export class SupportDataGenerator {

  private static dataTypeMap = {
    [CONFIGTYPE.IMAGETEXTURE]: MODULETYPE.TEXTURE,

    [CONFIGTYPE.MESHSTANDARDMATERIAL]: MODULETYPE.MATERIAL,

    [CONFIGTYPE.AMBIENTLIGHT]: MODULETYPE.LIGHT,
    [CONFIGTYPE.SPOTLIGHT]: MODULETYPE.LIGHT,
    [CONFIGTYPE.POINTLIGHT]: MODULETYPE.LIGHT,

    [CONFIGTYPE.BOXGEOMETRY]: MODULETYPE.GEOMETRY,
    [CONFIGTYPE.SPHEREGEOMETRY]: MODULETYPE.GEOMETRY,
    [CONFIGTYPE.LOADGEOMETRY]: MODULETYPE.GEOMETRY,

    [CONFIGTYPE.MODEL]: MODULETYPE.MODEL,
    [CONFIGTYPE.MESH]: MODULETYPE.MODEL,
    [CONFIGTYPE.LINE]: MODULETYPE.MODEL,
    [CONFIGTYPE.POINTS]: MODULETYPE.MODEL,

    [CONFIGTYPE.PERSPECTIVECAMERA]: MODULETYPE.CAMERA,
    [CONFIGTYPE.ORTHOGRAPHICCAMERA]: MODULETYPE.CAMERA,

    [CONFIGTYPE.WEBGLRENDERER]: MODULETYPE.RENDERER,

    [CONFIGTYPE.SCENE]: MODULETYPE.SCENE,

    [CONFIGTYPE.TRNASFORMCONTROLS]: MODULETYPE.CONTROLS
  }

  private supportData?: SupportDataAllType
  private supportDataType?: MODULETYPE

  constructor () {}

  create (type: MODULETYPE): this {
    if (!type) {
      console.warn('you must give a module type in create params')
      return this
    }
    this.supportData = {}
    this.supportDataType = type
    
    return this
  }

  add<C extends SymbolConfig> (config: C): this {
    if (!this.supportData || !this.supportDataType) {
      console.warn(`you must call 'create' method before the 'add' method`)
      return this
    }

    if (!config.type) {
      console.warn(`config can not found attribute 'type'`)
      return this
    }

    if (SupportDataGenerator.dataTypeMap[config.type] !== this.supportDataType) {
      console.warn(`current generator create config which module is in: ${this.supportDataType}, but you provide type is '${config.type}'`)
      return this
    }

    this.supportData[config.vid] = generateConfig(config.type, config)!
    return this
  }

  get (): SupportDataAllType {
    this.supportDataType = undefined
    if (this.supportData) {
      return this.supportData
    } else {
      return {}
    }
  }
}