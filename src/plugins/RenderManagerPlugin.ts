import { Engine } from "../engine/Engine";
import { RenderManager } from "../manager/RenderManager";
import { Plugin } from "./plugin";

export const RendererManagerPlugin: Plugin<Object> = function (engine: Engine) {
  if (engine.renderManager) {
    console.warn('engine has installed render manager plugin.')
    return
  }

  engine.renderManager = new RenderManager()

  engine.render && engine.renderManager!.addEventListener('render', engine.render)
}