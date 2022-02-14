import { BoxBufferGeometry, BufferGeometry, Line, Material, Mesh, MeshStandardMaterial, Object3D, Points, Scene, Vector3 } from "three";
import { validate } from "uuid";
import { Compiler, COMPILEREVENTTYPE, CompilerTarget, ObjectCompiler } from "../../core/Compiler";
import { SymbolConfig } from "../common/CommonConfig";
import { MODELCOMPILER } from "../constants/EVENTTYPE";
import { GeometryCompilerTarget } from "../geometry/GeometryCompiler";
import { ModelConfig } from "./ModelConfig";

export interface ModelCompilerTarget extends CompilerTarget {
  [key: string]: ModelConfig
}

export interface ModelUserData {
  lookAtTarget: Vector3 | null
  updateMatrixWorldFun: ((focus: boolean) => void) | null
}

export interface ModelCompilerParameters {
  scene?: Scene
  target?: ModelCompilerTarget
  geometryMap?: Map<SymbolConfig['vid'], BufferGeometry>
  materialMap?: Map<SymbolConfig['vid'], Material>
}

export class ModelCompiler extends Compiler implements ObjectCompiler {

  private scene!: Scene
  private target!: ModelCompilerTarget
  private map: Map<string, Object3D>
  private constructMap: Map<string, (config: ModelConfig) => Object3D>
  private geometryMap!: Map<SymbolConfig['vid'], BufferGeometry>
  private materialMap!: Map<SymbolConfig['vid'], Material>
  private objectMapSet: Set<Map<SymbolConfig['vid'], Object3D>>

  private getReplaceMaterial: () => Material
  private getReplaceGeometry: () => BufferGeometry

  constructor (parameters?: ModelCompilerParameters) {
    super()
    if (parameters) {
      parameters.scene && (this.scene = parameters.scene)
      parameters.target && (this.target = parameters.target)
      parameters.geometryMap && (this.geometryMap = parameters.geometryMap)
      parameters.materialMap && (this.materialMap = parameters.materialMap)
    } else {
      this.scene = new Scene()
      this.target = {}
      this.geometryMap = new Map()
      this.materialMap = new Map()
    }

    this.map = new Map()
    this.getReplaceMaterial = () => new MeshStandardMaterial({color: 'rgb(150, 150, 150)'})
    this.getReplaceGeometry = () => new BoxBufferGeometry(10, 10, 10)
    
    const constructMap = new Map()
    constructMap.set('Mesh', (config: ModelConfig) => new Mesh(
      this.getGeometry(config.geometry),
      this.getMaterial(config.material)
    ))
    constructMap.set('Line', (config: ModelConfig) => new Line(
      this.getGeometry(config.geometry),
      this.getMaterial(config.material)
    ))
    constructMap.set('Points', (config: ModelConfig) => new Points(
      this.getGeometry(config.geometry),
      this.getMaterial(config.material)
    ))

    this.constructMap = constructMap
    this.objectMapSet = new Set()
  }
  
  // 获取材质
  private getMaterial (vid: string): Material {
    if (validate(vid)) {
      if (this.materialMap.has(vid)) {
        return this.materialMap.get(vid)!
      } else {
        console.warn(`can not found material which vid: ${vid}`)
        return this.getReplaceMaterial()
      }
    } else {
      console.warn(`material vid parameter is illegal: ${vid}`)
      return this.getReplaceMaterial()
    }
  }

  // 获取几何
  private getGeometry (vid: string): BufferGeometry {
    if (validate(vid)) {
      if (this.geometryMap.has(vid)) {
        return this.geometryMap.get(vid)!
      } else {
        console.warn(`can not found geometry which vid: ${vid}`)
        return this.getReplaceGeometry()
      }
    } else {
      console.warn(`geometry vid parameter is illegal: ${vid}`)
      return this.getReplaceGeometry()
    }
  }

  // 设置物体的lookAt方法
  private setLookAt (vid: string, target: string): this {

    // 不能自己看自己
    if (vid === target) {
      console.error(`can not set object lookAt itself.`)
      return this
    }

    const model = this.map.get(vid)!
    const userData = model.userData as ModelUserData

    if (!target) {
      if (!userData.updateMatrixWorldFun) {
        return this
      }

      model.updateMatrixWorld = userData.updateMatrixWorldFun
      userData.lookAtTarget = null
      userData.updateMatrixWorldFun = null
      return this
    }

    let lookAtTarget: Object3D | null = null

    for (const map of this.objectMapSet) {
      if (map.has(target)) {
        lookAtTarget = map.get(target)!
        break
      }
    }

    if (!lookAtTarget) {
      console.warn(`model compiler can not found this vid mapping object in objectMapSet: '${vid}'`)
      return this
    }


    const updateMatrixWorldFun = model.updateMatrixWorld

    userData.updateMatrixWorldFun = updateMatrixWorldFun
    userData.lookAtTarget = lookAtTarget.position

    model.updateMatrixWorld = (focus: boolean) => {
      updateMatrixWorldFun.bind(model)(focus)
      model.lookAt(userData.lookAtTarget!)
    }

    return this
  }

  // 设置材质方法
  private setMaterial (vid: string, target: string): this {
    (this.map.get(vid)! as Mesh).material = this.getMaterial(target)
    
    this.dispatchEvent({
      type: MODELCOMPILER.SETMATERIAL,
      object: this.map.get(vid)
    })
    return this
  }

  add (vid: string, config: ModelConfig): this {
    if (validate(vid)) {
      if (config.type && this.constructMap.has(config.type)) {
        const object = this.constructMap.get(config.type)!(config)
        const tempConfig = JSON.parse(JSON.stringify(config))

        delete tempConfig.vid
        delete tempConfig.type
        delete tempConfig.geometry
        delete tempConfig.material
        delete tempConfig.lookAt

        Compiler.applyConfig(tempConfig, object)

        this.map.set(vid, object)

        this.setLookAt(vid, config.lookAt)

        this.dispatchEvent({
          type: COMPILEREVENTTYPE.ADD,
          object,
          vid
        })

        this.scene.add(object)     
      }
    } else {
      console.warn(`model compiler add function: model vid parameter is illegal: ${vid}`)
    }
    return this
  }

  set (vid: string, path: string[], key: string, value: any): this {

    if (!validate(vid)) {
      console.warn(`model compiler vid is illegal: '${vid}'`)
      return this
    }

    if (!this.map.has(vid)) {
      console.warn(`model compiler can not found this vid mapping object: '${vid}'`)
      return this
    }

    if (key === 'lookAt') {
      return this.setLookAt(vid, value)
    }

    if (key === 'material') {
      return this.setMaterial(vid, value)
    }

    let config = this.map.get(vid)!
    path.forEach((key, i, arr) => {
      config = config[key]
    })
    config[key] = value
    return this
  }

  remove () {}



  linkGeometryMap (map: Map<SymbolConfig['vid'], BufferGeometry>): this {
    this.geometryMap = map
    return this
  }

  linkMaterialMap (materialMap: Map<string, Material>): this {
    this.materialMap = materialMap
    return this
  }

  linkObjectMap (map: Map<SymbolConfig['vid'], Object3D>): this {
    if (!this.objectMapSet.has(map)) {
      this.objectMapSet.add(map)
    }
    return this
  }

  setScene (scene: Scene): this {
    this.scene = scene
    return this
  }

  setTarget (target: ModelCompilerTarget): this {
    this.target = target
    return this
  }

  getMap (): Map<SymbolConfig['type'], Object3D> {
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