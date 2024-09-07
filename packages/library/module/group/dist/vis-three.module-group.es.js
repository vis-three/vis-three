import { defineModule as n, SUPPORT_LIFE_CYCLE as c } from "@vis-three/tdcm";
import { getObjectConfig as f, ObjectRule as p, defineObjectModel as u } from "@vis-three/module-object";
import { Group as s } from "three";
const d = function() {
  return Object.assign(f(), {
    children: []
  });
}, a = n({
  type: "group",
  object: !0,
  rule: p,
  models: [
    u((t) => ({
      type: "Group",
      config: d,
      create({ model: e, config: o, engine: i }) {
        const r = new s();
        return t.create({
          model: e,
          target: r,
          config: o,
          filter: {},
          engine: i
        }), r;
      },
      dispose({ target: e }) {
        t.dispose({ target: e });
      }
    }))
  ],
  lifeOrder: c.THREE
});
export {
  a as default,
  d as getGroupConfig
};
