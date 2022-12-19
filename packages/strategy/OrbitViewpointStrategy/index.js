import { transPkgName } from "@vis-three/utils";
import { name as pkgname } from "./package.json";
import { name as ORBIT_CONTROLS_PLUGIN, } from "@vis-three/orbit-controls-plugin";
import { VIEWPOINT_PLUGIN, VIEWPOINT, SETVIEWPOINT, } from "@vis-three/viewpoint-plugin";
export const name = transPkgName(pkgname);
export const OrbitViewpointStrategy = function () {
    let viewpointFun;
    return {
        name,
        condition: [ORBIT_CONTROLS_PLUGIN, VIEWPOINT_PLUGIN],
        exec(engine) {
            const disableRotate = () => {
                engine.orbitControls.enableRotate = false;
            };
            const actionMap = {
                [VIEWPOINT.DEFAULT]: () => {
                    engine.orbitControls.enableRotate = true;
                },
                [VIEWPOINT.TOP]: disableRotate,
                [VIEWPOINT.BOTTOM]: disableRotate,
                [VIEWPOINT.RIGHT]: disableRotate,
                [VIEWPOINT.LEFT]: disableRotate,
                [VIEWPOINT.FRONT]: disableRotate,
                [VIEWPOINT.BACK]: disableRotate,
            };
            viewpointFun = (event) => {
                const viewpoint = event.viewpoint;
                engine.orbitControls.target.set(0, 0, 0);
                actionMap[viewpoint] && actionMap[viewpoint]();
            };
            engine.addEventListener(SETVIEWPOINT, viewpointFun);
        },
        rollback(engine) {
            engine.removeEventListener(SETVIEWPOINT, viewpointFun);
        },
    };
};
