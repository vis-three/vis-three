import { Scene } from 'three';
import { ModelingScene } from './../extends/ModelingScene/ModelingScene';
import { Engine } from "../engine/Engine";
import { GlobalEvent } from "../manager/EventManager";
import { VisPointerEvent } from "../manager/PointerManager";
import { VisTransformControls } from "../optimize/VisTransformControls";
import { Plugin } from "./plugin";
import { SetCameraEvent } from "./WebGLRendererPlugin";
import { ControlsDataSupport } from '../middleware/controls/ControlsDataSupport';
import { MODULETYPE } from '../middleware/constants/MODULETYPE';
import { CONFIGTYPE } from '../middleware/constants/configType';
import { generateConfig } from '../convenient/generateConfig';
import { EngineSupport } from '../middleware/engineSupport/EngineSupport';

export const TransformControlsPlugin: Plugin<Object> = function (this: Engine, params: Object): boolean {
  if (this.transformControls) {
    console.warn('this has installed transformControls plugin.')
    return false
  }

  if (!this.webGLRenderer) {
    console.warn('this must install renderer before install transformControls plugin.')
    return false
  }

  
  if (!this.pointerManager) {
    console.warn('this must install pointerManager before install transformControls plugin.')
    return false
  }


  if (!this.eventManager) {
    console.warn('this must install eventManager before install transformControls plugin.')
    return false
  }

  const transformControls = new VisTransformControls(this.currentCamera!, this.dom!)

  this.transformControls = transformControls
  this.transing = false

  transformControls.addEventListener('mouseDown', () => {
    this.transing = true
  })

  if (this.scene instanceof Scene) {
    this.scene.add(this.transformControls)
    this.scene.add((this.transformControls as VisTransformControls).target)
  } else if (this.scene! instanceof ModelingScene) {
    (this.scene! as ModelingScene)._add(this.transformControls);
    (this.scene! as ModelingScene)._add((this.transformControls as VisTransformControls).target)
  }

  this.setTransformControls = function(show: boolean): Engine {
    this.transformControls!.visible = show
    return this
  }

  this.addEventListener<SetCameraEvent>('setCamera', event => {
    transformControls.setCamera(event.camera)
  })

  this.eventManager.addEventListener<GlobalEvent>('pointerup', (event) => {
    if (this.transing) {
      return
    }
    if (event.button === 0) {
      const objectList = event.intersections.map((elem) => elem.object)
      transformControls.setAttach(objectList[0])
    }
  })

  return true
}

export const TransformControlsSupportPlugin: Plugin<Object> = function (this: EngineSupport, params: Object): boolean {
  if (TransformControlsPlugin.call(this, params)) {
    const dataSupport = this.dataSupportManager.getDataSupport<ControlsDataSupport>(MODULETYPE.CONTROLS)!.getData()
    dataSupport[CONFIGTYPE.TRNASFORMCONTROLS] = generateConfig(CONFIGTYPE.TRNASFORMCONTROLS)!
    return true
  } else {
    return false
  }
}