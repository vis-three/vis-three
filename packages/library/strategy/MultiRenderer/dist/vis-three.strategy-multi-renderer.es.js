import { ENGINE_EVENT as c } from "@vis-three/core";
import { transPkgName as d } from "@vis-three/utils";
import { CSS3D_RENDERER_PLUGIN as D } from "@vis-three/plugin-css3d-renderer";
import { CSS2D_RENDERER_PLUGIN as l } from "@vis-three/plugin-css2d-renderer";
const N = "@vis-three/strategy-multi-renderer", R = d(N), S = function() {
  let n, m, t;
  return {
    name: R,
    condition: [D, l],
    exec(e) {
      const o = e.css3DRenderer.domElement, r = e.css2DRenderer.domElement, E = Number(o.style.zIndex), s = Number(r.style.zIndex);
      n = E > s ? o : r, m = E > s ? r : o, t = (i) => {
        n.appendChild(m);
      }, e.addEventListener(c.SETDOM, t);
    },
    rollback(e) {
      e.removeEventListener(c.SETDOM, t);
    }
  };
};
export {
  R as MULTI_RENDERER_EVENT,
  S as MultiRendererEventStrategy
};
