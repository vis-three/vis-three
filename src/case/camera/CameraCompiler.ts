import { Camera, OrthographicCamera, PerspectiveCamera, Scene } from "three";
import { validate } from "uuid";
import { Compiler, CompilerTarget } from "../../middleware/Compiler";
import { CameraAllType } from "./CameraConfig";

export interface CameraCompilerTarget extends CompilerTarget {
  [key: string]: CameraAllType
}

export interface CameraCompilerParameters {
  scene?: Scene
  target?: CameraCompilerTarget
}

export class CameraCompiler extends Compiler {

  private target!: CameraCompilerTarget
  private scene!: Scene
  private map: Map<string, Camera>
  private constructMap: Map<string, () => Camera>

  constructor (parameters?: CameraCompilerParameters) {
    super()
    if (parameters) {
      parameters.target && (this.target = parameters.target)
      parameters.scene && (this.scene = parameters.scene)
    } else {
      this.scene = new Scene()
      this.target = {}
    }
    this.map = new Map()
    const constructMap = new Map()
    constructMap.set('PerspectiveCamera', () => new PerspectiveCamera())
    constructMap.set('OrthographicCamera', () => new OrthographicCamera())

    this.constructMap = constructMap
  }

  add (vid: string, config: CameraAllType): this {
    if (validate(vid)) {
      if (config.type && this.constructMap.has(config.type)) {
        const camera = this.constructMap.get(config.type)!()

        const tempConfig = JSON.parse(JSON.stringify(config))
        delete tempConfig.vid
        delete tempConfig.type

        Compiler.applyConfig(tempConfig, camera)

        if (camera instanceof PerspectiveCamera || camera instanceof OrthographicCamera) {
          (camera as PerspectiveCamera).updateProjectionMatrix()
        }


        this.map.set(vid, camera)
        this.scene.add(camera)
      }
    } else {
      console.error(`camera vid parameter is illegal: ${vid}`)
    }
    return this
  }

  setScene (scene: Scene): this {
    this.scene = scene
    return this
  }

  setTarget (target: CameraCompilerTarget): this {
    this.target = target
    return this
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