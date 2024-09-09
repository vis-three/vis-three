import { defineRule as y, DEFAULT_RULE as l, getBasicConfig as E, defineModel as b, defineModule as p, SUPPORT_LIFE_CYCLE as f } from "@vis-three/tdcm";
import { ENGINE_EVENT as u } from "@vis-three/core";
import { AnimationObjectGroup as L, Object3D as R, AnimationMixer as v } from "three";
const A = y([
  function(r) {
    return !(r.key === "name" && r.path.length === 1);
  },
  l.SYMBOL_VALIDATOR,
  l.OPERATE_ADD,
  l.OPERATE_DELETE,
  l.OPERATE_COVER,
  l.OPERATE_COMPILE
]), d = function() {
  return Object.assign(E(), {
    play: !0
  });
}, g = function() {
  return Object.assign(d(), {
    target: "",
    time: 0,
    timeScale: 1
  });
}, h = function() {
  return Object.assign(d(), {
    target: "",
    script: { name: "" },
    attribute: ""
  });
}, s = class s {
  static generateConfig(e, t) {
    if (!s.configLibrary.has(e))
      return console.warn(`event library can not found config by name: ${e}`), {
        name: ""
      };
    const n = (a, o) => {
      for (const c in o)
        a[c] !== void 0 && (typeof o[c] == "object" && o[c] !== null && !Array.isArray(o[c]) ? n(a[c], o[c]) : a[c] = o[c]);
    }, i = JSON.parse(
      JSON.stringify(s.configLibrary.get(e))
    );
    return n(i, t), i;
  }
  static generateScript(e, t, n, i) {
    return s.generatorLibrary.has(i.name) ? s.generatorLibrary.get(i.name)(
      e,
      t,
      n,
      i
    ) : (console.error(
      `event library can not found generator by name: ${i.name}`
    ), () => {
    });
  }
  static has(e) {
    return s.configLibrary.has(e);
  }
};
s.configLibrary = /* @__PURE__ */ new Map(), s.generatorLibrary = /* @__PURE__ */ new Map(), s.register = function({
  config: e,
  generator: t
}) {
  return s.configLibrary.has(e.name) ? (console.warn(
    `EventLibrary has already exist this event generator: ${e.name}, that will be cover.`
  ), s) : (s.configLibrary.set(
    e.name,
    JSON.parse(JSON.stringify(e))
  ), s.generatorLibrary.set(e.name, t), s);
};
let m = s;
const O = b({
  type: "ScriptAnimation",
  config: h,
  shared: {
    eventSymbol: "vis.event",
    createFunction(r, e) {
      let t = e.compilerManager.getObjectBySymbol(
        r.target
      );
      if (!t)
        return console.warn(`can not found object in enigne: ${r.target}`), () => {
        };
      const n = r.attribute.split(".");
      n.shift();
      const i = n.pop();
      for (const a of n) {
        if (t[a] === void 0)
          return console.warn(
            `animaton processor: target object can not found key: ${a}`,
            t
          ), () => {
          };
        t = t[a];
      }
      return m.generateScript(
        e,
        t,
        i,
        r.script
      );
    },
    restoreAttribute(r, e) {
      if (!r.target || !r.attribute)
        return this;
      let t = e.getObjectBySymbol(r.target), n = e.getConfigBySymbol(r.target);
      (!t || !n) && console.warn(
        "scrpit animation model: can not found object target or config in engine",
        r.vid
      );
      const i = r.attribute.split(".");
      i.shift();
      const a = i.pop();
      for (const o of i)
        if (t[o] && n[o])
          t = t[o], n = n[o];
        else
          return console.warn(
            "scrpit animation model: object and config attribute are not sync"
          ), this;
      return t[a] = n[a], this;
    }
  },
  commands: {
    set: {
      play({ target: r, value: e, engine: t }) {
        e ? t.renderManager.addEventListener(
          u.RENDER,
          r
        ) : t.renderManager.removeEventListener(
          u.RENDER,
          r
        );
      },
      $reg: [
        {
          reg: new RegExp(".*"),
          handler({ model: r, target: e, config: t, engine: n, compiler: i }) {
            n.renderManager.removeEventListener(
              u.RENDER,
              e
            ), i.symbolMap.delete(e), r.restoreAttribute(t, n);
            const a = r.createFunction(t, n);
            t.play && n.renderManager.addEventListener(
              u.RENDER,
              a
            ), r.puppet = a, i.symbolMap.set(a, t.vid);
          }
        }
      ]
    }
  },
  create({ model: r, config: e, engine: t }) {
    const n = r.createFunction(e, t);
    return e.play && t.renderManager.addEventListener(
      u.RENDER,
      n
    ), n;
  },
  dispose({ model: r, target: e, config: t, engine: n }) {
    n.renderManager.removeEventListener(
      u.RENDER,
      e
    ), r.restoreAttribute(t, n);
  }
}), M = b({
  type: "MixerAnimation",
  config: g,
  context() {
    return {
      mixerAni: void 0
    };
  },
  create({ model: r, config: e, engine: t, compiler: n }) {
    let i;
    Array.isArray(e.target) ? (i = new L(), e.target.forEach((o) => {
      const c = t.getObjectBySymbol(o);
      c ? i.add(c) : console.warn(
        `mixer animation processor can not found vid in engine: ${o}`
      );
    })) : (i = t.getObjectBySymbol(e.target), i || (console.warn(
      `mixer animation processor can not found vid in engine: ${e.target}`
    ), i = new R()));
    const a = new v(i);
    if (a.time = e.time, a.timeScale = e.timeScale, e.play) {
      const o = (c) => {
        a.update(c.delta);
      };
      t.renderManager.addEventListener(
        u.RENDER,
        o
      ), r.mixerAni = o;
    }
    return a;
  },
  dispose({ model: r, target: e, engine: t }) {
    r.mixerAni && (t.renderManager.removeEventListener(
      u.RENDER,
      r.mixerAni
    ), r.mixerAni = void 0), e.uncacheRoot(e.getRoot()), e._actions.forEach((n) => {
      const i = n.getClip();
      e.uncacheClip(i), e.uncacheAction(i);
    });
  }
}), w = p({
  type: "animation",
  rule: A,
  models: [O, M],
  lifeOrder: f.NINE
});
export {
  m as AniScriptGeneratorManager,
  w as default,
  g as getMixerAnimationConfig,
  h as getScriptAnimationConfig
};
