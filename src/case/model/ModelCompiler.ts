import { BoxBufferGeometry, BufferGeometry, Line, Material, Mesh, MeshStandardMaterial, Object3D, Points, Scene } from "three";
import { validate } from "uuid";
import { Compiler, CompilerTarget } from "../../middleware/Compiler";
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
  materialMap?: {[key: string]: Material}
}

export class ModelCompiler extends Compiler {

  private scene!: Scene
  private target!: ModelCompilerTarget
  private map: Map<string, Object3D>
  private constructMap: Map<string, (config: ModelConfig) => Object3D>
  private geometryMap!: Map<SymbolConfig['vid'], BufferGeometry>
  private materialMap!: {[key: string]: Material}
  private replaceMaterial: Material
  private replaceGeometry: BufferGeometry

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
      this.materialMap = {}
    }

    this.map = new Map()
    this.replaceMaterial = new MeshStandardMaterial({color: 'rgb(150, 150, 150)'})
    this.replaceGeometry = new BoxBufferGeometry(10, 10, 10)
    
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
        this.map.set(vid, object)
        this.scene.add(object)
      }
    } else {
      console.error(`model vid parameter is illegal: ${vid}`)
    }
    return this
  }

  set () {}

  private getMaterial (vid: string): Material {
    if (validate(vid)) {
      if (this.materialMap[vid]) {
        return this.materialMap[vid]
      } else {
        console.warn(`can not found material which vid: ${vid} in compiler materialMap`)
        return this.replaceMaterial
      }
    } else {
      console.error(`material vid parameter is illegal: ${vid}`)
      return this.replaceMaterial
    }
  }

  private getGeometry (vid: string): BufferGeometry {
    if (validate(vid)) {
      if (this.map[vid]) {
        return this.map[vid]
      } else {
        console.warn(`can not found material which vid: ${vid} in model-compiler\`s material-map`)
        return this.replaceGeometry
      }
    } else {
      console.error(`geometry vid parameter is illegal: ${vid}`)
      return this.replaceGeometry
    }
  }

  linkGeometryMap (map: Map<SymbolConfig['vid'], BufferGeometry>): this {
    this.geometryMap = map
    return this
  }

  // TODO:
  linkMaterialMap (): this {
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