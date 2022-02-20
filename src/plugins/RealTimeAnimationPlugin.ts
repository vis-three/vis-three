import { Engine } from "../engine/Engine";
import { EngineSupport } from "../middleware/engineSupport/EngineSupport";
import { Plugin } from "./plugin";

export const RealTimeAnimationSupportPlugin: Plugin<Object> = function (this: EngineSupport, params: Object): boolean {
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