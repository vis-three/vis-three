import { transPkgName } from "@vis-three/utils";
import { name as pkgname } from "./package.json";
import { ENGINE_EVENT, } from "@vis-three/core";
import { TRANSFORM_EVENT, VisTransformControls } from "./VisTransformControls";
export * from "./VisTransformControls";
export const TRANSFORM_CONTROLS_PLUGIN = transPkgName(pkgname);
export const TransformControlsPlugin = function () {
    let setDomFun;
    let setCameraFun;
    let setSceneFun;
    return {
        name: TRANSFORM_CONTROLS_PLUGIN,
        install(engine) {
            const transformControls = new VisTransformControls(engine.camera, engine.dom);
            transformControls.detach();
            engine.transformControls = transformControls;
            engine.scene.add(transformControls);
            engine.scene.add(transformControls.target);
            engine.transformControls.addEventListener(TRANSFORM_EVENT.MOUSE_DOWN, () => {
                engine.transing = true;
            });
            engine.setTransformControls = function (show) {
                if (show) {
                    this.scene.add(this.transformControls);
                }
                else {
                    this.scene.remove(this.transformControls);
                }
                return this;
            };
            setCameraFun = (event) => {
                event.options.transformControls &&
                    transformControls.setCamera(event.camera);
            };
            engine.addEventListener(ENGINE_EVENT.SETCAMERA, setCameraFun);
            setDomFun = (event) => {
                transformControls.setDom(event.dom);
            };
            engine.addEventListener(ENGINE_EVENT.SETDOM, setDomFun);
            setSceneFun = (event) => {
                const scene = event.scene;
                scene.add(transformControls.target);
                scene.add(transformControls);
            };
            engine.addEventListener(ENGINE_EVENT.SETSCENE, setSceneFun);
        },
        dispose(engine) {
            engine.removeEventListener(ENGINE_EVENT.SETCAMERA, setCameraFun);
            engine.removeEventListener(ENGINE_EVENT.SETDOM, setDomFun);
            engine.removeEventListener(ENGINE_EVENT.SETSCENE, setSceneFun);
            engine.transformControls?.dispose();
            delete engine.transing;
            delete engine.transformControls;
            delete engine.setTransformControls;
        },
    };
};
