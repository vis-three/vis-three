import { definePlugin, Engine, Plugin } from "@vis-three/core";
import { RenderManager } from "./RenderManager";
import { transPkgName } from "@vis-three/utils";
import { name as pkgname } from "./package.json";

export * from "./RenderManager";

export interface RenderManagerPluginParams {
  fps?: number;
}

export const RENDER_MANAGER_PLUGIN = transPkgName(pkgname);
export interface RenderManagerEngine extends Engine {
  renderManager: RenderManager;
  play: () => void;
  stop: () => void;
}

export const RenderManagerPlugin: Plugin<
  RenderManagerEngine,
  RenderManagerPluginParams
> = function (params: RenderManagerPluginParams = {}) {
  return {
    name: RENDER_MANAGER_PLUGIN,
    install(engine) {
      engine.renderManager = new RenderManager();

      params.fps && engine.renderManager.setFPS(params.fps);

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
  };
};
