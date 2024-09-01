import { ENGINE_EVENT, } from "@vis-three/core";
import { transPkgName } from "@vis-three/utils";
import { name as pkgname } from "./package.json";
import { PointerLockControls } from "./PointerLockControls";
export const POINTER_LOCK_CONTROLS_PLUGIN = transPkgName(pkgname);
export const PointerLockControlsPlugin = function () {
    let setDomFun;
    let setCameraFun;
    return {
        name: POINTER_LOCK_CONTROLS_PLUGIN,
        install(engine) {
            const controls = new PointerLockControls(engine.camera, engine.dom);
            engine.pointerLockControls = controls;
            setDomFun = (event) => {
                controls.setDom(event.dom);
            };
            engine.addEventListener(ENGINE_EVENT.SETDOM, setDomFun);
            setCameraFun = (event) => {
                controls.setCamera(event.camera);
            };
            engine.addEventListener(ENGINE_EVENT.SETCAMERA, setCameraFun);
        },
        dispose(engine) {
            engine.removeEventListener(ENGINE_EVENT.SETDOM, setDomFun);
            engine.removeEventListener(ENGINE_EVENT.SETCAMERA, setCameraFun);
            engine.pointerLockControls.dispose();
            delete engine.pointerLockControls;
        },
    };
};
