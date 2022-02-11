import { Scene } from "three";
import { Engine } from "../engine/Engine";
import { Plugin } from "./plugin";

export interface SceneParameters {}

export const ScenePlugin: Plugin<Scene> = function (engine: Engine, params: SceneParameters) {
  if (engine.scene) {
    console.warn('engine has installed scene plugin.')
    return
  }

  engine.scene = new Scene()
}