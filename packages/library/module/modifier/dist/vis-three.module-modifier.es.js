import { Compiler as M, getBasicConfig as p, defineModel as h, MODEL_EVENT as f, defineModule as C, SUPPORT_LIFE_CYCLE as E } from "@vis-three/tdcm";
import { BooleanModifier as O } from "@vis-three/library-modifier";
import { syncObject as T } from "@vis-three/utils";
class b extends M {
  constructor(r) {
    super(r), this.cacheRenderFun = /* @__PURE__ */ new Map(), this.sourceModifiers = /* @__PURE__ */ new Map();
  }
  integrateModifer(r) {
    this.sourceModifiers.has(r.source) || this.sourceModifiers.set(r.source, []);
    const t = this.sourceModifiers.get(r.source);
    t.includes(r) || t.push(r);
  }
  chainRender(r) {
    if (!this.sourceModifiers.has(r.source)) {
      console.error(
        `${this.MODULE} compiler can not found modifier list`,
        r
      );
      return;
    }
    const t = this.sourceModifiers.get(r.source);
    t.includes(r) || console.error(
      `${this.MODULE} compiler: can not found this modifier in source list`,
      r
    );
    const c = t.slice(t.indexOf(r) + 1, t.length);
    for (const o of c)
      o.render();
  }
}
const F = function() {
  return Object.assign(p(), {
    name: "",
    visible: !0,
    source: "",
    index: 0
  });
}, l = function() {
  return Object.assign(F(), {
    target: "",
    mode: "subtract"
  });
}, D = h({
  type: "BooleanModifier",
  config: l,
  shared: {
    modifyKey: [
      "position.x",
      "position.y",
      "position.z",
      "rotation.x",
      "rotation.y",
      "rotation.z",
      "scale.x",
      "scale.y",
      "scale.z",
      "parent"
    ]
  },
  context() {
    return {
      renderFun: () => {
      },
      cacheTarget: ""
    };
  },
  commands: {
    set: {
      source: () => {
      },
      target: ({ model: e, target: r, config: t, engine: c }) => {
        e.toAsync((o) => {
          var g, a;
          if (t.target) {
            const u = c.compilerManager.getObjectBySymbol(
              t.target
            );
            if (!u)
              return o && console.warn(
                `Boolean modifier processor can not found object by vid: ${t.target}`
              ), !1;
            if (r.target = u, e.cacheTarget) {
              const i = e.toModel(e.cacheTarget);
              for (const d of e.modifyKey)
                i == null || i.off(
                  `${f.COMPILED_ATTR}:${d}`,
                  e.renderFun
                );
              const y = e.toConfig(e.cacheTarget);
              y && y.geometry && ((g = e.toModel(y.geometry)) == null || g.off(f.COMPILED_UPDATE, e.renderFun));
            }
            const n = e.toModel(t.target);
            for (const i of e.modifyKey)
              n == null || n.on(
                `${f.COMPILED_ATTR}:${i}`,
                e.renderFun
              );
            const s = e.toConfig(t.target);
            return s && s.geometry && ((a = e.toModel(s.geometry)) == null || a.on(f.COMPILED_UPDATE, e.renderFun)), e.cacheTarget = t.target, e.renderFun(), !0;
          }
          return !0;
        });
      },
      $reg: [
        {
          reg: new RegExp(".*"),
          handler({ model: e, value: r, key: t, target: c }) {
            c[t] = r, e.renderFun();
          }
        }
      ]
    }
  },
  create({ model: e, config: r, engine: t, compiler: c }) {
    const o = new O({
      mode: r.mode
    });
    return e.renderFun = () => {
      o.render(), c.chainRender(o);
    }, e.toAsync((g) => {
      var a;
      if (r.source) {
        const u = t.compilerManager.getObjectBySymbol(
          r.source
        );
        if (!u)
          return g && console.warn(
            `Boolean modifier processor can not found object by vid: ${r.source}`
          ), !1;
        const n = e.toModel(r.source);
        for (const i of e.modifyKey)
          n == null || n.on(
            `${f.COMPILED_ATTR}:${i}`,
            e.renderFun
          );
        const s = e.toConfig(
          r.source
        );
        return s && s.geometry && ((a = e.toModel(s.geometry)) == null || a.on(f.COMPILED_UPDATE, e.renderFun)), o.source = u, c.integrateModifer(o), e.renderFun(), !0;
      }
      return !0;
    }), e.toAsync((g) => {
      var a;
      if (r.target) {
        const u = t.compilerManager.getObjectBySymbol(
          r.target
        );
        if (!u)
          return g && console.warn(
            `Boolean modifier processor can not found object by vid: ${r.target}`
          ), !1;
        o.target = u;
        const n = e.toModel(r.target);
        for (const i of e.modifyKey)
          n == null || n.on(
            `${f.COMPILED_ATTR}:${i}`,
            e.renderFun
          );
        const s = e.toConfig(
          r.target
        );
        return s && s.geometry && ((a = e.toModel(s.geometry)) == null || a.on(f.COMPILED_UPDATE, e.renderFun)), e.cacheTarget = r.target, e.renderFun(), !0;
      }
      return !0;
    }), T(r, o, { target: !0, source: !0 }), o;
  },
  dispose({ target: e }) {
    e.dispose();
  }
}), A = C({
  type: "modifier",
  compiler: b,
  models: [D],
  lifeOrder: E.NINE
});
export {
  b as ModifierCompiler,
  A as default,
  l as getBooleanModifierConfig,
  F as getModifierConfig
};
