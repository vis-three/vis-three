import { Line, LineBasicMaterial, LineSegments, Material, Object3D, Scene } from "three";
import { validate } from "uuid";
import { Compiler, CompilerTarget, ObjectCompiler } from "../../core/Compiler";
import { Engine } from "../../main";
import { SymbolConfig } from "../common/CommonConfig";
import { LineAllType } from "./LineConfig";
import { LineSegmentsProcessor } from "./LineSegmentsProcessor";
import { Processor } from "./Processor";

export interface LineCompilerTarget extends CompilerTarget {
  [key: string]: LineAllType
}

export interface LineCompilerParameters {
  target: LineCompilerTarget
  engine: Engine
}

export class LineCompiler extends Compiler implements ObjectCompiler {
  IS_OBJECTCOMPILER: boolean = true

  private target!: LineCompilerTarget
  private scene!: Scene
  private engine!: Engine
  private map: Map<SymbolConfig['vid'], Object3D>
  private weakMap: WeakMap<Object3D, SymbolConfig['vid']>
  private materialMap!: Map<SymbolConfig['vid'], Material>
  private objectMapSet: Set<Map<SymbolConfig['vid'], Object3D>>

  private processorMap =  new Map<string, Processor>()

  constructor (parameters?: LineCompilerParameters) {
    super()

    if (parameters) {
      this.target = parameters.target
      this.scene = parameters.engine.scene!
      this.engine = parameters.engine
    } else {
      this.scene = new Scene()
      this.target = {}
    }
    this.map = new Map()
    this.weakMap = new WeakMap()
    this.materialMap = new Map()
    this.objectMapSet = new Set()

    const processorMap = new Map()
    processorMap.set('LineSegments', new LineSegmentsProcessor(this))
    
    this.processorMap = processorMap
  }

  // 替换材质
  private getReplaceMaterial (): LineBasicMaterial {
    return new LineBasicMaterial({
      color: 'rgb(150, 150, 150)'
    })
  }

  // 获取材质
  getMaterial (vid: string): Material {
    if (validate(vid)) {
      if (this.materialMap.has(vid)) {
        return this.materialMap.get(vid)!
      } else {
        console.warn(`lineCompiler: can not found material which vid: ${vid}`)
        return this.getReplaceMaterial()
      }
    } else {
      console.warn(`lineCompiler: material vid parameter is illegal: ${vid}`)
      return this.getReplaceMaterial()
    }
  }

  // 获取物体
  getObject (vid: string): Object3D | null {
    for (const map of this.objectMapSet) {
      if (map.has(vid)) {
        return map.get(vid)!
      }
    }
    return null
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

  getSupportVid(object: Object3D):SymbolConfig['vid'] | null{
    if (this.weakMap.has(object)) {
      return this.weakMap.get(object)!
    } else {
      return null
    }
  }

  add (vid: string, config: LineAllType): this {
    if (!validate(vid)) {
      console.warn(`LineCompiler: vid parameter is illegal: ${vid}`)
      return this
    }

    if (this.processorMap.has(config.type)) {
      const object = this.processorMap.get(config.type)!.add(config)

      this.map.set(config.vid, object)
      this.weakMap.set(object, config.vid)
      this.scene.add(object)
    }

    return this
  }

  remove() {}

  setTarget (target: LineCompilerTarget): this {
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