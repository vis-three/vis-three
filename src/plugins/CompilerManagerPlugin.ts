import { generateConfig } from "../convenient/generateConfig";
import { Engine } from "../engine/Engine";
import { CompilerManager, CompilerManagerParameters } from "../manager/CompilerManager";
import { CONFIGTYPE } from "../middleware/constants/configType";
import { MODULETYPE } from "../middleware/constants/MODULETYPE";
import { ControlsDataSupport } from "../middleware/controls/ControlsDataSupport";
import { RendererDataSupport } from "../middleware/render/RendererDataSupport";
import { SceneDataSupport } from "../middleware/scene/SceneDataSupport";
import { Plugin } from "./plugin";

export const CompilerManagerPlugin: Plugin<CompilerManagerParameters> = function (this: Engine, params: CompilerManagerParameters): boolean {
  if (this.compilerManager) {
    console.warn('engine has installed compilerManager plugin.')
    return false
  }

  if (!this.webGLRenderer) {
    console.warn(`must install webGLRenderer before compilerManager plugin.`)
    return false
  }

  if (!this.scene) {
    console.warn(`must install scene before compilerManager plugin.`)
    return false
  }

  if (!this.renderManager) {
    console.warn(`must install renderManager before compilerManager plugin.`)
    return false
  }

  if (!this.dataSupportManager) {
    console.warn('must install dataSupportManager before compilerManager plugin.')
    return false
  }

  const compilerManager = new CompilerManager().support(this)

  this.compilerManager = compilerManager

  // 帮助其他插件进行support初始化
  const rendererData = this.dataSupportManager.getDataSupport<RendererDataSupport>(MODULETYPE.RENDERER)!.getData()
  if (!rendererData.WebGLRenderer) {
    rendererData.WebGLRenderer = generateConfig(CONFIGTYPE.WEBGLRENDERER)!
  }

  const sceneData = this.dataSupportManager.getDataSupport<SceneDataSupport>(MODULETYPE.SCENE)!.getData()
  if (!sceneData.scene) {
    sceneData.scene = generateConfig(CONFIGTYPE.SCENE)!
  }

  const controlsData = this.dataSupportManager.getDataSupport<ControlsDataSupport>(MODULETYPE.CONTROLS)!.getData()

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
  return true
}