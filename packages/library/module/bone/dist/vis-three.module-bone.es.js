import { defineModule as i, SUPPORT_LIFE_CYCLE as c } from "@vis-three/tdcm";
import { getObjectConfig as f, ObjectRule as s, defineObjectModel as d } from "@vis-three/module-object";
import { Bone as l } from "three";
const p = function() {
  return Object.assign(f(), {
    children: []
  });
}, a = i({
  type: "bone",
  object: !0,
  rule: s,
  models: [
    d((t) => ({
      type: "Bone",
      config: p,
      create({ model: e, config: n, engine: r }) {
        const o = new l();
        return t.create({
          model: e,
          target: o,
          config: n,
          filter: {},
          engine: r
        }), o;
      },
      dispose({ target: e }) {
        t.dispose({ target: e });
      }
    }))
  ],
  lifeOrder: c.THREE - 2
});
export {
  a as default,
  p as getBoneConfig
};
