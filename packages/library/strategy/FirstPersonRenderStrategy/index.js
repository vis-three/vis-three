import { transPkgName } from "@vis-three/utils";
import { name as pkgname } from "./package.json";
import { RENDER_MANAGER_PLUGIN, RENDER_EVENT, } from "@vis-three/plugin-render-manager";
import { FIRST_PERSON_CONTROLS_PLUGIN, } from "@vis-three/plugin-first-person-controls";
export const name = transPkgName(pkgname);
export const FirstPersonRenderStrategy = function () {
    let renderFun;
    return {
        name,
        condition: [FIRST_PERSON_CONTROLS_PLUGIN, RENDER_MANAGER_PLUGIN],
        exec(engine) {
            renderFun = (event) => {
                engine.firstPersonControls.update(event.delta);
            };
            engine.renderManager.addEventListener(RENDER_EVENT.RENDER, renderFun);
        },
        rollback(engine) {
            engine.renderManager.removeEventListener(RENDER_EVENT.RENDER, renderFun);
        },
    };
};
