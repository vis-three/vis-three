import { transPkgName } from "@vis-three/utils";
import { name as pkgname } from "./package.json";
import { Strategy } from "@vis-three/core";
import {
  RenderEvent,
  RenderManagerEngine,
  RENDER_EVENT,
  RENDER_MANAGER_PLUGIN,
} from "@vis-three/render-manager-plugin";
import {
  Screenshot,
  WebGLRendererEngine,
  WEBGL_RENDERER_PLUGIN,
} from "@vis-three/webgl-renderer-plugin";

export interface WebGLRenderEngine
  extends WebGLRendererEngine,
    RenderManagerEngine {}

export const WEBGL_RENDER_STRATEGY = transPkgName(pkgname);

export const WebGLRendererStrategy: Strategy<WebGLRenderEngine> = function () {
  let renderFun: (event: RenderEvent) => void;

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
