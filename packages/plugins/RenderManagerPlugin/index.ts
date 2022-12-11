import { definePlugin, Engine } from "@vis-three/core";
import { RenderManager } from "./RenderManager";

export * from "./RenderManager";

export interface RenderManagerEngine extends Engine {
  renderManager: RenderManager;
  render: () => void;
  play: () => void;
  stop: () => void;
}

export const RenderManagerPlugin = definePlugin<RenderManagerEngine>({
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
