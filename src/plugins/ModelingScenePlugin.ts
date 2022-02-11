import { Engine } from "../engine/Engine";
import { ModelingScene, ModelingSceneParameters } from "../extends/ModelingScene/ModelingScene";
import { Plugin } from "./plugin";
import { SetCameraEvent } from "./WebGLRendererPlugin";

export const ModelingScenePlugin: Plugin<ModelingSceneParameters> = function (engine: Engine, params: ModelingSceneParameters) {
  // 前置条件
  if (!engine.webGLRenderer) {
    console.error('must install som renderer before this plugin.')
    return
  }
  if (engine.modelingScene) {
    console.warn('engine has installed modeling scene plugin.')
    return
  }

  const scene = new ModelingScene(params)
  engine.modelingScene = scene

  engine.render = () => {
    engine.webGLRenderer!.render(scene, engine.currentCamera!)
  }
  // 完成时触发
  const defaultPerspectiveCamera = scene.getDefaultPerspectiveCamera && scene.getDefaultPerspectiveCamera()

  if (defaultPerspectiveCamera) {
    engine.completeSet?.add(() => {
      engine.setCamera!(defaultPerspectiveCamera)
    })
  }
}