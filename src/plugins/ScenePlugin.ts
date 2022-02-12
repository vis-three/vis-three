import { Scene } from "three";
import { Engine } from "../engine/Engine";
import { Plugin } from "./plugin";

export interface SceneParameters {}

export const ScenePlugin: Plugin<Scene> = function (this: Engine, params: SceneParameters) {
  if (this.scene) {
    console.warn('this has installed scene plugin.')
    return
  }

  this.scene = new Scene()
}