import { defineRule as p, DEFAULT_RULE as l, getBasicConfig as b, defineModel as E, defineModule as y, SUPPORT_LIFE_CYCLE as f } from "@vis-three/tdcm";
import { ENGINE_EVENT as u } from "@vis-three/core";
import { AnimationObjectGroup as A, Object3D as g, AnimationMixer as L } from "three";
const R = p([
  function(r) {
    return !(r.key === "name" && r.path.length === 1);
  },
  l.SYMBOL_VALIDATOR,
  l.OPERATE_ADD,
  l.OPERATE_DELETE,
  l.OPERATE_COVER,
  l.OPERATE_COMPILE
]), d = function() {
  return Object.assign(b(), {
    play: !0
  });
}, h = function() {
  return Object.assign(d(), {
    target: "",
    time: 0,
    timeScale: 1
  });
}, v = function() {
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
    const n = (o, a) => {
      for (const c in a)
        o[c] !== void 0 && (typeof a[c] == "object" && a[c] !== null && !Array.isArray(a[c]) ? n(o[c], a[c]) : o[c] = a[c]);
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
class w extends m {
}
const O = E({
  type: "ScriptAnimation",
  config: v,
  context() {
    return {
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
        for (const o of n) {
          if (t[o] === void 0)
            return console.warn(
              `animaton processor: target object can not found key: ${o}`,
              t
            ), () => {
            };
          t = t[o];
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
          "AnimationCompiler: can not found object target or config in engine",
          r.vid
        );
        const i = r.attribute.split(".");
        i.shift();
        const o = i.pop();
        for (const a of i)
          if (t[a] && n[a])
            t = t[a], n = n[a];
          else
            return console.warn(
              "AnimationCompiler: object and config attribute are not sync"
            ), this;
        return t[o] = n[o], this;
      }
    };
  },
  commands: {
    set: {
      play({ target: r, value: e, engine: t }) {
        e ? t.renderManager.addEventListener(
          u.RENDER,
          r.scriptAni
        ) : t.renderManager.removeEventListener(
          u.RENDER,
          r.scriptAni
        );
      },
      $reg: [
        {
          reg: new RegExp(".*"),
          handler({ model: r, target: e, config: t, engine: n }) {
            n.renderManager.removeEventListener(
              u.RENDER,
              e.scriptAni
            );
            const i = r.createFunction(t, n);
            e.scriptAni = i, t.play && n.renderManager.addEventListener(
              u.RENDER,
              i
            );
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
    ), {
      scriptAni: n
    };
  },
  dispose({ model: r, target: e, config: t, engine: n }) {
    n.renderManager.removeEventListener(
      u.RENDER,
      e.scriptAni
    ), r.restoreAttribute(t, n);
  }
}), x = E({
  type: "MixerAnimation",
  config: h,
  context() {
    return {
      mixerAni: void 0
    };
  },
  create({ model: r, config: e, engine: t, compiler: n }) {
    let i;
    Array.isArray(e.target) ? (i = new A(), e.target.forEach((a) => {
      const c = t.getObjectBySymbol(a);
      c ? i.add(c) : console.warn(
        `mixer animation processor can not found vid in engine: ${a}`
      );
    })) : (i = t.getObjectBySymbol(e.target), i || (console.warn(
      `mixer animation processor can not found vid in engine: ${e.target}`
    ), i = new g()));
    const o = new L(i);
    if (o.time = e.time, o.timeScale = e.timeScale, e.play) {
      const a = (c) => {
        o.update(c.delta);
      };
      t.renderManager.addEventListener(
        u.RENDER,
        a
      ), r.mixerAni = a;
    }
    return o;
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
}), S = y({
  type: "animation",
  rule: R,
  models: [O, x],
  lifeOrder: f.NINE
});
export {
  w as AniScriptGeneratorManager,
  m as AniScriptManager,
  S as default,
  h as getMixerAnimationConfig,
  v as getScriptAnimationConfig
};
