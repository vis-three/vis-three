import { CameraCompilerTarget } from "../case/camera/CameraCompiler"
import { CONFIGTYPE, MODULETYPE, SymbolConfig } from "../case/common/CommonConfig"
import { GeometryCompilerTarget } from "../case/geometry/GeometryCompiler"
import { LightCompilerTarget } from "../case/light/LightCompiler"
import { MaterialCompilerTarget } from "../case/material/MaterialCompiler"
import { ModelCompilerTarget } from "../case/model/ModelCompiler"
import { TextureCompilerTarget } from "../case/texture/TextureCompiler"
import { generateConfig } from "./generateConfig"

export type SupportDataAllType =
  TextureCompilerTarget |
  MaterialCompilerTarget |
  LightCompilerTarget |
  GeometryCompilerTarget |
  ModelCompilerTarget |
  CameraCompilerTarget


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
    [CONFIGTYPE.ORTHOGRAPHICCAMERA]: MODULETYPE.CAMERA
  }

  private supportData?: SupportDataAllType
  private supportDataType?: MODULETYPE

  constructor () {}

  create (map?: SupportDataAllType): this {
    this.supportData = {}
    this.supportDataType = undefined
    if (map) {
      Object.keys(map).some(key => {
        this.supportDataType = SupportDataGenerator.dataTypeMap[map[key].type]
        return true
      })
      this.supportData = map
    }
    
    return this
  }

  add<C extends SymbolConfig> (config: C): this {
    if (!this.supportData) {
      console.warn(`you must call method 'create' before the 'add' method`)
      return this
    }

    if (!config.type) {
      console.warn(`config can not found attribute 'type'`)
      return this
    }

    if (!this.supportDataType) {
      if (!SupportDataGenerator.dataTypeMap[config.type]) {
        console.warn(`module can not found type '${config.type}'`)
        return this
      }
      console.log(config.type)
      this.supportDataType = SupportDataGenerator.dataTypeMap[config.type]
    } else {
      if (SupportDataGenerator.dataTypeMap[config.type] !== this.supportDataType) {
        console.warn(`current generator create config which module is in: ${this.supportDataType}, but you provide type is '${config.type}'`)
        return this
      }
    }

    this.supportData[config.vid] = generateConfig(config.type, config)!
    return this
  }

  get (): SupportDataAllType {
    if (this.supportData) {
      return this.supportData
    } else {
      return {}
    }
  }
}