import {
  RenderEvent,
  RenderManagerEngine,
  RENDER_EVENT,
  RENDER_MANAGER_PLUGIN,
} from "@vis-three/plugin-render-manager";
import {
  EFFECT_COMPOSER_PLUGIN,
  EffectComposerEngine,
} from "@vis-three/plugin-effect-composer";
import { transPkgName } from "@vis-three/utils";
import { name as pkgname } from "./package.json";
import { Strategy } from "@vis-three/core";

export interface EffectRenderEngine
  extends EffectComposerEngine,
    RenderManagerEngine {}

export const name = transPkgName(pkgname);

export const EffectRenderStrategy: Strategy<EffectRenderEngine> = function () {
  let renderFun: (event: RenderEvent) => void;
  return {
    name,
    condition: [EFFECT_COMPOSER_PLUGIN, RENDER_MANAGER_PLUGIN],
    exec(engine) {
      renderFun = (event) => {
        engine.effectComposer.render(event.delta);
      };

      engine.renderManager.addEventListener<RenderEvent>(
        RENDER_EVENT.RENDER,
        renderFun
      );
    },
    rollback(engine) {
      engine.renderManager.removeEventListener<RenderEvent>(
        RENDER_EVENT.RENDER,
        renderFun
      );
    },
  };
};
