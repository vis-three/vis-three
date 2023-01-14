import { ENGINE_EVENT, } from "@vis-three/core";
import { transPkgName } from "@vis-three/utils";
import { KeyboardMoveControls } from "./KeyboardMoveControls";
import { name as pkgname } from "./package.json";
export const KEYBOARD_MOVE_CONTROLS_PLUGIN = transPkgName(pkgname);
export const KeyboardMoveControlsPlugin = function (params = {}) {
    let setDomFun;
    let setCameraFun;
    let renderFun;
    return {
        name: KEYBOARD_MOVE_CONTROLS_PLUGIN,
        install(engine) {
            const controls = new KeyboardMoveControls(engine.camera, engine.dom);
            controls.movementSpeed = params.movementSpeed || 1.0;
            engine.keyboardMoveControls = controls;
            setDomFun = (event) => {
                controls.setDom(event.dom);
            };
            engine.addEventListener(ENGINE_EVENT.SETDOM, setDomFun);
            setCameraFun = (event) => {
                controls.setCamera(event.camera);
            };
            engine.addEventListener(ENGINE_EVENT.SETCAMERA, setCameraFun);
            renderFun = (event) => {
                controls.update(event.delta);
            };
            engine.addEventListener(ENGINE_EVENT.RENDER, renderFun);
        },
        dispose(engine) {
            engine.removeEventListener(ENGINE_EVENT.SETDOM, setDomFun);
            engine.removeEventListener(ENGINE_EVENT.SETCAMERA, setCameraFun);
            engine.removeEventListener(ENGINE_EVENT.RENDER, renderFun);
        },
    };
};
