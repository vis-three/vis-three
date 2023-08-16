import { ENGINE_EVENT } from "@vis-three/core";
import { transPkgName } from "@vis-three/utils";
import { CSS3D_RENDERER_PLUGIN } from "@vis-three/plugin-css3d-renderer";
import { CSS2D_RENDERER_PLUGIN } from "@vis-three/plugin-css2d-renderer";
const name = "@vis-three/strategy-multi-renderer-event";
const MULTI_RENDERER_EVENT = transPkgName(name);
const MultiRendererEventStrategy = function() {
  let topDom;
  let bottomDom;
  let setDomFun;
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
      engine.addEventListener(ENGINE_EVENT.SETDOM, setDomFun);
    },
    rollback(engine) {
      engine.removeEventListener(ENGINE_EVENT.SETDOM, setDomFun);
    }
  };
};
export { MULTI_RENDERER_EVENT, MultiRendererEventStrategy };
