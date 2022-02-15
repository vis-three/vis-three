import { EnginePlugin } from "../../engine/Engine";
import { EngineSupport, EngineSupportParameters } from "./EngineSupport";

export class DisplayEngineSupport extends EngineSupport {
  constructor(parameters?: EngineSupportParameters) {
    super(parameters)
    this.install(EnginePlugin.WEBGLRENDERER, {
      antialias: true,
      alpha: true
    })
    .install(EnginePlugin.SCENE)
    .install(EnginePlugin.RENDERMANAGER)
    .install(EnginePlugin.EFFECTCOMPOSER, {
      WebGLMultisampleRenderTarget: true
    })
    .install(EnginePlugin.ORBITCONTROLS)
    .install(EnginePlugin.POINTERMANAGER)
    .install(EnginePlugin.EVENTMANAGER)
    .support()
  }
}