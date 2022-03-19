import { BufferGeometry, Mesh } from "three";
import {CSG} from 'three-csg-ts'

export interface BooleanModifierParameters {
  source: Mesh
  target: Mesh
  mode?: 'subtract' | 'union' | 'intersect'
}

export class BooleanModifier {

  private source: Mesh
  private target: Mesh
  private _mode!: 'subtract' | 'union' | 'intersect'
  private cacheGeometry: BufferGeometry

  constructor (parameters: BooleanModifierParameters) {
    this.source = parameters.source
    this.target = parameters.target
    this.cacheGeometry = this.source.geometry
    this.mode = parameters.mode || 'subtract'
  }
  
  get mode () {
    return this._mode
  }

  set mode (value: 'subtract' | 'union' | 'intersect') {
    this._mode = value
    this[value]()
  }

  private subtract () {
    const source = this.source
    const csgSource = CSG.fromMesh(source)
    const csgTarget = CSG.fromMesh(this.target)
    const newGeometry = CSG.toGeometry(csgSource.subtract(csgTarget), source.matrix)
    source.geometry = newGeometry
  }

  private union () {}

  private intersect () {}
}