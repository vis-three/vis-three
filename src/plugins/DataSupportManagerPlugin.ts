import { Engine } from "../engine/Engine";
import { DataSupportManager, DataSupportManagerParameters } from "../manager/DataSupportManager";
import { CONFIGTYPE } from "../middleware/constants/configType";
import { MODULETYPE } from "../middleware/constants/MODULETYPE";
import { ControlsDataSupport } from "../middleware/controls/ControlsDataSupport";
import { RendererDataSupport } from "../middleware/render/RendererDataSupport";
import { SceneDataSupport } from "../middleware/scene/SceneDataSupport";
import { generateConfig } from "../convenient/generateConfig";
import { Plugin } from "./plugin";

export const DataSupportManagerPlugin: Plugin<DataSupportManagerParameters> = function (this: Engine, params: DataSupportManagerParameters): boolean {
  if (this.dataSupportManager) {
    console.warn('engine has installed dataSupportManager plugin.')
    return false
  }

  const dataSupportManager = new DataSupportManager(params)

  this.dataSupportManager = dataSupportManager

  this.toJSON = function () {
    return this.dataSupportManager!.toJSON()
  }

  this.completeSet.add(() => {
    // 帮助其他插件进行support初始化
    const rendererData = this.dataSupportManager!.getDataSupport<RendererDataSupport>(MODULETYPE.RENDERER)!.getData()
    if (!rendererData.WebGLRenderer) {
      rendererData.WebGLRenderer = generateConfig(CONFIGTYPE.WEBGLRENDERER)!
    }

    const sceneData = this.dataSupportManager!.getDataSupport<SceneDataSupport>(MODULETYPE.SCENE)!.getData()
    if (!sceneData.scene) {
      sceneData.scene = generateConfig(CONFIGTYPE.SCENE)!
    }

    const controlsData = this.dataSupportManager!.getDataSupport<ControlsDataSupport>(MODULETYPE.CONTROLS)!.getData()

    if (this.transformControls) {
      if (!controlsData[CONFIGTYPE.TRNASFORMCONTROLS]) {
        controlsData[CONFIGTYPE.TRNASFORMCONTROLS] = generateConfig(CONFIGTYPE.TRNASFORMCONTROLS)!
      }
    }
    if (this.orbitControls) {
      if (!controlsData[CONFIGTYPE.ORBITCONTROLS]) {
        controlsData[CONFIGTYPE.ORBITCONTROLS] = generateConfig(CONFIGTYPE.ORBITCONTROLS)!
      }
    }
  })

  return true
}