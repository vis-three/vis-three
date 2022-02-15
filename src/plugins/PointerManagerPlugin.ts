import { Engine } from "../engine/Engine";
import { PointerManager, PointerManagerParameters } from "../manager/PointerManager";
import { Plugin } from "./plugin";

export const PointerManagerPlugin: Plugin<PointerManagerParameters> = function (this: Engine, params: PointerManagerParameters): boolean {
  if (this.pointerManager) {
    console.warn('this has installed pointerManager plugin.')
    return false
  }

  if (!this.webGLRenderer) {
    console.error('must install some renderer before this plugin.')
    return false
  }

  const pointerManager = new PointerManager(Object.assign(params || {}, {
    dom: this.dom!
  }))

  this.pointerManager = pointerManager

  return true
}