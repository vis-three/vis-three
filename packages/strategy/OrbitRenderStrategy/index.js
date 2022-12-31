import { transPkgName } from "@vis-three/utils";
import { name as pkgname } from "./package.json";
import { ORBIT_CONTROLS_PLUGIN, } from "@vis-three/orbit-controls-plugin";
import { RENDER_MANAGER_PLUGIN, RENDER_EVENT, } from "@vis-three/render-manager-plugin";
export const name = transPkgName(pkgname);
export const OrbitRenderStrategy = function () {
    let renderFun;
    return {
        name,
        condition: [ORBIT_CONTROLS_PLUGIN, RENDER_MANAGER_PLUGIN],
        exec(engine) {
            renderFun = () => {
                engine.orbitControls.update();
            };
            engine.renderManager.addEventListener(RENDER_EVENT.RENDER, renderFun);
        },
        rollback(engine) {
            engine.renderManager.removeEventListener(RENDER_EVENT.RENDER, renderFun);
        },
    };
};
