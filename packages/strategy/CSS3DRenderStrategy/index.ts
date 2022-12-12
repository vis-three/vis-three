import {
  CSS3DRendererEngine,
  name as CSS3D_RENDERER_PLUGIN,
} from "@vis-three/css3d-renderer-plugin";
import {
  RenderEvent,
  RenderManagerEngine,
  RENDER_EVENT,
  name as RENDER_MANAGER_PLUGIN,
} from "@vis-three/render-manager-plugin";
import { transPkgName } from "@vis-three/utils";
import { name as pkgname } from "./package.json";
import { Strategy } from "@vis-three/core";

export interface CSS3DAndRenderEngine
  extends CSS3DRendererEngine,
    RenderManagerEngine {}

export const name = transPkgName(pkgname);

export const CSS3DRenderStrategy: Strategy<CSS3DAndRenderEngine> = function () {
  let renderFun: (event: RenderEvent) => void;
  return {
    name,
    condition: [CSS3D_RENDERER_PLUGIN, RENDER_MANAGER_PLUGIN],
    exec(engine) {
      renderFun = () => {
        engine.css3DRenderer.render(engine.scene, engine.camera);
      };
      engine.renderManager.addEventListener<RenderEvent>(
        RENDER_EVENT.RENDER,
        renderFun
      );
    },
    rollback(engine) {
      engine.renderManager.removeEventListener(RENDER_EVENT.RENDER, renderFun);
    },
  };
};
