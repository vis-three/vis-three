import { AxesHelper } from "three";
import { Engine, ENGINEPLUGIN } from "../engine/Engine";
import { Plugin } from "./plugin";

export interface AxesHelperParameters {
  length?: number
}

export const AxesHelperPlugin: Plugin<AxesHelperParameters> = function (this: Engine, params: AxesHelperParameters): boolean {
  if (!this.scene) {
    console.error('must install some scene before BasicViewpoint plugin.')
    return false
  }

  const axesHelper = new AxesHelper(params.length || 500)
  axesHelper.matrixAutoUpdate = false
  axesHelper.raycast = () => {}


  this.scene.add(axesHelper)
  return true
}