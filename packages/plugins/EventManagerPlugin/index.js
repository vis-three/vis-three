import { POINTER_MANAGER_PLUGIN, } from "@vis-three/plugin-pointer-manager";
import { EventManager } from "./EventManager";
import { ENGINE_EVENT, } from "@vis-three/core";
import { transPkgName } from "@vis-three/utils";
import { name as pkgname } from "./package.json";
export * from "./EventManager";
export const EVENT_MANAGER_PLUGIN = transPkgName(pkgname);
export const EventManagerPlugin = function (params) {
    let setCameraFun;
    let setSceneFun;
    return {
        name: EVENT_MANAGER_PLUGIN,
        deps: POINTER_MANAGER_PLUGIN,
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
