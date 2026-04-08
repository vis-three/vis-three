import { defineModule as i, SUPPORT_LIFE_CYCLE as a } from "@vis-three/tdcm";
import { getObjectConfig as n, defineObjectModel as s, ObjectRule as d } from "@vis-three/module-object";
import { Object3D as u } from "three";
const f = function() {
  return Object.assign(n(), {});
}, b = function() {
  return Object.assign(n(), {
    url: "",
    raw: !0
  });
}, j = s((t) => ({
  type: "Object3D",
  config: f,
  create({ model: e, config: o, engine: c }) {
    const r = new u();
    return t.create({
      model: e,
      target: r,
      config: o,
      filter: {},
      engine: c
    }), r;
  },
  dispose({ target: e }) {
    t.dispose({ target: e });
  }
})), O = s(
  (t) => ({
    type: "LoadObject3D",
    config: b,
    commands: {
      set: {
        //TODO:
        url() {
        },
        //TODO:
        raw() {
        }
      }
    },
    create({ model: e, config: o, engine: c }) {
      const r = c.resourceManager.resourceMap.get(o.url);
      return t.create({
        model: e,
        target: r,
        config: o,
        filter: {},
        engine: c
      }), r;
    },
    dispose({ target: e }) {
      t.dispose({ target: e });
    }
  })
), m = i({
  type: "object3D",
  object: !0,
  rule: d,
  models: [j, O],
  lifeOrder: a.THREE
});
export {
  m as default,
  b as getLoadObject3DConfig,
  f as getObject3DConfig
};
