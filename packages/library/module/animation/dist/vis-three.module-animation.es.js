import { defineRule as y, DEFAULT_RULE as l, getBasicConfig as E, defineModel as b, defineModule as p, SUPPORT_LIFE_CYCLE as f } from "@vis-three/tdcm";
import { ENGINE_EVENT as u } from "@vis-three/core";
import { AnimationObjectGroup as g, Object3D as A, AnimationMixer as L } from "three";
const R = y([
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
}, v = function() {
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
    const n = (i, o) => {
      for (const c in o)
        i[c] !== void 0 && (typeof o[c] == "object" && o[c] !== null && !Array.isArray(o[c]) ? n(i[c], o[c]) : i[c] = o[c]);
    }, a = JSON.parse(
      JSON.stringify(s.configLibrary.get(e))
    );
    return n(a, t), a;
  }
  static generateScript(e, t, n, a) {
    return s.generatorLibrary.has(a.name) ? s.generatorLibrary.get(a.name)(
      e,
      t,
      n,
      a
    ) : (console.error(
      `event library can not found generator by name: ${a.name}`
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
class j extends m {
}
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
      const a = n.pop();
      for (const i of n) {
        if (t[i] === void 0)
          return console.warn(
            `animaton processor: target object can not found key: ${i}`,
            t
          ), () => {
          };
        t = t[i];
      }
      return m.generateScript(
        e,
        t,
        a,
        r.script
      );
    },
    restoreAttribute(r, e) {
      if (!r.target || !r.attribute)
        return this;
      let t = e.getObjectBySymbol(r.target), n = e.getConfigBySymbol(r.target);
      (!t || !n) && console.warn(
        "AnimationCompiler: can not found object target or config in engine",
        r.vid
      );
      const a = r.attribute.split(".");
      a.shift();
      const i = a.pop();
      for (const o of a)
        if (t[o] && n[o])
          t = t[o], n = n[o];
        else
          return console.warn(
            "AnimationCompiler: object and config attribute are not sync"
          ), this;
      return t[i] = n[i], this;
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
          handler({ model: r, target: e, config: t, engine: n, compiler: a }) {
            n.renderManager.removeEventListener(
              u.RENDER,
              e
            ), a.symbolMap.delete(e);
            const i = r.createFunction(t, n);
            t.play && n.renderManager.addEventListener(
              u.RENDER,
              i
            ), r.puppet = i, a.symbolMap.set(i, t.vid);
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
  config: v,
  context() {
    return {
      mixerAni: void 0
    };
  },
  create({ model: r, config: e, engine: t, compiler: n }) {
    let a;
    Array.isArray(e.target) ? (a = new g(), e.target.forEach((o) => {
      const c = t.getObjectBySymbol(o);
      c ? a.add(c) : console.warn(
        `mixer animation processor can not found vid in engine: ${o}`
      );
    })) : (a = t.getObjectBySymbol(e.target), a || (console.warn(
      `mixer animation processor can not found vid in engine: ${e.target}`
    ), a = new A()));
    const i = new L(a);
    if (i.time = e.time, i.timeScale = e.timeScale, e.play) {
      const o = (c) => {
        i.update(c.delta);
      };
      t.renderManager.addEventListener(
        u.RENDER,
        o
      ), r.mixerAni = o;
    }
    return i;
  },
  dispose({ model: r, target: e, engine: t }) {
    r.mixerAni && (t.renderManager.removeEventListener(
      u.RENDER,
      r.mixerAni
    ), r.mixerAni = void 0), e.uncacheRoot(e.getRoot()), e._actions.forEach((n) => {
      const a = n.getClip();
      e.uncacheClip(a), e.uncacheAction(a);
    });
  }
}), w = p({
  type: "animation",
  rule: R,
  models: [O, M],
  lifeOrder: f.NINE
});
export {
  j as AniScriptGeneratorManager,
  m as AniScriptManager,
  w as default,
  v as getMixerAnimationConfig,
  h as getScriptAnimationConfig
};
