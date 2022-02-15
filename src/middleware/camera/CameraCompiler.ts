import { Camera, Object3D, OrthographicCamera, PerspectiveCamera, Scene, Vector3 } from "three";
import { validate } from "uuid";
import { ModelingEngine } from "../../main";
import { Compiler, COMPILEREVENTTYPE, CompilerTarget, ObjectCompiler } from "../../core/Compiler";
import { SetSizeEvent } from "../../plugins/WebGLRendererPlugin";
import { SymbolConfig } from "../common/CommonConfig";
import { CameraAllType } from "./CameraConfig";
import { Engine, EnginePlugin } from "../../engine/Engine";

export interface CameraCompilerTarget extends CompilerTarget {
  [key: string]: CameraAllType
}

export interface CameraCompilerParameters {
  scene?: Scene
  target?: CameraCompilerTarget
  engine?: Engine
}

export interface CameraUserData {
  lookAtTarget?: Vector3
  updateMatrixWorldFun?: (focus: boolean) => void
  setSizeFun?: (event: SetSizeEvent) => void
}

export class CameraCompiler extends Compiler implements ObjectCompiler {

  private target!: CameraCompilerTarget
  private scene!: Scene
  private engine!: Engine
  private map: Map<string, Camera>
  private constructMap: Map<string, () => Camera>
  private objectMapSet: Set<Map<SymbolConfig['vid'], Object3D>>

  constructor (parameters?: CameraCompilerParameters) {
    super()
    if (parameters) {
      parameters.target && (this.target = parameters.target)
      parameters.scene && (this.scene = parameters.scene)
      parameters.engine && (this.engine = parameters.engine)
    } else {
      this.scene = new Scene()
      this.target = {}
      this.engine = new Engine().install(EnginePlugin.WEBGLRENDERER)
    }
    this.map = new Map()
    const constructMap = new Map()
    constructMap.set('PerspectiveCamera', () => new PerspectiveCamera())
    constructMap.set('OrthographicCamera', () => new OrthographicCamera(0, 0, 0, 0))

    this.constructMap = constructMap
    this.objectMapSet = new Set()
  }

  // 设置物体的lookAt方法
  private setLookAt (vid: string, target: string): this {

    // 不能自己看自己
    if (vid === target) {
      console.error(`can not set object lookAt itself.`)
      return this
    }

    const camera = this.map.get(vid)!
    const userData = camera.userData as CameraUserData

    if (!target) {
      if (!userData.updateMatrixWorldFun) {
        return this
      }

      camera.updateMatrixWorld = userData.updateMatrixWorldFun
      userData.lookAtTarget = undefined
      userData.updateMatrixWorldFun = undefined
      return this
    }

    let lookAtTarget: Object3D | undefined = undefined

    for (const map of this.objectMapSet) {
      if (map.has(target)) {
        lookAtTarget = map.get(target)!
        break
      }
    }

    if (!lookAtTarget) {
      console.warn(`camera compiler can not found this vid mapping object in objectMapSet: '${vid}'`)
      return this
    }


    const updateMatrixWorldFun = camera.updateMatrixWorld

    userData.updateMatrixWorldFun = updateMatrixWorldFun
    userData.lookAtTarget = lookAtTarget.position

    camera.updateMatrixWorld = (focus: boolean) => {
      updateMatrixWorldFun.bind(camera)(focus)
      camera.lookAt(userData.lookAtTarget!)
    }

    return this
  }

