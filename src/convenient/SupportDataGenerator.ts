import { CameraCompilerTarget } from "../case/camera/CameraCompiler"
import { SymbolConfig } from "../case/common/CommonConfig"
import { CONFIGTYPE } from "../case/constants/configType"
import { MODULETYPE } from "../case/constants/MODULETYPE"
import { GeometryCompilerTarget } from "../case/geometry/GeometryCompiler"
import { LightCompilerTarget } from "../case/light/LightCompiler"
import { MaterialCompilerTarget } from "../case/material/MaterialCompiler"
import { ModelCompilerTarget } from "../case/model/ModelCompiler"
import { RendererCompilerTarget } from "../case/render/RendererCompiler"
import { TextureCompilerTarget } from "../case/texture/TextureCompiler"
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

    [CONFIGTYPE.SCENE]: MODULETYPE.SCENE
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