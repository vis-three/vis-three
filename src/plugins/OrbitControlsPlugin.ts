import { ModelingScene } from './../extends/ModelingScene/ModelingScene';
import { Engine } from "../engine/Engine";
import { SCENEVIEWPOINT } from "../extends/ModelingScene/ModelingScene";
import { VisOrbitControls } from "../optimize/VisOrbitControls";
import { Plugin } from "./plugin";
import { SetCameraEvent } from "./WebGLRendererPlugin";
import { EngineSupport } from '../middleware/engineSupport/EngineSupport';
import { MODULETYPE } from '../middleware/constants/MODULETYPE';
import { CONFIGTYPE } from '../middleware/constants/configType';
import { generateConfig } from '../convenient/generateConfig';
import { ControlsDataSupport } from '../middleware/controls/ControlsDataSupport';


export const OrbitControlsPlugin: Plugin<Object> = function (this: Engine, params: Object): boolean {
  if (this.orbitControls) {
    console.warn('this has installed orbitControls plugin.')
    return false
  }

  if (!this.webGLRenderer) {
    console.warn('this must install renderer before install orbitControls plugin.')
    return false
  }

  if (!this.renderManager) {
    console.warn('this must install renderManager before install orbitControls plugin.')
    return false
  }

  this.orbitControls = new VisOrbitControls(this.currentCamera!, this.dom!)

  this.addEventListener<SetCameraEvent>('setCamera', (event) => {
    (this.orbitControls as VisOrbitControls).setCamera(event.camera)
  })
  
  this.renderManager!.addEventListener('render', () => {
    this.orbitControls!.update()
  })

  if (this.scene instanceof ModelingScene) {
    const scene = this.scene as ModelingScene
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

  return true
}

export const OrbitControlsSupportPlugin: Plugin<Object> = function (this: EngineSupport, params: Object): boolean {
  if (OrbitControlsPlugin.call(this, params)) {
    const dataSupport = this.dataSupportManager.getDataSupport<ControlsDataSupport>(MODULETYPE.CONTROLS)!.getData()
    dataSupport[CONFIGTYPE.ORBITCONTROLS] = generateConfig(CONFIGTYPE.ORBITCONTROLS)!
    return true
  } else {
    return false
  }
}