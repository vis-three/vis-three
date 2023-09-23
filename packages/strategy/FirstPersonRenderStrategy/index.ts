import { transPkgName } from "@vis-three/utils";
import { name as pkgname } from "./package.json";
import { Strategy } from "@vis-three/core";
import {
  RenderEvent,
  RenderManagerEngine,
  RENDER_MANAGER_PLUGIN,
  RENDER_EVENT,
} from "@vis-three/plugin-render-manager";
import {
  FirstPersonControlsEngine,
  FIRST_PERSON_CONTROLS_PLUGIN,
} from "@vis-three/plugin-first-person-controls";

export interface FirstPersonRenderEngine
  extends FirstPersonControlsEngine,
    RenderManagerEngine {}

export const name = transPkgName(pkgname);

export const FirstPersonRenderStrategy: Strategy<FirstPersonRenderEngine> =
  function () {
    let renderFun: (event: RenderEvent) => void;
    return {
      name,
      condition: [FIRST_PERSON_CONTROLS_PLUGIN, RENDER_MANAGER_PLUGIN],
      exec(engine) {
        renderFun = (event: RenderEvent) => {
          engine.firstPersonControls.update(event.delta);
        };
        engine.renderManager.addEventListener(RENDER_EVENT.RENDER, renderFun);
      },
      rollback(engine) {
        engine.renderManager.removeEventListener(
          RENDER_EVENT.RENDER,
          renderFun
        );
      },
    };
  };
