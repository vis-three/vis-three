import { ModelingScene } from './../extends/ModelingScene/ModelingScene';
import { Engine } from "../engine/Engine";
import { EventManager, EventManagerParameters, GlobalEvent, ObjectEvent } from "../manager/EventManager";
import { Plugin } from "./plugin";
import { SetCameraEvent } from "./WebGLRendererPlugin";

export const EventManagerPlugin: Plugin<EventManagerParameters> = function (this: Engine, params: EventManagerParameters) {
  if (this.eventManager) {
    console.warn('engine has installed eventManager plugin.')
    return
  }

  if (!this.webGLRenderer) {
    console.error('must install some renderer before this plugin.')
    return
  }

  if (!this.pointerManager) {
    console.error('must install pointerManager before this plugin.')
    return
  }

  const eventManager = new EventManager(Object.assign({
    scene: this.scene,
    camera: this.currentCamera
  }, params))

  eventManager.use(this.pointerManager)
  this.eventManager = eventManager

  this.addEventListener<SetCameraEvent>('setCamera', event => {
    this.eventManager!.setCamera(event.camera)
  })

  if (this.scene instanceof ModelingScene) {
    this.eventManager.addEventListener<GlobalEvent>('pointermove', (event) => {
      (this.scene! as ModelingScene).setObjectHelperHover(...event.intersections.map(elem => elem.object))
    })
    // click发生在pointerup之后
    this.eventManager.addEventListener<GlobalEvent>('click', (event) => {
      if (this.transing) {
        this.transing = false
        return
      }
      if (event.button === 0) {
        (this.scene! as ModelingScene).setObjectHelperActive(...event.intersections.map(elem => elem.object))
      }
    })
  }
}