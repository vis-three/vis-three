import { ENGINE_EVENT, } from "@vis-three/core";
import { transPkgName } from "@vis-three/utils";
import { name as pkgname } from "./package.json";
import { PointerVisualControls } from "./PointerVisualControls";
export * from "./PointerVisualControls";
export const POINTER_VISUAL_CONTROLS_PLUGIN = transPkgName(pkgname);
export const PointerVisualControlsPlugin = function (params = {}) {
    let setDomFun;
    let setCameraFun;
    return {
        name: POINTER_VISUAL_CONTROLS_PLUGIN,
        install(engine) {
            const controls = new PointerVisualControls(engine.camera, engine.dom);
            for (const key in params) {
                if (typeof controls[key] !== "undefined") {
                    controls[key] = params[key];
                }
            }
            engine.pointerVisualControls = controls;
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
            engine.pointerVisualControls.dispose();
            delete engine.pointerVisualControls;
        },
    };
};
