import { Engine } from "../engine/Engine";
import {
  EventManager,
  EventManagerParameters,
  GlobalEvent,
  ObjectEvent,
} from "../manager/EventManager";
import { Plugin } from "./plugin";
import { SetCameraEvent } from "./WebGLRendererPlugin";

export const EventManagerPlugin: Plugin<EventManagerParameters> = function (
  this: Engine,
  params: EventManagerParameters
): boolean {
  if (this.eventManager) {
    console.warn("engine has installed eventManager plugin.");
    return false;
  }

  if (!this.webGLRenderer) {
    console.error("must install some renderer before this plugin.");
    return false;
  }

  if (!this.pointerManager) {
    console.error("must install pointerManager before this plugin.");
    return false;
  }

  const eventManager = new EventManager(
    Object.assign(
      {
        scene: this.scene,
        camera: this.currentCamera,
      },
      params
    )
  );

  eventManager.use(this.pointerManager);
  this.eventManager = eventManager;

  this.addEventListener<SetCameraEvent>("setCamera", (event) => {
    this.eventManager!.setCamera(event.camera);
  });

  return true;
};
