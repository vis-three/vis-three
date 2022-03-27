import { Object3D } from "three";
import { Engine } from "../../engine/Engine";
import { BasicAction } from "./Action";

export interface SectionActionParameters {
  oldObjects: Object3D[]
  newObjects: Object3D[]
  engine: Engine
}

export class SectionAction implements BasicAction {

  private oldObjects: Object3D[]
  private newObjects: Object3D[]
  private engine: Engine

  private impact: boolean

  constructor (parameters: SectionActionParameters) {
    this.oldObjects = parameters.oldObjects
    this.newObjects = parameters.newObjects
    this.engine = parameters.engine
    this.impact = true

    if (!this.engine.selectionBox) {
      console.warn(`section action can not make any impact.`)
      this.impact = false
    }
  }
  next () {
    if (!this.impact) {
      return;
    }
    this.engine.setSelectionBox!({
      objects: this.newObjects
    })
  }
  prev () {
    if (!this.impact) {
      return;
    }
    this.engine.setSelectionBox!({
      objects: this.oldObjects
    })
  }
  
}