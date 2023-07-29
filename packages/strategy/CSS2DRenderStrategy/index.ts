import { Strategy } from "@vis-three/core";
import {
  CSS2DRendererEngine,
  CSS2D_RENDERER_PLUGIN,
} from "@vis-three/plugin-css2d-renderer";
import {
  RenderEvent,
  RenderManagerEngine,
  RENDER_EVENT,
  RENDER_MANAGER_PLUGIN,
} from "@vis-three/plugin-render-manager";
import { transPkgName } from "@vis-three/utils";
import { name as pkgname } from "./package.json";

export interface CSS2DAndRenderEngine
  extends CSS2DRendererEngine,
    RenderManagerEngine {}

export const name = transPkgName(pkgname);

export const CSS2DRenderStrategy: Strategy<CSS2DAndRenderEngine, object> =
  function () {
    let renderFun: (event: RenderEvent) => void;
    return {
      name,
      condition: [CSS2D_RENDERER_PLUGIN, RENDER_MANAGER_PLUGIN],
      exec(engine) {
        renderFun = () => {
          engine.css2DRenderer.render(engine.scene, engine.camera);
        };
        engine.renderManager.addEventListener<RenderEvent>(
          RENDER_EVENT.RENDER,
          renderFun
        );
      },
      rollback(engine) {
        engine.renderManager.removeEventListener(
          RENDER_EVENT.RENDER,
          renderFun
        );
      },
    };
  };
