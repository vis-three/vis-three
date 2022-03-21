import { Object3D } from "three";
import { BaseEvent } from "../core/EventDispatcher";
import { Engine } from "../engine/Engine";
import { GlobalEvent } from "../manager/EventManager";
import { Plugin } from "./plugin";

export interface SelectionParameters {

}

export interface SelectedEvent extends BaseEvent {
  objects: Object3D[]
  objectSymbols: string[]
}

export const SelectionPlugin: Plugin<SelectionParameters> = function (this: Engine, params: SelectionParameters = {}): boolean {
  if (!this.eventManager) {
    console.warn('must install eventManager plugin before Selection plugin.')
    return false
  }

  this.selectionBox = new Set()


  // 单选
  this.eventManager.addEventListener<GlobalEvent>('click', (event) => {
    const intersections = event.intersections
    this.selectionBox!.clear()
    if (this.eventManager!.penetrate) {
      for (let intersection of intersections) {
        this.selectionBox!.add(intersection.object)
      }
    } else {
      if (intersections.length) {
        this.selectionBox?.add(intersections[0].object)
      }
    }
    // TODO: 判断 IS_ENGINESUPPORT
    
    this.dispatchEvent({
      type: 'selected',
      objects: [...this.selectionBox!],
      objectSymbols: []
    })
  })

  // TODO: 框选

  return true
}