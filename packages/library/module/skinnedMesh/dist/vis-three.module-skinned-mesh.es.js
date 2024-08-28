import { ObjectRule as d } from "@vis-three/module-object";
import { defineModule as l, SUPPORT_LIFE_CYCLE as a } from "@vis-three/tdcm";
import { getSolidObjectConfig as c, defineSolidObjectModel as M } from "@vis-three/module-solid-object";
import { SkinnedMesh as b, Matrix4 as k } from "three";
const m = function() {
  return Object.assign(c(), {
    skeleton: "",
    bindMode: "attached",
    bindMatrix: []
  });
}, f = M(
  (r) => ({
    type: "SkinnedMesh",
    config: m,
    commands: {
      add: {},
      set: {},
      delete: {}
    },
    create({ model: o, config: e, engine: s }) {
      const t = new b();
      if (r.create({
        model: o,
        target: t,
        config: e,
        engine: s,
        filter: {
          skeleton: !0
        }
      }), e.skeleton) {
        const n = s.getObjectBySymbol(e.skeleton);
        n || console.warn(
          `skinnedMesh processor can not found skeleton in engine: ${e.skeleton}`
        ), o.toTrigger("object", () => {
          if (e.bindMatrix.length) {
            const i = new k();
            i.elements = [].concat(
              e.bindMatrix
            ), t.bind(n, i);
          } else
            t.bind(n, t.matrixWorld);
          return !1;
        });
      }
      return t;
    },
    dispose() {
    }
  })
), S = l({
  type: "skinnedMesh",
  object: !0,
  rule: d,
  models: [f],
  lifeOrder: a.THREE
});
export {
  S as default,
  m as getSkinnedMeshConfig
};
