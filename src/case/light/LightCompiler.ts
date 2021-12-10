import { AmbientLight, Color, Light, PointLight, Scene, SpotLight } from "three";
import { Compiler, CompilerTarget } from "../../middleware/Compiler";
import { SymbolConfig } from "../common/CommonConfig";
import { PointLightConfig, SpotLightConfig } from "./LightConfig";
import { validate } from "uuid";

export interface LightCompilerTarget extends CompilerTarget {
  [key: string]: SpotLightConfig | PointLightConfig
}

export interface LightCompilerParameters {
  scene: Scene,
  target: LightCompilerTarget
}

export class LightCompiler extends Compiler {

  private scene: Scene
  private target: LightCompilerTarget
  private map: Map<SymbolConfig['vid'], Light>
  private constructMap: Map<string, () => Light>

  constructor (parameters: LightCompilerParameters) {
    super()
    this.scene = parameters.scene
    this.target = parameters.target
    this.map = new Map()

    this.constructMap = new Map()
    this.constructMap.set('PointLight', () => new PointLight())
    this.constructMap.set('SpotLight', () => new SpotLight())
    this.constructMap.set('AmbientLight', () => new AmbientLight())
  }

  add (vid: string, config: SpotLightConfig | PointLightConfig) {
    if (validate(vid)) {
      if (config.type && this.constructMap.has(config.type)) {
        const light = this.constructMap.get(config.type)!()

        Compiler.applyConfig(config, light)

        light.color = new Color(config.color)

        this.map.set(vid, light)
        this.scene.add(light)
      }
    } else {
      console.error(`vid parameter is illegal: ${vid}`)
    }
  }

  set (path: string[], key: string, value: any) {
    const vid = path.shift()!
    if (validate(vid) && this.map.has(vid)) {
      let config = this.map.get(vid)!
      path.forEach((key, i, arr) => {
        config = config[key]
      })
      config[key] = value
    } else {
      console.error(`vid parameter is illegal: ${vid} or can not found this vid light`)
    }
  }

  setTarget (target: LightCompilerTarget): this {
    this.target = target
    return this
  }

  getMap (): Map<SymbolConfig['type'], Light> {
    return this.map
  }

  compileAll (): this {
    const target = this.target
    for (const key in target) {
      this.add(key, target[key])
    }
    return this
  }

  dispose (): this {
    return this
  }
}