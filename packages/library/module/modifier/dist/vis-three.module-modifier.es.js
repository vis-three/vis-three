import { Compiler as y, getBasicConfig as g, defineModel as p, MODEL_EVENT as a, defineModule as h, SUPPORT_LIFE_CYCLE as l } from "@vis-three/tdcm";
import { BooleanModifier as E } from "@vis-three/library-modifier";
import { syncObject as O } from "@vis-three/utils";
class T extends y {
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
    const i = t.slice(t.indexOf(r) + 1, t.length);
    for (const n of i)
      n.render();
  }
}
const b = function() {
  return Object.assign(g(), {
    name: "",
    visible: !0,
    source: "",
    index: 0
  });
}, F = function() {
  return Object.assign(b(), {
    target: "",
    mode: "subtract"
  });
}, C = p({
  type: "BooleanModifier",
  config: F,
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
      cacheTarget: {}
    };
  },
  commands: {
    set: {
      source: () => {
      },
      target: ({ model: e, target: r, config: t, engine: i }) => {
        e.toAsync((n) => {
          var f, c;
          if (t.target) {
            const o = i.compilerManager.getObjectBySymbol(
              t.target
            );
            if (!o)
              return n && console.warn(
                `Boolean modifier processor can not found object by vid: ${t.target}`
              ), !1;
            r.target = o;
            const s = e.cacheTarget;
            if (s) {
              const d = e.toModel(s);
              for (const M of e.modifyKey)
                d == null || d.off(
                  `${a.COMPILED_ATTR}:${M}`,
                  e.renderFun
                );
              (f = e.toModel(s.geometry)) == null || f.off(a.COMPILED_UPDATE, e.renderFun);
            }
            const u = e.toModel(t.target);
            for (const d of e.modifyKey)
              u == null || u.off(
                `${a.COMPILED_ATTR}:${d}`,
                e.renderFun
              );
            return (c = e.toModel(o.geometry)) == null || c.off(a.COMPILED_UPDATE, e.renderFun), e.cacheTarget = o, e.renderFun(), !0;
          }
          return !0;
        });
      },
      $reg: [
        {
          reg: new RegExp(".*"),
          handler({ model: e, value: r, key: t, target: i }) {
            i[t] = r, e.renderFun();
          }
        }
      ]
    }
  },
  create({ model: e, config: r, engine: t, compiler: i }) {
    const n = new E({
      mode: r.mode
    });
    return e.renderFun = () => {
      n.render(), i.chainRender(n);
    }, e.toAsync((f) => {
      var c;
      if (r.source) {
        const o = t.compilerManager.getObjectBySymbol(
          r.source
        );
        if (!o)
          return f && console.warn(
            `Boolean modifier processor can not found object by vid: ${r.source}`
          ), !1;
        const s = e.toModel(r.source);
        for (const u of e.modifyKey)
          s == null || s.on(
            `${a.COMPILED_ATTR}:${u}`,
            e.renderFun
          );
        return (c = e.toModel(o.geometry)) == null || c.on(a.COMPILED_UPDATE, e.renderFun), n.source = o, i.integrateModifer(n), e.renderFun(), !0;
      }
      return !0;
    }), e.toAsync((f) => {
      var c;
      if (r.target) {
        const o = t.compilerManager.getObjectBySymbol(
          r.target
        );
        if (!o)
          return f && console.warn(
            `Boolean modifier processor can not found object by vid: ${r.target}`
          ), !1;
        n.target = o;
        const s = e.toModel(r.target);
        for (const u of e.modifyKey)
          s == null || s.on(
            `${a.COMPILED_ATTR}:${u}`,
            e.renderFun
          );
        return (c = e.toModel(o.geometry)) == null || c.on(a.COMPILED_UPDATE, e.renderFun), e.cacheTarget = o, e.renderFun(), !0;
      }
      return !0;
    }), O(r, n, { target: !0, source: !0 }), n;
  },
  dispose({ target: e }) {
    e.dispose();
  }
}), $ = h({
  type: "modifier",
  compiler: T,
  models: [C],
  lifeOrder: l.NINE
});
export {
  T as ModifierCompiler,
  $ as default,
  F as getBooleanModifierConfig,
  b as getModifierConfig
};
