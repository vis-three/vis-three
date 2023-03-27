import { GRID_HELPER_PLUGIN, } from "@vis-three/plugin-grid-helper";
import { SETVIEWPOINT, VIEWPOINT, VIEWPOINT_PLUGIN, } from "@vis-three/plugin-viewpoint";
import { transPkgName } from "@vis-three/utils";
import { name as pkgname } from "./package.json";
export const GRID_VIEWPOINT_STRATEGY = transPkgName(pkgname);
export const GridViewpointStrategy = function () {
    let viewpointFun;
    return {
        name: GRID_VIEWPOINT_STRATEGY,
        condition: [VIEWPOINT_PLUGIN, GRID_HELPER_PLUGIN],
        exec(engine) {
            const gridHelper = engine.gridHelper;
            const toZero = () => {
                gridHelper.rotation.set(0, 0, 0);
            };
            const toZ90 = () => {
                gridHelper.rotation.set(0, 0, Math.PI / 2);
            };
            const toX90 = () => {
                gridHelper.rotation.set(Math.PI / 2, 0, 0);
            };
            const viewpointAction = {
                [VIEWPOINT.DEFAULT]: toZero,
                [VIEWPOINT.TOP]: toZero,
                [VIEWPOINT.BOTTOM]: toZero,
                [VIEWPOINT.RIGHT]: toZ90,
                [VIEWPOINT.LEFT]: toZ90,
                [VIEWPOINT.FRONT]: toX90,
                [VIEWPOINT.BACK]: toX90,
            };
            viewpointFun = (event) => {
                const viewpoint = event.viewpoint;
                viewpointAction[viewpoint] && viewpointAction[viewpoint]();
                gridHelper.updateMatrix();
                gridHelper.updateMatrixWorld();
            };
            engine.addEventListener(SETVIEWPOINT, viewpointFun);
        },
        rollback(engine) {
            engine.removeEventListener(SETVIEWPOINT, viewpointFun);
        },
    };
};
