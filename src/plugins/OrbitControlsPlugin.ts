import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { Engine } from "../engine/Engine";
import { SCENEVIEWPOINT } from "../extends/ModelingScene/ModelingScene";
import { VisOrbitControls } from "../optimize/VisOrbitControls";
import { Plugin } from "./plugin";
import { SetCameraEvent } from "./WebGLRendererPlugin";


export const OrbitControlsPlugin: Plugin<Object> = function (this: Engine) {
  if (this.orbitControls) {
    console.warn('this has installed orbitControls plugin.')
    return
  }

  if (!this.webGLRenderer) {
    console.warn('this must install renderer before install orbitControls plugin.')
    return
  }

  if (!this.renderManager) {
    console.warn('this must install renderManager before install orbitControls plugin.')
    return
  }

  this.orbitControls = new VisOrbitControls(this.currentCamera!, this.dom!)

  this.addEventListener<SetCameraEvent>('setCamera', (event) => {
    (this.orbitControls as VisOrbitControls).setCamera(event.camera)
  })
  
  this.renderManager!.addEventListener('render', () => {
    this.orbitControls!.update()
  })

  if (this.modelingScene) {
    const scene = this.modelingScene
    scene.addEventListener(`${SCENEVIEWPOINT.DEFAULT}ViewPoint`, e => {
      this.orbitControls!.enableRotate = true
    })
    scene.addEventListener(`${SCENEVIEWPOINT.TOP}ViewPoint`, e => {
      this.orbitControls!.enableRotate = false
    })
    scene.addEventListener(`${SCENEVIEWPOINT.BOTTOM}ViewPoint`, e => {
      this.orbitControls!.enableRotate = false
    })
    scene.addEventListener(`${SCENEVIEWPOINT.RIGHT}ViewPoint`, e => {
      this.orbitControls!.enableRotate = false
    })
    scene.addEventListener(`${SCENEVIEWPOINT.LEFT}ViewPoint`, e => {
      this.orbitControls!.enableRotate = false
    })
    scene.addEventListener(`${SCENEVIEWPOINT.FRONT}ViewPoint`, e => {
      this.orbitControls!.enableRotate = false
    })
    scene.addEventListener(`${SCENEVIEWPOINT.BACK}ViewPoint`, e => {
      this.orbitControls!.enableRotate = false
    })
  }
}