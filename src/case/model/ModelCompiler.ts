import { BoxBufferGeometry, BufferGeometry, Line, Material, Mesh, MeshStandardMaterial, Object3D, Points, Scene } from "three";
import { validate } from "uuid";
import { Compiler, COMPILEREVENTTYPE, CompilerTarget } from "../../middleware/Compiler";
import { SymbolConfig } from "../common/CommonConfig";
import { GeometryCompilerTarget } from "../geometry/GeometryCompiler";
import { ModelConfig } from "./ModelConfig";

export interface ModelCompilerTarget extends CompilerTarget {
  [key: string]: ModelConfig
}

export interface ModelCompilerParameters {
  scene?: Scene
  target?: ModelCompilerTarget
  geometryMap?: Map<SymbolConfig['vid'], BufferGeometry>
  materialMap?: Map<SymbolConfig['vid'], Material>
}

export class ModelCompiler extends Compiler {

  private scene!: Scene
  private target!: ModelCompilerTarget
  private map: Map<string, Object3D>
  private constructMap: Map<string, (config: ModelConfig) => Object3D>
  private geometryMap!: Map<SymbolConfig['vid'], BufferGeometry>
  private materialMap!: Map<SymbolConfig['vid'], Material>
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
        Compiler.applyConfig(tempConfig, object)

        this.map.set(vid, object)

        this.dispatchEvent({
          type: COMPILEREVENTTYPE.ADD,
          object,
          vid
        })

        this.scene.add(object)     
      }
    } else {
      console.error(`model vid parameter is illegal: ${vid}`)
    }
    return this
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
      console.error(`vid parameter is illegal: ${vid} or can not found this vid model`)
    }
  }

  private getMaterial (vid: string): Material {
    if (validate(vid)) {
      if (this.materialMap.has(vid)) {
        return this.materialMap.get(vid)!
      } else {
        console.warn(`can not found material which vid: ${vid}`)
        return this.getReplaceMaterial()
      }
    } else {
      console.error(`material vid parameter is illegal: ${vid}`)
      return this.getReplaceMaterial()
    }
  }

  private getGeometry (vid: string): BufferGeometry {
    if (validate(vid)) {
      if (this.geometryMap.has(vid)) {
        return this.geometryMap.get(vid)!
      } else {
        console.warn(`can not found geometry which vid: ${vid}`)
        return this.getReplaceGeometry()
      }
    } else {
      console.error(`geometry vid parameter is illegal: ${vid}`)
      return this.getReplaceGeometry()
    }
  }

  linkGeometryMap (map: Map<SymbolConfig['vid'], BufferGeometry>): this {
    this.geometryMap = map
    return this
  }

  linkMaterialMap (materialMap: Map<string, Material>): this {
    this.materialMap = materialMap
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