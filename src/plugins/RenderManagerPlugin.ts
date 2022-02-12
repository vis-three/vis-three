import { Engine } from "../engine/Engine";
import { RenderManager } from "../manager/RenderManager";
import { Plugin } from "./plugin";

export const RendererManagerPlugin: Plugin<Object> = function (this: Engine) {
  if (this.renderManager) {
    console.warn('this has installed render manager plugin.')
    return
  }

  this.renderManager = new RenderManager()

  this.render && this.renderManager!.addEventListener('render', this.render)
}