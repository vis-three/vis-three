import { Color, Fog, FogExp2, Scene, Texture } from "three";
import { validate } from "uuid";
import { Compiler, CompilerTarget } from "../../core/Compiler";
import { SymbolConfig } from "../common/CommonConfig";
import { CONFIGTYPE } from "../constants/configType";
import { getSceneConfig, SceneConfig, SceneFogConfig } from "./SceneConfig";

export interface SceneCompilerTarget extends CompilerTarget {
  [CONFIGTYPE.SCENE]: SceneConfig
}

export interface SceneCompilerParameters {
  target?: SceneCompilerTarget
  scene?: Scene
}

export class SceneCompiler extends Compiler {

  private textureMap: Map<SymbolConfig['type'], Texture>
  private target!: SceneCompilerTarget
  private scene!: Scene

  private fogCache: Fog | FogExp2 | null

  constructor (parameters?: SceneCompilerParameters) {
    super()
    if (parameters) {
      parameters.target && (this.target = parameters.target)
      parameters.scene && (this.scene = parameters.scene)
    } else {
      this.target = {
        [CONFIGTYPE.SCENE]: getSceneConfig()
      }
      this.scene = new Scene()
    }
    this.textureMap = new Map()
    this.fogCache = null
  }

  private background (value: string | null) {
    if (!value) {
      this.scene.background = null
      return
    }

    if (validate(value)) {
      if (this.textureMap.has(value)) {
        this.scene.background = this.textureMap.get(value)!
      } else {
        console.warn(`scene compiler can not found this vid texture : '${value}'`)
      }
    } else {
      this.scene.background = new Color(value)
    }
  }

  private environment (value: string | null) {
    if (!value) {
      this.scene.environment = null
      return
    }

    if (validate(value)) {
      if (this.textureMap.has(value)) {
        this.scene.environment = this.textureMap.get(value)!
      } else {
        console.warn(`scene compiler can not found this vid texture : '${value}'`)
      }
    } else {
      console.warn(`this vid is illegal: '${value}'`)
    }
  }

  private fog (config: SceneFogConfig) {
    if (config.type === '') {
      this.fogCache = null
      this.scene.fog = null
      return
    } 

    if (config.type === 'Fog') {
      if (this.fogCache instanceof Fog) {
        const fog = this.fogCache
        fog.color = new Color(config.color)
        fog.near = config.near
        fog.far = config.far
      } else {
        this.scene.fog = new Fog(config.color, config.near, config.far)
        this.fogCache = this.scene.fog as Fog
      }
      return
    }
     
    if (config.type === 'FogExp2') {
      if (this.fogCache instanceof FogExp2) {
        const fog = this.fogCache
        fog.color = new Color(config.color)
        fog.density = config.density
      } else {
        this.scene.fog = new FogExp2(config.color, config.density)
        this.fogCache = this.scene.fog as FogExp2
      }
      return
    }

    console.warn(`scene compiler can not support this type fog:'${config.type}'`)
  }

  linkTextureMap (map: Map<SymbolConfig['type'], Texture>): this {
    this.textureMap = map
    return this
  }

  set (path: string[], key: string, value: any): this {
    const sceneType = path.shift()!

    if (sceneType === CONFIGTYPE.SCENE) {
      const actionMap = {
        background: () => this.background(value),
        environment: () => this.environment(value),
        fog: () => this.fog(this.target[CONFIGTYPE.SCENE].fog)
      }

      if (path.length) {
        key = path.pop()!
      }

      actionMap[key] && actionMap[key]()
      return this
    } else {
      console.warn(`scene compiler can not support this type: ${sceneType}`)
      return this
    }
  }

  setTarget (target: SceneCompilerTarget): this {
    this.target = target
    return this
  }

  compileAll (): this {
    const sceneTarget = this.target[CONFIGTYPE.SCENE]
    this.background(sceneTarget.background)
    this.environment(sceneTarget.environment)
    this.fog(sceneTarget.fog)
    return this
  }

  dispose (): this {
    return this
  }
}