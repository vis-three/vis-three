import { Engine } from "../engine/Engine";
import { ModelingScene, ModelingSceneParameters, SCENEVIEWPOINT } from "../extends/ModelingScene/ModelingScene";
import { Plugin } from "./plugin";
import { SetSizeEvent } from "./WebGLRendererPlugin";

export const ModelingScenePlugin: Plugin<ModelingSceneParameters> = function (this: Engine, params: ModelingSceneParameters) {
  if (this.modelingScene) {
    console.warn('this has installed modeling scene plugin.')
    return
  }

  // 前置条件
  if (!this.webGLRenderer) {
    console.error('must install som renderer before this plugin.')
    return
  }


  const scene = new ModelingScene(params)
  this.modelingScene = scene

  this.render = () => {
    this.webGLRenderer!.render(scene, this.currentCamera!)
    return this
  }

  if (params.hasDefaultPerspectiveCamera) {
    const defaultPerspectiveCamera = scene.getDefaultPerspectiveCamera!()
    this.currentCamera = defaultPerspectiveCamera
    this.addEventListener<SetSizeEvent>('setSize', event => {
      defaultPerspectiveCamera.aspect = event.width / event.height
      defaultPerspectiveCamera.updateProjectionMatrix()
    })

    scene.addEventListener(`${SCENEVIEWPOINT.DEFAULT}ViewPoint`, e => {
      this.setCamera!(defaultPerspectiveCamera)
    })
  }

  if (params.hasDefaultOrthographicCamera) {
    const defaultOrthograpbicCamera = scene.getDefaultOrthographicCamera!()
    this.addEventListener<SetSizeEvent>('setSize', event => {
      const width = event.width
      const height = event.height
      defaultOrthograpbicCamera.left = -width / 16
      defaultOrthograpbicCamera.right = width / 16
      defaultOrthograpbicCamera.top = height / 16
      defaultOrthograpbicCamera.bottom = -height / 16
      defaultOrthograpbicCamera.updateProjectionMatrix()
    })

    scene.addEventListener(`${SCENEVIEWPOINT.TOP}ViewPoint`, e => {
      this.setCamera!(defaultOrthograpbicCamera)
    })
    scene.addEventListener(`${SCENEVIEWPOINT.BOTTOM}ViewPoint`, e => {
      this.setCamera!(defaultOrthograpbicCamera)
    })
    scene.addEventListener(`${SCENEVIEWPOINT.RIGHT}ViewPoint`, e => {
      this.setCamera!(defaultOrthograpbicCamera)
    })
    scene.addEventListener(`${SCENEVIEWPOINT.LEFT}ViewPoint`, e => {
      this.setCamera!(defaultOrthograpbicCamera)
    })
    scene.addEventListener(`${SCENEVIEWPOINT.FRONT}ViewPoint`, e => {
      this.setCamera!(defaultOrthograpbicCamera)
    })
    scene.addEventListener(`${SCENEVIEWPOINT.BACK}ViewPoint`, e => {
      this.setCamera!(defaultOrthograpbicCamera)
    })
  }
}