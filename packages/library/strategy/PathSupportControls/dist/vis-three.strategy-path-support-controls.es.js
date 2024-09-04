import { transPkgName as i } from "@vis-three/utils";
import { getBasicConfig as r, defineModel as p, uniqueSymbol as l, PLUGINS as f, MODULE_TYPE as b, generateConfig as C, CONFIG_TYPE as a } from "@vis-three/tdcm";
import { PATH_SUPPORT_CONTROLS_PLUGIN as m } from "@vis-three/plugin-path-support-controls";
const S = "@vis-three/strategy-path-support-controls", u = function() {
  return Object.assign(r(), {});
}, c = "PathSupportControls", s = function() {
  return Object.assign(u(), {
    vid: l(c),
    name: "",
    type: c,
    object: "",
    config: null,
    visible: !1
  });
}, g = p({
  type: c,
  config: s,
  commands: {
    set: {
      config({ target: o, value: n, engine: e }) {
        if (!n) {
          o.disconnect();
          return;
        }
        const t = e.getConfigBySymbol(n);
        t ? o.setConfig(t) : console.warn(
          `pathSupportControls processor can not found config in engine: ${n}`
        ), o.connect();
      },
      object({ target: o, value: n, engine: e }) {
        if (!n) {
          o.disconnect();
          return;
        }
        const t = e.getObjectBySymbol(n);
        t ? o.setObject(t) : console.warn(
          `pathSupportControls processor can not found object in engine: ${n}`
        ), o.connect();
      },
      visible({ target: o, value: n }) {
        n ? o.connect() : o.disconnect(), o.visible = n;
      }
    }
  },
  create({ config: o, engine: n }) {
    const e = n.pathSupportControls;
    if (o.config) {
      const t = n.getConfigBySymbol(o.config);
      t ? e.setConfig(t) : console.warn(
        `pathSupportControls processor can not found config in engine: ${o.config}`
      );
    }
    if (o.object) {
      const t = n.getObjectBySymbol(o.object);
      t ? e.setObject(t) : console.warn(
        `pathSupportControls processor can not found object in engine: ${o.object}`
      );
    }
    return o.object && o.config && e.connect(), e.visible = o.visible, n.scene.add(e), e;
  },
  dispose({ target: o }) {
    o.removeFromParent(), o.disconnect(), o.dispose();
  }
}), d = i(S), T = function() {
  return {
    name: d,
    condition: [...f, m],
    exec(o) {
      o.compilerManager.getCompiler(
        b.CONTROLS
      ).useModel(g, (e) => {
        const t = C(
          a.PATHSUPPORTCONTROLS,
          s()
        );
        o.applyConfig(t);
      });
    },
    rollback(o) {
    }
  };
};
export {
  d as PATH_SUPPORT_CONTROLS_STRATEGY,
  T as PathSupportControlsStrategy,
  s as getPathSupportControlsConfig
};
