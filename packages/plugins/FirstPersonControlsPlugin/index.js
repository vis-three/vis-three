import { ENGINE_EVENT, } from "@vis-three/core";
import { transPkgName } from "@vis-three/utils";
import { FirstPersonControls } from "./FirstPersonControls";
import { name as pkgname } from "./package.json";
export const FIRST_PERSON_CONTROLS_PLUGIN = transPkgName(pkgname);
export const FirstPersonControlsPlugin = function (params = {}) {
    let setDomFun;
    let setCameraFun;
    let setSizeFun;
    let renderFun;
    return {
        name: FIRST_PERSON_CONTROLS_PLUGIN,
        install(engine) {
            const controls = new FirstPersonControls(engine.camera, engine.dom);
            controls.movementSpeed = params.movementSpeed || 1.0;
            controls.lookSpeed = params.lookSpeed || 0.005;
            controls.lookVertical = params.lookVertical || true;
            controls.autoForward = params.autoForward || false;
            controls.activeLook = params.activeLook || true;
            controls.heightSpeed = params.heightSpeed || false;
            controls.heightCoef = params.heightCoef || 1.0;
            controls.heightMin = params.heightMin || 0.0;
            controls.heightMax = params.heightMax || 1.0;
            engine.firstPersonControls = controls;
            setDomFun = (event) => {
                controls.setDom(event.dom);
            };
            engine.addEventListener(ENGINE_EVENT.SETDOM, setDomFun);
            setCameraFun = (event) => {
                controls.setCamera(event.camera);
            };
            engine.addEventListener(ENGINE_EVENT.SETCAMERA, setCameraFun);
            setSizeFun = (event) => {
                controls.setSize(event.width, event.height);
            };
            engine.addEventListener(ENGINE_EVENT.SETSIZE, setSizeFun);
            renderFun = (event) => {
                controls.update(event.delta);
            };
            engine.addEventListener(ENGINE_EVENT.RENDER, renderFun);
        },
        dispose(engine) {
            engine.removeEventListener(ENGINE_EVENT.SETDOM, setDomFun);
            engine.removeEventListener(ENGINE_EVENT.SETCAMERA, setCameraFun);
            engine.removeEventListener(ENGINE_EVENT.SETSIZE, setSizeFun);
            engine.removeEventListener(ENGINE_EVENT.RENDER, renderFun);
        },
    };
};
