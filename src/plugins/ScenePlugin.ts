import { def } from "@vue/shared";
import { PerspectiveCamera, Scene } from "three";
import { Engine } from "../engine/Engine";
import { Plugin } from "./plugin";

export interface SceneParameters {}

export const ScenePlugin: Plugin<Scene> = function (this: Engine, params: SceneParameters) {
  if (this.scene) {
    console.warn('this has installed scene plugin.')
    return
  }

  if (!this.webGLRenderer) {
    console.error('must install some renderer before this plugin.')
    return
  }

  this.scene = new Scene()

  this.render = () => {
    this.webGLRenderer!.render(this.scene!, this.currentCamera!)
    return this
  }

  const defalutCamera = new PerspectiveCamera()
  defalutCamera.position.set(50, 50, 50)
  defalutCamera.lookAt(0, 0, 0)

  this.currentCamera = defalutCamera
  
}