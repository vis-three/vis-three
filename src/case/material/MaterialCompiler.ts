import { Material, MeshStandardMaterial } from "three";
import { Compiler, CompilerTarget } from "../../middleware/Compiler";
import { SymbolConfig } from "../common/CommonConfig";
import { MaterialAllType } from "./MaterialConfig";

export interface MaterialCompilerTarget extends CompilerTarget {
  [key: string]: MaterialAllType
}

export interface MaterialCompilerParameters {
  target: MaterialCompilerTarget
}

export class MaterialCompiler extends Compiler {

  private target!: MaterialCompilerTarget
  private map: Map<SymbolConfig['type'], Material | Material[]>
  private constructMap: Map<string, () => Material | Material[]>

  constructor (parameters?: MaterialCompilerParameters) {
    super()
    if (parameters) {
      parameters.target && (this.target = parameters.target)
    } else {
      this.target = {}
    }
    this.map = new Map()
    
    const constructMap = new Map()
    constructMap.set('MeshStandardMaterial', () => new MeshStandardMaterial())
    this.constructMap = constructMap
  }

  add (vid: string, config: MaterialAllType) {

  }

  getMap (): Map<SymbolConfig['type'], Material | Material[]> {
    return this.map
  }

  setTarget (target: MaterialCompilerTarget): this {
    this.target = target
    return this
  }

  compileAll(): this {
    return this
  }

  dispose(): this {
    return this
  }
}