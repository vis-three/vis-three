import { defineModel as m, uniqueSymbol as g, COMPILER_MANAGER_PLUGIN as p, DATA_SUPPORT_MANAGER_PLUGIN as c, MODULE_TYPE as u, generateConfig as O, CONFIG_TYPE as f } from "@vis-three/tdcm";
import { ORBIT_CONTROLS_PLUGIN as C } from "@vis-three/plugin-orbit-controls";
import { syncObject as P, transPkgName as R } from "@vis-three/utils";
import { Vector3 as a } from "three";
import { getControlsConfig as b } from "@vis-three/module-controls";
const d = "@vis-three/strategy-orbit-controls-support", i = "OrbitControls", s = function() {
  return Object.assign(b(), {
    vid: g(i),
    autoRotate: !1,
    autoRotateSpeed: 2,
    enableDamping: !1,
    dampingFactor: 0.05,
    enabled: !0,
    enablePan: !0,
    enableRotate: !0,
    enableZoom: !0,
    maxAzimuthAngle: 1 / 0,
    maxDistance: 1 / 0,
    maxPolarAngle: Math.PI,
    maxZoom: 1 / 0,
    minAzimuthAngle: -1 / 0,
    minDistance: 0,
    minPolarAngle: 0,
    minZoom: 0,
    panSpeed: 1,
    rotateSpeed: 1,
    zoomSpeed: 1,
    screenSpacePanning: !0,
    target: null
  });
}, y = m({
  type: i,
  config: s,
  commands: {
    set: {
      target({ target: t, config: e, path: o, key: r, value: l }) {
        const n = e.target;
        if (!e.type) {
          e.target = new a(0, 0, 0);
          return;
        }
        typeof e.target == "string" || (o.length > 1 ? t.target[r] = l : t.target = new a(
          n.x,
          n.y,
          n.z
        ));
      }
    }
  },
  create({ config: t, engine: e }) {
    let o = e.orbitControls;
    return t.target && (typeof t.target == "string" || (o.target = new a(
      t.target.x,
      t.target.y,
      t.target.z
    ))), P(t, o, {
      target: !0
    }), o;
  },
  dispose({ target: t }) {
    t.dispose();
  }
}), S = R(d), L = function() {
  return {
    name: S,
    condition: [
      p,
      c,
      C
    ],
    exec(t) {
      t.compilerManager.getCompiler(
        u.CONTROLS
      ).useModel(y, (o) => {
        const r = O(
          f.ORBITCONTROLS,
          s()
        );
        t.applyConfig(r);
      });
    },
    rollback() {
    }
  };
};
export {
  S as ORBIT_CONTROLS_SUPPORT_STRATEGY,
  L as OrbitControlsSupportStrategy,
  s as getOrbitControlsConfig
};
