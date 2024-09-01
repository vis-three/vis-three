import {
  PointerManagerEngine,
  POINTER_MANAGER_PLUGIN,
} from "@vis-three/plugin-pointer-manager";
import { EventManager, EventManagerParameters } from "./EventManager";
import {
  ENGINE_EVENT,
  Plugin,
  SetCameraEvent,
  SetSceneEvent,
} from "@vis-three/core";
import { Optional, transPkgName } from "@vis-three/utils";
import { name as pkgname } from "./package.json";

export * from "./EventManager";

export const EVENT_MANAGER_PLUGIN = transPkgName(pkgname);
export interface EventManagerEngine extends PointerManagerEngine {
  eventManager: EventManager;
}

export const EventManagerPlugin: Plugin<
  EventManagerEngine,
  Partial<EventManagerParameters>
> = function (params?: Partial<EventManagerParameters>) {
  let setCameraFun: ((event: SetCameraEvent) => void) | undefined;
  let setSceneFun: ((event: SetSceneEvent) => void) | undefined;

  return {
    name: EVENT_MANAGER_PLUGIN,
    deps: POINTER_MANAGER_PLUGIN,
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
