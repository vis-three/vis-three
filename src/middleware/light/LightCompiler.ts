import { AmbientLight, BufferGeometry, Color, DirectionalLight, Light, Material, PointLight, Scene, SpotLight } from "three";
import { Compiler} from "../../core/Compiler";
import { SymbolConfig } from "../common/CommonConfig";
import { LightConfigAllType } from "./LightConfig";
import { ObjectCompiler, ObjectCompilerParameters, ObjectCompilerTarget } from "../object/ObjectCompiler";
import { MODULETYPE } from "../constants/MODULETYPE";
import { CONFIGTYPE } from "../constants/configType";

export interface LightCompilerTarget extends ObjectCompilerTarget<LightConfigAllType> {
  [key: string]: LightConfigAllType
}

export interface LightCompilerParameters extends ObjectCompilerParameters<LightConfigAllType, LightCompilerTarget> {}

export class LightCompiler extends ObjectCompiler<LightConfigAllType, LightCompilerTarget, Light> {

  COMPILER_NAME: string = MODULETYPE.LIGHT

  private constructMap: Map<string, () => Light>

  private filterAttribute: {[key: string]: boolean}

  private replaceMaterial = new Material()
  private replaceGeometry = new BufferGeometry()

  constructor (parameters?: LightCompilerParameters) {
    super(parameters)
    this.constructMap = new Map()
    this.constructMap.set(CONFIGTYPE.POINTLIGHT, () => new PointLight())
    this.constructMap.set(CONFIGTYPE.SPOTLIGHT, () => new SpotLight())
    this.constructMap.set(CONFIGTYPE.AMBIENTLIGHT, () => new AmbientLight())
    this.constructMap.set(CONFIGTYPE.DIRECTIONALLIGHT, () => new DirectionalLight())


    this.setLookAt = function(vid: string, target: string) {
      return this
    }

    this.filterAttribute = {
      scale: true,
      rotation: true,
      lookAt: true
    }

  }

  getReplaceMaterial (): Material {
    console.warn(`LightCompiler: can not use material in LightCompiler.`)
    return this.replaceMaterial
  }

  getReplaceGeometry (): BufferGeometry {
    console.warn(`LightCompiler: can not use geometry in LightCompiler.`)
    return this.replaceGeometry
  }

  add (vid: string, config: LightConfigAllType): this {
    if (config.type && this.constructMap.has(config.type)) {
      const light = this.constructMap.get(config.type)!()

      Compiler.applyConfig(config, light, this.filterAttribute)

      light.color = new Color(config.color)

      this.map.set(vid, light)
      this.weakMap.set(light, vid)

      this.scene.add(light)
    } else {
      console.warn(`LightCompiler: can not support Light type: ${config.type}.`)
    }
    return this
  }

  set (vid: string, path: string[], key: string, value: any): this {
    if (!this.map.has(vid)) {
      console.warn(`LightCompiler: can not found this vid mapping object: '${vid}'`)
      return this
    }

    if (this.filterAttribute[key]) {
      return this
    }

    let object = this.map.get(vid)!

    if (key === 'color') {
      object.color = new Color(value)
      return this
    }

    for (let key of path) {
      if (this.filterAttribute[key]) {
        return this
      }
      object = object[key]
    }

    object[key] = value

    return this
  }

  dispose (): this {
    super.dispose()
    this.replaceGeometry.dispose()
    this.replaceMaterial.dispose()
    return this
  }
}