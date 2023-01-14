import { ENGINE_EVENT } from "@vis-three/core";
import { AxesHelper } from "three";
import { transPkgName } from "@vis-three/utils";
import { name as pkgname } from "./package.json";
export const AXES_HELPER_PLUGIN = transPkgName(pkgname);
export const AxesHelperPlugin = function (params) {
    let setSceneFun;
    return {
        name: AXES_HELPER_PLUGIN,
        install(engine) {
            const axesHelper = new AxesHelper(params?.length || 500);
            axesHelper.matrixAutoUpdate = false;
            axesHelper.raycast = () => { };
            engine.axesHelper = axesHelper;
            engine.scene.add(axesHelper);
            engine.setAxesHelper = function (show, params) {
                if (show) {
                    engine.scene.add(axesHelper);
                }
                else {
                    engine.scene.remove(axesHelper);
                }
                return this;
            };
            setSceneFun = (event) => {
                event.scene.add(axesHelper);
            };
            engine.addEventListener(ENGINE_EVENT.SETSCENE, setSceneFun);
        },
        dispose(engine) {
            delete engine.setAxesHelper;
            engine.axesHelper.dispose();
            delete engine.axesHelper;
            engine.removeEventListener(ENGINE_EVENT.SETSCENE, setSceneFun);
        },
    };
};
