import { transPkgName } from "@vis-three/utils";
import { name as pkgname } from "./package.json";
import { Strategy } from "@vis-three/core";
import {
  OrbitControlsEngine,
  ORBIT_CONTROLS_PLUGIN,
} from "@vis-three/plugin-orbit-controls";
import {
  RenderEvent,
  RenderManagerEngine,
  RENDER_MANAGER_PLUGIN,
  RENDER_EVENT,
} from "@vis-three/plugin-render-manager";

export interface OrbitRenderEngine
  extends OrbitControlsEngine,
    RenderManagerEngine {}

export const name = transPkgName(pkgname);

export const OrbitRenderStrategy: Strategy<OrbitRenderEngine> = function () {
  let renderFun: (event: RenderEvent) => void;
  return {
    name,
    condition: [ORBIT_CONTROLS_PLUGIN, RENDER_MANAGER_PLUGIN],
    exec(engine) {
      renderFun = () => {
        engine.orbitControls.update();
      };
      engine.renderManager.addEventListener(RENDER_EVENT.RENDER, renderFun);
    },
    rollback(engine) {
      engine.renderManager.removeEventListener(RENDER_EVENT.RENDER, renderFun);
    },
  };
};
