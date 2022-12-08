import { Engine, SetCameraEvent, SetSceneEvent } from "../../engine/Engine";
import {
  EventManager,
  EventManagerParameters,
  GlobalEvent,
  ObjectEvent,
} from "../manager/EventManager";
import { Plugin } from "../../core/src/core/Plugin";

export const EventManagerPlugin: Plugin<EventManagerParameters> = function (
  this: Engine,
  params: EventManagerParameters
): boolean {
  if (this.eventManager) {
    console.warn("engine has installed eventManager plugin.");
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
        camera: this.camera,
      },
      params
    )
  );

  eventManager.use(this.pointerManager);
  this.eventManager = eventManager;

  this.addEventListener<SetCameraEvent>("setCamera", (event) => {
    this.eventManager!.setCamera(event.camera);
  });

  this.addEventListener<SetSceneEvent>("setScene", (event) => {
    this.eventManager!.setScene(event.scene);
  });
  return true;
};
