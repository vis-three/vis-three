import { definePlugin } from "@vis-three/core";
import { RenderManager } from "./RenderManager";
import { transPkgName } from "@vis-three/utils";
import { name as pkgname } from "./package.json";
export * from "./RenderManager";
export const RENDER_MANAGER_PLUGIN = transPkgName(pkgname);
export const RenderManagerPlugin = definePlugin({
    name: RENDER_MANAGER_PLUGIN,
    install(engine) {
        engine.renderManager = new RenderManager();
        engine.render = function () {
            this.renderManager.render();
            return this;
        };
        engine.play = function () {
            this.renderManager.play();
            return this;
        };
        engine.stop = function () {
            this.renderManager.stop();
            return this;
        };
    },
    dispose(engine) {
        engine.renderManager.stop();
        engine.renderManager.dispose();
    },
});
