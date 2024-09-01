import { RENDER_EVENT, RENDER_MANAGER_PLUGIN, } from "@vis-three/plugin-render-manager";
import { EFFECT_COMPOSER_PLUGIN, } from "@vis-three/plugin-effect-composer";
import { transPkgName } from "@vis-three/utils";
import { name as pkgname } from "./package.json";
export const name = transPkgName(pkgname);
export const EffectRenderStrategy = function () {
    let renderFun;
    return {
        name,
        condition: [EFFECT_COMPOSER_PLUGIN, RENDER_MANAGER_PLUGIN],
        exec(engine) {
            renderFun = (event) => {
                engine.effectComposer.render(event.delta);
            };
            engine.renderManager.addEventListener(RENDER_EVENT.RENDER, renderFun);
        },
        rollback(engine) {
            engine.renderManager.removeEventListener(RENDER_EVENT.RENDER, renderFun);
        },
    };
};
