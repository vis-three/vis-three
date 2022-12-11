import { definePlugin } from "@vis-three/core";
import { RenderManager } from "./RenderManager";
export * from "./RenderManager";
export const RenderManagerPlugin = definePlugin({
    name: "RenderManagerPlugin",
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
