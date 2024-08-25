import { defineModule as n, SUPPORT_LIFE_CYCLE as s } from "@vis-three/tdcm";
import { ObjectRule as a } from "@vis-three/module-object";
import { getSolidObjectConfig as m, defineSolidObjectModel as p } from "@vis-three/module-solid-object";
import { Mesh as c } from "three";
const f = function() {
  return Object.assign(m(), {
    geometry: "",
    material: "",
    morphTargetInfluences: [],
    morphTargetDictionary: {}
  });
}, d = n({
  type: "mesh",
  object: !0,
  models: [
    p((o) => ({
      type: "Mesh",
      config: f,
      create({ model: r, config: t, engine: i }) {
        const e = new c();
        return e.morphTargetInfluences = JSON.parse(
          JSON.stringify(t.morphTargetInfluences)
        ), e.morphTargetDictionary = JSON.parse(
          JSON.stringify(t.morphTargetDictionary)
        ), o.create({
          model: r,
          config: t,
          engine: i,
          target: e,
          filter: {
            morphTargetInfluences: !0,
            morphTargetDictionary: !0
          }
        }), e;
      },
      dispose({ target: r }) {
        o.dispose({ target: r });
      }
    }))
  ],
  rule: a,
  lifeOrder: s.THREE
});
export {
  d as default,
  f as getMeshConfig
};
