import {
  Engine,
  ENGINE_EVENT,
  SetCameraEvent,
  SetSceneEvent,
} from "../../engine/Engine";
import { Plugin } from "../plugin";
import { PointerManagerEngine } from "../PointerManagerPlugin";
import { EventManager, EventManagerParameters } from "./EventManager";

export interface EventManagerEngine extends PointerManagerEngine {
  eventManager: EventManager;
}

const EventManagerPlugin: Plugin<EventManagerEngine> = function (
  params: EventManagerParameters
) {
  let setCameraFun: ((event: SetCameraEvent) => void) | undefined;
  let setSceneFun: ((event: SetSceneEvent) => void) | undefined;

  return {
    name: "EventManagerPlugin",
    deps: "PointerManagerPlugin",
    install(engine) {
      const eventManager = new EventManager(
        Object.assign(
          {
            scene: engine.scene,
            camera: engine.camera,
          },
          params
        )
      );

      eventManager.use(engine.pointerManager);
      engine.eventManager = eventManager;

      setCameraFun = (event) => {
        engine.eventManager.setCamera(event.camera);
      };

      setSceneFun = (event) => {
        engine.eventManager.setScene(event.scene);
      };

      engine.addEventListener<SetCameraEvent>(
        ENGINE_EVENT.SETCAMERA,
        setCameraFun
      );

      engine.addEventListener<SetSceneEvent>(
        ENGINE_EVENT.SETSCENE,
        setSceneFun
      );
    },
    dispose(engine) {
      engine.removeEventListener<SetCameraEvent>(
        ENGINE_EVENT.SETCAMERA,
        setCameraFun!
      );

      engine.removeEventListener<SetSceneEvent>(
        ENGINE_EVENT.SETSCENE,
        setSceneFun!
      );

      setCameraFun = undefined;
      setSceneFun = undefined;
    },
  };
};

export default EventManagerPlugin;
