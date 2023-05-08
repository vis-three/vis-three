import { ENGINE_EVENT, } from "@vis-three/core";
import { transPkgName } from "@vis-three/utils";
import { name as pkgname } from "./package.json";
import { VisOrbitControls } from "./VisOrbitControls";
export * from "./VisOrbitControls";
export const ORBIT_CONTROLS_PLUGIN = transPkgName(pkgname);
export const OrbitControlsPlugin = function () {
    let setDomFun;
    let setCameraFun;
    let renderFun;
    return {
        name: ORBIT_CONTROLS_PLUGIN,
        install(engine) {
            const controls = new VisOrbitControls(engine.camera, engine.dom);
            engine.orbitControls = controls;
            setDomFun = (event) => {
                controls.setDom(event.dom);
            };
            engine.addEventListener(ENGINE_EVENT.SETDOM, setDomFun);
            setCameraFun = (event) => {
                event.options.orbitControls && controls.setCamera(event.camera);
            };
            engine.addEventListener(ENGINE_EVENT.SETCAMERA, setCameraFun);
            renderFun = () => {
                controls.update();
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
