import { RenderManager } from "../manager/RenderManager";
export const RenderManagerPlugin = function () {
    if (this.renderManager) {
        console.warn("has installed render manager plugin.");
        return false;
    }
    this.renderManager = new RenderManager();
    this.render = function () {
        this.renderManager.render();
        return this;
    };
    this.play = function () {
        this.renderManager.play();
        return this;
    };
    this.stop = function () {
        this.renderManager.stop();
        return this;
    };
    this.addEventListener("dispose", () => {
        this.renderManager.dispose();
    });
    return true;
};
//# sourceMappingURL=RenderManagerPlugin.js.map