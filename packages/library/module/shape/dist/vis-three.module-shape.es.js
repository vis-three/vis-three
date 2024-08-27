import { getBasicConfig as M, defineModel as E, MODULE_TYPE as l, MODEL_EVENT as c, defineModule as u, SUPPORT_LIFE_CYCLE as i } from "@vis-three/tdcm";
import { Shape as P } from "three";
const f = function() {
  return Object.assign(M(), {
    shape: "",
    holes: []
  });
}, m = E({
  type: "Shape",
  config: f,
  context() {
    return {
      pathEventMap: /* @__PURE__ */ new Map()
    };
  },
  commands: {
    add: {
      holes({ model: t, target: e, engine: n, config: o, value: s }) {
        var p;
        const h = n.compilerManager.getObjectFromModule(
          l.PATH,
          s
        );
        if (!h) {
          console.warn(`shape model: can not found path: ${s}`);
          return;
        }
        e.holes.push(h);
        const a = o.holes.length - 1, r = () => {
          o.holes[a] = o.holes[a];
        };
        (p = t.toModel(s)) == null || p.on(c.COMPILED_UPDATE, r), t.pathEventMap.set(h, r);
      }
    },
    set: {
      shape({ model: t, target: e, engine: n, value: o }) {
        const s = n.compilerManager.getObjectFromModule(
          l.PATH,
          o
        );
        s ? e.curves = s.curves : console.warn(`shape model: can not found path: ${o}`);
      },
      holes({ target: t, engine: e, path: n, value: o }) {
        const s = Number(n[1]);
        if (!Number.isInteger(s)) {
          console.warn("shape model: delete holes error:", n);
          return;
        }
        const h = e.compilerManager.getObjectFromModule(
          l.PATH,
          o
        );
        if (!h) {
          console.warn(`shape model: can not found path: ${o}`);
          return;
        }
        t.holes[s] = h;
      }
    },
    delete: {
      holes({ model: t, target: e, path: n }) {
        var s;
        const o = Number(n[1]);
        if (!Number.isInteger(o)) {
          console.warn("shape processor: delete holes error:", n);
          return;
        }
        (s = t.toModel(e.holes[o])) == null || s.off(
          c.COMPILED_UPDATE,
          t.pathEventMap.get(e.holes[o])
        ), t.pathEventMap.delete(e.holes[o]), e.holes.splice(o, 1);
      }
    }
  },
  create({ model: t, config: e, engine: n }) {
    var s, h;
    const o = new P();
    if (e.shape) {
      const a = n.compilerManager.getObjectFromModule(
        l.PATH,
        e.shape
      );
      if (!a)
        console.warn(`shape processor can not found path: ${e.shape}`);
      else {
        o.curves = a.curves;
        const r = () => {
          e.shape = e.shape;
        };
        (s = t.toModel(e.shape)) == null || s.on(c.COMPILED_UPDATE, r), t.pathEventMap.set(a, r);
      }
    }
    if (e.holes.length)
      for (let a = 0; a < e.holes.length; a += 1) {
        const r = e.holes[a], p = n.compilerManager.getObjectFromModule(
          l.PATH,
          r
        );
        if (!p)
          console.warn(`shape processor can not found path: ${r}`);
        else {
          o.holes.push(p);
          const d = () => {
            e.holes[a] = e.holes[a];
          };
          (h = t.toModel(e.shape)) == null || h.on(c.COMPILED_UPDATE, d), t.pathEventMap.set(p, d);
        }
      }
    return o;
  },
  dispose({ model: t, target: e }) {
    var n;
    e.curves = [], e.holes = [];
    for (const [o, s] of t.pathEventMap.entries())
      (n = t.toModel(o)) == null || n.off(c.COMPILED_UPDATE, s);
    t.pathEventMap.clear();
  }
}), T = u({
  type: "shape",
  models: [m],
  lifeOrder: i.ONE
});
export {
  T as default,
  f as getShapeConfig
};
