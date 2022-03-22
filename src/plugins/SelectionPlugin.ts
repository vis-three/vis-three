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


  const dispatchEvent = () => {
    let objectSymbols: string[] = []
    if (this.IS_ENGINESUPPORT) {
      this.selectionBox!.forEach(object => {
        let objectSymbol = this.compilerManager!.getObjectSymbol(object)
        if (objectSymbol) {
          objectSymbols.push(objectSymbol)
        } else {
          console.warn('selection plugin can not font vid in compilerManager.', object)
        }
      })
    }
    
    this.dispatchEvent({
      type: 'selected',
      objects: [...this.selectionBox!],
      objectSymbols
    })
  }

  this.setSelectionBox = function (params: {objects: Object3D[]}): Engine {
    this.selectionBox!.clear()
    for(let object of params.objects) {
      this.selectionBox!.add(object)
    }
    dispatchEvent()
    return this
  }

  // 单选
  this.eventManager.addEventListener<GlobalEvent>('click', (event) => {

    // 兼容transformControls事件
    if (this.transing) {
      this.transing = false
      return
    }
    const intersections = event.intersections
    // ctrl多选
    if (!event.ctrlKey) {
      this.selectionBox!.clear()
    }

    if (this.eventManager!.penetrate) {
      for (let intersection of intersections) {
        // 反选
        if (event.ctrlKey) {
          if (this.selectionBox?.has(intersection.object)) {
            this.selectionBox.delete(intersection.object)
            continue
          }
        }
        this.selectionBox!.add(intersection.object)
      }
    } else {
      if (intersections.length) {
        const object = intersections[0].object
        // 反选
        if (event.ctrlKey) {
          if (this.selectionBox?.has(object)) {
            this.selectionBox.delete(object)
            return
          }
        }
        this.selectionBox?.add(object)
      }
    }
    dispatchEvent()
  })

  // TODO: 框选 selectionBox selectionHelper

  return true
}