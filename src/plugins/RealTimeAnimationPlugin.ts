import { Engine } from "../engine/Engine";
import { Plugin } from "./plugin";

export const RealTimeAnimationPlugin: Plugin<Object> = function (this: Engine, params: Object): boolean {
  if (this.pointerManager) {
    console.warn('this has installed pointerManager plugin.')
    return false
  }

  if (!this.webGLRenderer) {
    console.error('must install some renderer before this plugin.')
    return false
  }

  return true
}