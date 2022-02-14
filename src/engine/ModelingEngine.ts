import { Engine, EnginePlugin } from "./Engine";

export class ModelingEngine extends Engine{
  constructor () {
    super()
    this.install(EnginePlugin.WEBGLRENDERER, {
      antialias: true,
      alpha: true
    })
    this.install(EnginePlugin.MODELINGSCENE, {
      hasDefaultPerspectiveCamera: true,
      hasDefaultOrthographicCamera: true,
      hasAxesHelper: true,
      hasGridHelper: true,
      hasDisplayMode: true,
      displayMode: 'env'
    })
    this.install(EnginePlugin.RENDERMANAGER)
    this.install(EnginePlugin.STATS)
    this.install(EnginePlugin.EFFECTCOMPOSER, {
      WebGLMultisampleRenderTarget: true
    })
    this.install(EnginePlugin.ORBITCONTROLS)
    this.install(EnginePlugin.POINTERMANAGER)
    this.install(EnginePlugin.EVENTMANAGER)
    this.install(EnginePlugin.TRANSFORMCONTROLS)
    this.complete()
  }
}