  // 自适应窗口大小
  private setAdaptiveWindow (vid: string, value: boolean): this {
    if (!validate(vid)) {
      console.error(`camera compiler adaptive window vid is illeage: '${vid}'`)
      return this
    }

    if (!this.map.has(vid)) {
      console.warn(`camera compiler can not found this vid camera: '${vid}'`)
      return this
    }

    const camera = this.map.get(vid)!

    if (!value) {
      if (camera.userData.setSizeFun && this.engine.hasEventListener('setSize', camera.userData.setSizeFun)) {
        this.engine.removeEventListener('setSize', camera.userData.setSizeFun)
        camera.userData.setSizeFun = undefined
        return this
      }

      if (!camera.userData.setSizeFun && !this.engine.hasEventListener('setSize', camera.userData.setSizeFun)) {
        return this
      }

      if (camera.userData.setSizeFun && !this.engine.hasEventListener('setSize', camera.userData.setSizeFun)) {
        camera.userData.setSizeFun = undefined
        return this
      }
    }

    if (value) {
      if (camera.userData.setSizeFun && this.engine.hasEventListener('setSize', camera.userData.setSizeFun)) {
        return this
      }

      if (!this.engine.hasEventListener('setSize', camera.userData.setSizeFun) && camera.userData.setSizeFun) {
        this.engine.addEventListener('setSize', camera.userData.setSizeFun)
        return this
      }

      let setSizeFun = (event: SetSizeEvent) => {}
      if (camera instanceof PerspectiveCamera) {
        setSizeFun = (event: SetSizeEvent) => {
          camera.aspect = event.width / event.height
          camera.updateProjectionMatrix()
        }
      } else if (camera instanceof OrthographicCamera) {
        setSizeFun = (event: SetSizeEvent) => {
          const width = event.width
          const height = event.height
          camera.left = -width / 16
          camera.right = width / 16
          camera.top = height / 16
          camera.bottom = -height / 16
        }
      } else {
        console.warn(`camera compiler can not support this class camera:`, camera)
      }

      this.engine.addEventListener('setSize', setSizeFun as any)

      // 执行一次
      const domElement = this.engine.webGLRenderer!.domElement
      setSizeFun({
        type: 'setSize',
        width: domElement.offsetWidth,
        height: domElement.offsetHeight
      })
    }

    return this

  }

  linkObjectMap (map: Map<SymbolConfig['vid'], Object3D>): this {
    if (!this.objectMapSet.has(map)) {
      this.objectMapSet.add(map)
    }
    return this
  }

  add (vid: string, config: CameraAllType): this {
    if (validate(vid)) {
      if (config.type && this.constructMap.has(config.type)) {
        const camera = this.constructMap.get(config.type)!()

        const tempConfig = JSON.parse(JSON.stringify(config))
        delete tempConfig.vid
        delete tempConfig.type

        delete tempConfig.lookAt
        delete tempConfig.adaptiveWindow

        Compiler.applyConfig(tempConfig, camera)

        if (camera instanceof PerspectiveCamera || camera instanceof OrthographicCamera) {
          (camera as PerspectiveCamera).updateProjectionMatrix()
        }

        this.map.set(vid, camera)

        this.setLookAt(config.vid, config.lookAt)
        this.setAdaptiveWindow(config.vid, config.adaptiveWindow)

        this.dispatchEvent({
          type: COMPILEREVENTTYPE.ADD,
          object: camera,
          vid
        })

        this.scene.add(camera)
      }
    } else {
      console.error(`camera vid parameter is illegal: ${vid}`)
    }
    return this
  }

  set (vid: string, path: string[], key: string, value: any): this {
    if (!validate(vid)) {
      console.warn(`camera compiler set function vid parameters is illeage: '${vid}'`)
      return this
    }

    if (!this.map.has(vid)) {
      console.warn(`geometry compiler set function can not found vid geometry: '${vid}'`)
      return this
    }

    if (key === 'lookAt') {
      return this.setLookAt(vid, value)
    }

    if (key === 'adaptiveWindow') {
      return this.setAdaptiveWindow(vid, value)
    }

    const camera = this.map.get(vid)!
    let config = camera
    path.forEach((key, i, arr) => {
      config = camera[key]
    })
    config[key] = value

    // TODO: 根据特点属性update
    if (camera instanceof PerspectiveCamera || camera instanceof OrthographicCamera) {
      (camera as PerspectiveCamera).updateProjectionMatrix()
    }
    return this

  }

  // TODO:
  remove () {}

  setEngine (engine: ModelingEngine): this {
    this.engine = engine
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

  getMap (): Map<SymbolConfig['type'], Camera> {
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