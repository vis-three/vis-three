import { EventManager } from "./EventManager";
import { ENGINE_EVENT, } from "@vis-three/core";
export * from "./EventManager";
export const EventManagerPlugin = function (params) {
    let setCameraFun;
    let setSceneFun;
    return {
        name: "EventManagerPlugin",
        deps: "PointerManagerPlugin",
        install(engine) {
            const eventManager = new EventManager(Object.assign({
                scene: engine.scene,
                camera: engine.camera,
            }, params));
            eventManager.use(engine.pointerManager);
            engine.eventManager = eventManager;
            setCameraFun = (event) => {
                engine.eventManager.setCamera(event.camera);
            };
            setSceneFun = (event) => {
                engine.eventManager.setScene(event.scene);
            };
            engine.addEventListener(ENGINE_EVENT.SETCAMERA, setCameraFun);
            engine.addEventListener(ENGINE_EVENT.SETSCENE, setSceneFun);
        },
        dispose(engine) {
            engine.removeEventListener(ENGINE_EVENT.SETCAMERA, setCameraFun);
            engine.removeEventListener(ENGINE_EVENT.SETSCENE, setSceneFun);
            setCameraFun = undefined;
            setSceneFun = undefined;
        },
    };
};
