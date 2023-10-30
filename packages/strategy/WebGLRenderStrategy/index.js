import { transPkgName } from "@vis-three/utils";
import { name as pkgname } from "./package.json";
import { RENDER_EVENT, RENDER_MANAGER_PLUGIN, } from "@vis-three/plugin-render-manager";
import { WEBGL_RENDERER_PLUGIN, } from "@vis-three/plugin-webgl-renderer";
export const WEBGL_RENDER_STRATEGY = transPkgName(pkgname);
export const WebGLRenderStrategy = function () {
    let renderFun;
    return {
        name: WEBGL_RENDER_STRATEGY,
        condition: [WEBGL_RENDERER_PLUGIN, RENDER_MANAGER_PLUGIN],
        exec(engine) {
            renderFun = (event) => {
                engine.webGLRenderer.render(engine.scene, engine.camera);
            };
            engine.renderManager.addEventListener(RENDER_EVENT.RENDER, renderFun);
        },
        rollback(engine) {
            engine.renderManager.removeEventListener(RENDER_EVENT.RENDER, renderFun);
        },
    };
};
