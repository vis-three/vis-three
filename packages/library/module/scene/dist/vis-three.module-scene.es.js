import { MODULE_TYPE as g, uniqueSymbol as u, defineRule as m, globalOption as d, DEFAULT_RULE as c, defineModule as p, SUPPORT_LIFE_CYCLE as E } from "@vis-three/tdcm";
import { ObjectRule as a, getObjectConfig as b, defineObjectModel as y } from "@vis-three/module-object";
import { Color as i, Fog as l, FogExp2 as f, Scene as O } from "three";
function S(s) {
  s.setSceneBySymbol = function(e) {
    const o = this.compilerManager.getCompiler(g.SCENE);
    return o.map.has(e) ? this.setScene(o.map.get(e).puppet) : console.warn("can not found scene", e), this;
  };
}
const w = [u("Scene")], R = m([
  a[0],
  function(s) {
    return d.symbol.validator(s.symbol) || w.includes(s.symbol);
  },
  c.OPERATE_ADD,
  c.OPERATE_DELETE,
  c.OPERATE_COVER,
  c.OPERATE_COMPILE
]), T = function() {
  return Object.assign(b(), {
    vid: u("Scene"),
    background: "",
    environment: "",
    fog: {
      type: "",
      color: "rgb(150, 150, 150)",
      near: 1,
      far: 200,
      density: 3e-3
    }
  });
}, x = y((s) => ({
  type: "Scene",
  config: T,
  shared: {
    setBackground(e, o, t) {
      if (!o) {
        e.background = null;
        return;
      }
      if (d.symbol.validator(o)) {
        const n = t.compilerManager.getObjectFromModule(
          g.TEXTURE,
          o
        );
        n ? e.background = n : console.warn(`engine can not found this vid texture : '${o}'`);
      } else
        e.background = new i(o);
    },
    setEnvironment(e, o, t) {
      if (!o) {
        e.environment = null;
        return;
      }
      if (d.symbol.validator(o)) {
        const n = t.compilerManager.getObjectFromModule(
          g.TEXTURE,
          o
        );
        n ? e.environment = n : console.warn(`engine can not found this vid texture : '${o}'`);
      } else
        console.warn(`scene environment is illeage: ${o}`);
    }
  },
  commands: {
    set: {
      lookAt() {
      },
      fog({ target: e, config: o, key: t, value: n }) {
        const r = o.fog;
        r.type ? r.type === "Fog" ? !e.fog || !(e.fog instanceof l) ? e.fog = new l(r.color, r.near, r.far) : t === "color" ? e.fog.color.copy(new i(r.color)) : e.fog[t] && (e.fog[t] = n) : r.type === "FogExp2" && (!e.fog || !(e.fog instanceof f) ? e.fog = new f(r.color, r.density) : t === "color" ? e.fog.color.copy(new i(r.color)) : e.fog[t] && (e.fog[t] = n)) : e.fog = null;
      },
      background({ model: e, target: o, value: t, engine: n }) {
        e.setBackground(o, t, n);
      },
      environment({ model: e, target: o, value: t, engine: n }) {
        e.setEnvironment(o, t, n);
      }
    }
  },
  create({ model: e, config: o, engine: t }) {
    const n = new O();
    if (e.setBackground(n, o.background, t), e.setEnvironment(n, o.environment, t), o.fog.type) {
      const r = o.fog;
      r.type === "Fog" ? n.fog = new l(r.color, r.near, r.far) : r.type === "FogExp2" ? n.fog = new f(r.color, r.density) : console.warn(
        `scene model: can not support this type fog:'${o.type}'`
      );
    }
    return s.create({
      model: e,
      config: o,
      target: n,
      engine: t,
      filter: {
        lookAt: !0,
        background: !0,
        environment: !0,
        fog: !0
      }
    }), n;
  },
  dispose({ target: e }) {
    s.dispose({ target: e });
  }
})), h = p({
  type: "scene",
  object: !0,
  rule: R,
  models: [x],
  extend: S,
  lifeOrder: E.THREE + 1
});
export {
  h as default,
  T as getSceneConfig
};
