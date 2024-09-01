import { ENGINE_EVENT } from "@vis-three/core";
import { GridHelper } from "three";
import { transPkgName } from "@vis-three/utils";
import { name as pkgname } from "./package.json";
export const GRID_HELPER_PLUGIN = transPkgName(pkgname);
export const GridHelperPlugin = function (params = {}) {
    let setSceneFun;
    return {
        name: GRID_HELPER_PLUGIN,
        install(engine) {
            const gridHelper = new GridHelper(params.range || 500, params.spacing || 50, params.axesColor || "rgb(130, 130, 130)", params.cellColor || "rgb(70, 70, 70)");
            if (params.opacity !== 1) {
                const material = gridHelper.material;
                material.transparent = true;
                material.opacity = params.opacity || 0.5;
                material.needsUpdate = true;
            }
            gridHelper.matrixAutoUpdate = false;
            gridHelper.raycast = () => { };
            engine.gridHelper = gridHelper;
            engine.scene.add(gridHelper);
            engine.setGridHelper = function (show) {
                if (show) {
                    this.scene.add(gridHelper);
                }
                else {
                    this.scene.remove(gridHelper);
                }
                return this;
            };
            setSceneFun = (event) => {
                event.scene.add(gridHelper);
            };
            engine.addEventListener(ENGINE_EVENT.SETSCENE, setSceneFun);
        },
        dispose(engine) {
            engine.removeEventListener(ENGINE_EVENT.SETSCENE, setSceneFun);
            engine.gridHelper.material.dispose();
            engine.gridHelper.geometry.dispose();
            delete engine.gridHelper;
            delete engine.setGridHelper;
        },
    };
};
