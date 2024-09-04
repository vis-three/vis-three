import { ENGINE_EVENT, SetDomEvent, Strategy } from "@vis-three/core";
import { transPkgName } from "@vis-three/utils";
import { name as pkgname } from "./package.json";
import {
  CSS3DRendererEngine,
  CSS3D_RENDERER_PLUGIN,
} from "@vis-three/plugin-css3d-renderer";
import {
  CSS2DRendererEngine,
  CSS2D_RENDERER_PLUGIN,
} from "@vis-three/plugin-css2d-renderer";

export interface MultiRendererEventEngine
  extends CSS3DRendererEngine,
    CSS2DRendererEngine {}

export const MULTI_RENDERER_EVENT = transPkgName(pkgname);

export const MultiRendererEventStrategy: Strategy<MultiRendererEventEngine> =
  function () {
    let topDom: HTMLElement;
    let bottomDom: HTMLElement;
    let setDomFun: (event: SetDomEvent) => void;

    return {
      name: MULTI_RENDERER_EVENT,
      condition: [CSS3D_RENDERER_PLUGIN, CSS2D_RENDERER_PLUGIN],
      exec(engine) {
        const c3Dom = engine.css3DRenderer.domElement;
        const c2Dom = engine.css2DRenderer.domElement;

        const c3ZIndex = Number(c3Dom.style.zIndex);
        const c2ZIndex = Number(c2Dom.style.zIndex);

        topDom = c3ZIndex > c2ZIndex ? c3Dom : c2Dom;
        bottomDom = c3ZIndex > c2ZIndex ? c2Dom : c3Dom;

        setDomFun = (event) => {
          topDom.appendChild(bottomDom);
        };

        engine.addEventListener<SetDomEvent>(ENGINE_EVENT.SETDOM, setDomFun);
      },
      rollback(engine) {
        engine.removeEventListener<SetDomEvent>(ENGINE_EVENT.SETDOM, setDomFun);
      },
    };
  };
