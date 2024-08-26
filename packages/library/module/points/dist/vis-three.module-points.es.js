import { defineModule as n, SUPPORT_LIFE_CYCLE as s } from "@vis-three/tdcm";
import { getSolidObjectConfig as f, defineSolidObjectModel as m } from "@vis-three/module-solid-object";
import { Points as c } from "three";
import { ObjectRule as d } from "@vis-three/module-object";
const p = function() {
  return Object.assign(f(), {
    geometry: "",
    material: ""
  });
}, O = n({
  type: "points",
  object: !0,
  models: [
    m((t) => ({
      type: "Points",
      config: p,
      create({ model: e, config: r, engine: i }) {
        const o = new c();
        return t.create({
          model: e,
          config: r,
          engine: i,
          target: o,
          filter: {}
        }), o;
      },
      dispose({ target: e }) {
        t.dispose({ target: e });
      }
    }))
  ],
  rule: d,
  lifeOrder: s.THREE
});
export {
  O as default,
  p as getPointsConfig
};
