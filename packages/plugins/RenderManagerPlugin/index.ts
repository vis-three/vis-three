import { definePlugin, Engine, RenderManager } from "@vis-three/core";

export interface RenderManagerEngine extends Engine {
  renderManager: RenderManager;
}

export default definePlugin<RenderManagerEngine>({
  name: "RenderManagerPlugin",
  install(engine) {
    engine.renderManager = new RenderManager();

    engine.render = function () {
      engine.renderManager!.render();
      return this;
    };
    engine.play = function () {
      engine.renderManager!.play();
      return this;
    };
    engine.stop = function () {
      engine.renderManager!.stop();
      return this;
    };
  },
  dispose(engine) {
    engine.renderManager.stop();
    engine.renderManager.dispose();
  },
});
