import { defineModule as i, SUPPORT_LIFE_CYCLE as n } from "@vis-three/tdcm";
import { getObjectConfig as f, ObjectRule as s, defineObjectModel as b } from "@vis-three/module-object";
import { Object3D as d } from "three";
const j = function() {
  return Object.assign(f(), {});
}, g = i({
  type: "object3D",
  object: !0,
  rule: s,
  models: [
    b((t) => ({
      type: "Object3D",
      config: j,
      create({ model: e, config: r, engine: c }) {
        const o = new d();
        return t.create({
          model: e,
          target: o,
          config: r,
          filter: {},
          engine: c
        }), o;
      },
      dispose({ target: e }) {
        t.dispose({ target: e });
      }
    }))
  ],
  lifeOrder: n.THREE
});
export {
  g as default,
  j as getObject3DConfig
};
