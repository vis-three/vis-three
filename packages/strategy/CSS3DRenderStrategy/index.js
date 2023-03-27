import { CSS3D_RENDERER_PLUGIN, } from "@vis-three/plugin-css3d-renderer";
import { RENDER_EVENT, RENDER_MANAGER_PLUGIN, } from "@vis-three/plugin-render-manager";
import { transPkgName } from "@vis-three/utils";
import { name as pkgname } from "./package.json";
export const name = transPkgName(pkgname);
export const CSS3DRenderStrategy = function () {
    let renderFun;
    return {
        name,
        condition: [CSS3D_RENDERER_PLUGIN, RENDER_MANAGER_PLUGIN],
        exec(engine) {
            renderFun = () => {
                engine.css3DRenderer.render(engine.scene, engine.camera);
            };
            engine.renderManager.addEventListener(RENDER_EVENT.RENDER, renderFun);
        },
        rollback(engine) {
            engine.renderManager.removeEventListener(RENDER_EVENT.RENDER, renderFun);
        },
    };
};
