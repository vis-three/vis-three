import { createSymbol as H, isObjectType as L, OBJECT_MODULE as x, generateConfig as ie, EngineSupport as ce } from "@vis-three/tdcm";
import { isObject as le } from "@vis-three/utils";
import { shallowReactive as fe, EffectScope as ue, proxyRefs as pe, ReactiveEffect as Z, getCurrentScope as ae, isRef as B, isShallow as G, isReactive as j } from "@vue/reactivity";
import { computed as et, reactive as tt, ref as nt, shallowReactive as ot, shallowReadonly as rt, shallowRef as st, toRef as it, toRefs as ct } from "@vue/reactivity";
import { EventDispatcher as he, ENGINE_EVENT as T } from "@vis-three/core";
import { isFunction as D, isPromise as de, isArray as z, EMPTY_OBJ as me, NOOP as ge, hasChanged as Y, remove as ye, isObject as Ee, isSet as ve, isMap as we, isPlainObject as Ce } from "@vue/shared";
const Re = "0.7.0", Q = function(t, e = null, n = {}) {
  return {
    _isVNode: !0,
    type: t,
    props: e,
    config: null,
    component: null,
    el: null,
    key: n.key || null,
    ref: n.ref || null,
    raw: n.raw || null,
    children: null
  };
}, v = function(t) {
  return typeof t == "object" ? !!t._isVNode : !1;
}, N = function(t) {
  return /^on[A-Z]/.test(t);
}, Se = function(t) {
  const e = t.props, n = {};
  for (const o in e)
    N(o) && (n[o] = e[o]);
  return n;
};
var W = /* @__PURE__ */ ((t) => (t.STATIC = "static", t.VIF = "vif", t.VFOR = "vfor", t))(W || {});
const f = function(t, e = null) {
  const n = Q(t, e, {
    key: e && e.key || null,
    ref: e && e.ref || null,
    raw: e && e.raw || null
  });
  return f.add(n), n;
};
f.reset = function() {
  f.el = null, f.scope = "static", f.vnodes = [];
};
f.add = function(t) {
  if (t.el = f.el, f.scope !== "static") {
    const e = f.vnodes[f.vnodes.length - 1];
    f.scope === "vfor" && (t.key || (t.key = e.vnodes.length), e.keyMap.set(t.key, t)), e.vnodes.push(t);
  } else
    f.vnodes.push(t);
  return f.vnodes;
};
const qe = function(t, e = null) {
  return f(t, e);
}, Je = function(t) {
  f.scope = "vif", f.vnodes.push({
    scope: f.scope,
    vnodes: [],
    keyMap: /* @__PURE__ */ new Map()
  }), t(), f.scope = "static";
}, Ue = function(t) {
  f.scope = "vfor", f.vnodes.push({
    scope: f.scope,
    vnodes: [],
    keyMap: /* @__PURE__ */ new Map()
  }), t(), f.scope = "static";
};
var F = /* @__PURE__ */ ((t) => (t.MOUNTED = "mounted", t.BEFORE_DISTORY = "beforeDistory", t.UPDATE = "update", t.FRAME = "frame", t.CAMERA_CHANGE = "cameraChange", t.SCENE_CHANGE = "sceneCHange", t))(F || {});
const Le = function(t = () => {
}) {
  h.currentComponent && h.currentComponent.on("mounted", (e) => t());
}, Ge = function(t = () => {
}) {
  h.currentComponent && h.currentComponent.on(
    "beforeDistory",
    (e) => t()
  );
}, Ye = function(t = () => {
}) {
  h.currentComponent && h.currentComponent.on(
    "frame",
    (e) => t(e.delta, e.total)
  );
};
let I = !1, _ = !1;
const m = [];
let E = 0;
const O = [];
let y = null, R = 0;
const ke = /* @__PURE__ */ Promise.resolve();
function Oe(t) {
  let e = E + 1, n = m.length;
  for (; e < n; ) {
    const o = e + n >>> 1, s = m[o], i = M(s);
    i < t || i === t && s.pre ? e = o + 1 : n = o;
  }
  return e;
}
function X(t) {
  (!m.length || !m.includes(
    t,
    I && t.allowRecurse ? E + 1 : E
  )) && (t.id == null ? m.push(t) : m.splice(Oe(t.id), 0, t), V());
}
function V() {
  !I && !_ && (_ = !0, ke.then(ee));
}
function $(t) {
  Array.isArray(t) ? O.push(...t) : (!y || !y.includes(
    t,
    t.allowRecurse ? R + 1 : R
  )) && O.push(t), V();
}
function Me() {
  if (O.length) {
    const t = [...new Set(O)];
    if (O.length = 0, y) {
      y.push(...t);
      return;
    }
    for (y = t, y.sort((e, n) => M(e) - M(n)), R = 0; R < y.length; R++)
      y[R]();
    y = null, R = 0;
  }
}
const M = (t) => t.id == null ? 1 / 0 : t.id, be = (t, e) => {
  const n = M(t) - M(e);
  if (n === 0) {
    if (t.pre && !e.pre) return -1;
    if (e.pre && !t.pre) return 1;
  }
  return n;
};
function ee() {
  _ = !1, I = !0, m.sort(be);
  try {
    for (E = 0; E < m.length; E++) {
      const t = m[E];
      if (t && t.active !== !1)
        try {
          t();
        } catch (e) {
          console.error(e);
        }
    }
  } finally {
    E = 0, m.length = 0, Me(), I = !1, (m.length || O.length) && ee();
  }
}
const S = Symbol.for("vis.widget.event"), Te = function(t) {
  const e = function(n) {
    e.value(n);
  };
  return e.value = t, e;
}, K = /Once$/;
function J(t) {
  let e = {};
  if (K.test(t)) {
    e = {};
    let o;
    for (; o = t.match(K); )
      t = t.slice(0, t.length - o[0].length), e[o[0].toLowerCase()] = !0;
  }
  return [t.slice(2).toLowerCase(), e];
}
const Pe = function(t, e, n) {
  if (e[S]) {
    console.error("config has already create events", e);
    return;
  }
  const o = Se(t);
  for (const s in o) {
    o[s] = Te(o[s]);
    const [i, c] = J(s);
    n.addEventListener(i, o[s]);
  }
  e[S] = o;
}, Fe = function(t) {
  const e = t.props, n = t.config;
  if (!n[S])
    return;
  const o = n[S];
  for (const s in o) {
    const i = o[s];
    i && i.value !== e[s] && (i.value = e[s]);
  }
}, Ae = function(t, e) {
  const n = t.config;
  if (!n[S])
    return;
  const o = n[S];
  for (const s in o) {
    const i = o[s];
    if (i) {
      const [c, l] = J(s);
      e.removeEventListener(c, i);
    }
  }
  n[S] = void 0;
};
class h extends he {
  constructor(e, n) {
    super(), this.cid = H(), this.name = "", this.el = "", this.isMounted = !1, this.props = fe(Object.create(Object.prototype)), this.scope = new ue(!0), this.subTree = null, this.cacheResources = Object.create(Object.prototype), this.resourcesKeyEnum = Object.create(
      Object.prototype
    ), this.cacheEvent = {}, this.vnode = e;
    const o = e.type;
    o.name && (this.name = o.name), this.el = o.el, this.options = o, this.renderer = n, this.engine = n.engine, this.ctx = n.context, this.createProps(), this.createSetup(), this.createResources(), this.createRender(), this.createEffect();
  }
  static setCurrentComponent(e) {
    h.currentComponent = e, e.scope.on();
  }
  static unsetCurrentComponent() {
    h.currentComponent && h.currentComponent.scope.off(), h.currentComponent = null;
  }
  renderTree() {
    return f.reset(), f.el = this.el, this.render.call(
      { ...this.setupState, ...this.props },
      {
        components: this.options.components || {},
        resources: this.resourcesKeyEnum
      }
    ), f.vnodes;
  }
  createResources() {
    if (!this.options.resources)
      return;
    const e = this.options.resources.call(this.setupState);
    this.engine.registerResources(e), this.cacheResources = e;
    for (const n in e)
      this.resourcesKeyEnum[n] = n;
  }
  createProps() {
    const e = this.options.props || {}, n = this.vnode.props || {}, o = this.props, s = this.options.emits || {}, i = {};
    for (const c in n)
      if (N(c)) {
        const [l, r] = J(c);
        s[l] ? this[r.once ? "once" : "on"](l, n[c]) : console.warn(
          `widget Component: you not declare attribute  ${c}  in emits options`,
          this.options
        );
      } else
        i[c] = n[c];
    for (const c in e) {
      const l = e[c];
      if (l.required && typeof i[c] > "u") {
        console.error("widget component: component prop is required.", {
          component: this,
          props: i,
          key: c
        });
        return;
      }
      let r;
      if (typeof i[c] < "u" ? r = i[c] : l.default && (r = typeof l.default == "function" ? l.default() : l.default), r.constructor !== l.type) {
        console.error(
          "widget component: component prop is not instance of type.",
          {
            component: this,
            props: i,
            key: c,
            value: r,
            type: l.type
          }
        );
        return;
      }
      o[c] = r;
    }
  }
  createSetup() {
    if (!this.options.setup)
      return;
    h.setCurrentComponent(this);
    const e = this.options.setup({
      engine: this.engine,
      props: this.props,
      emit: this.emit.bind(this)
    }) || {};
    this.setupState = pe(e), this.rawSetupState = e, h.unsetCurrentComponent();
  }
  createRender() {
    this.render = this.options.render;
  }
  createEffect() {
    const e = new Z(
      () => {
        if (this.isMounted) {
          const o = this.renderTree(), s = this.subTree;
          if (s.length !== o.length) {
            console.error("widget component render: tree render error", {
              nextTree: o,
              prevTree: s
            });
            return;
          }
          for (let i = 0; i < o.length; i += 1)
            if (v(s[i]) && v(o[i]))
              this.renderer.patch(s[i], o[i]);
            else {
              const c = o[i], l = s[i];
              if (c.scope !== l.scope) {
                console.error("widget component render: tree render error", {
                  nextTree: o,
                  prevTree: s
                });
                return;
              }
              if (c.scope === W.VIF) {
                for (const r of l.vnodes)
                  this.renderer.patch(r, null);
                for (const r of c.vnodes)
                  this.renderer.patch(null, r);
              } else if (c.scope === W.VFOR) {
                for (const r of c.keyMap.keys())
                  l.keyMap.has(r) ? (this.renderer.patch(
                    l.keyMap.get(r),
                    c.keyMap.get(r)
                  ), l.keyMap.delete(r)) : this.renderer.patch(null, c.keyMap.get(r));
                for (const r of l.keyMap.values())
                  this.renderer.unmountElement(r);
              } else
                console.warn(
                  `widget component render: unknow scope type: ${c.scope}`
                );
            }
          this.subTree = o;
        } else {
          const o = this.rawSetupState, s = (r) => {
            r.ref && typeof o[r.ref] < "u" && (o[r.ref].value = r.component ? r.component : r.config || null);
          }, i = (r) => {
            if (r.raw && typeof o[r.raw] < "u")
              if (r.config) {
                const p = this.engine.getObjectBySymbol(r.config.vid);
                p || console.warn("can not found raw object in engine", {
                  component: this,
                  vnode: r
                }), o[r.raw].value = p || null;
              } else {
                console.warn("component raw object is not a native config", {
                  component: this,
                  vnode: r
                });
                return;
              }
          }, c = this.subTree = this.renderTree();
          for (const r of c)
            if (v(r))
              this.renderer.patch(null, r), s(r), i(r);
            else
              for (const p of r.vnodes)
                this.renderer.patch(null, p), s(p), i(p);
          this.isMounted = !0, $(() => this.emit(F.MOUNTED));
          const l = (r) => {
            this.emit(F.FRAME, r);
          };
          this.engine.renderManager.addEventListener(
            T.RENDER,
            l
          ), this.cacheEvent[T.RENDER] = l;
        }
      },
      () => X(n),
      void 0,
      this.scope
    ), n = () => e.run();
    n(), this.effect = e, this.update = n;
  }
  distory() {
    this.engine.removeEventListener(
      T.RENDER,
      this.cacheEvent[T.RENDER]
    ), this.emit(F.BEFORE_DISTORY), this.scope.stop(), this.effect.active = !1, this.effect.stop();
    const e = this.subTree || [];
    for (let n = 0; n < e.length; n += 1)
      if (v(e[n]))
        this.renderer.patch(e[n], null), e[n].config = null, e[n].raw = null;
      else
        for (const o of e[n].vnodes)
          this.renderer.patch(o, null), o.config = null, o.raw = null;
  }
  updateProps(e) {
    const n = this.props;
    for (const o in e)
      n[o] = e[o];
  }
  getState(e = !0) {
    return e ? this.rawSetupState : this.setupState;
  }
}
const Ke = function(t) {
  return t;
}, te = (t) => {
  if (typeof t == "object") {
    if (v(t))
      return t.config.vid;
    for (const e in t)
      t[e] = te(t[e]);
    return t;
  } else
    return t;
};
class Ne {
  constructor(e) {
    this.context = e, this.engine = e.engine;
  }
  log(e, n, o) {
    n ? console[e](`Widget renderer: ${n}`, o) : console.info(`Widget renderer: ${e}`);
  }
  patch(e, n) {
    if (!e && !n) {
      console.error("widget renderer: patch prarams all of null");
      return;
    }
    e !== n && (n && typeof n.type == "string" || e && typeof e.type == "string" ? this.processElement(e, n) : this.processComponent(e, n));
  }
  render(e) {
    this.patch(null, e);
  }
  processElement(e, n) {
    if (!e && !n) {
      console.error("widget renderer: processElement prarams all of null");
      return;
    }
    e === null ? this.mountElement(n) : n === null ? this.unmountElement(e) : this.patchElement(e, n);
  }
  unmountElement(e) {
    if (L(e.type)) {
      if (e.config.parent) {
        const o = this.engine.getConfigFromModules(
          x,
          e.config.parent
        );
        if (!o) {
          console.error(
            "widget renderer: can not found parent config with: ",
            e
          );
          return;
        }
        o.children.splice(
          o.children.indexOf(
            e.config.vid
          ),
          1
        );
      } else if (!e.el) {
        const o = this.engine.getObjectBySymbol(
          e.config.vid
        );
        o || console.error(
          "widget renderer: can not found Three object with: ",
          e
        ), o.removeFromParent();
      }
      const n = this.engine.getObjectBySymbol(
        e.config.vid
      );
      Ae(e, n);
    }
    this.engine.removeConfigBySymbol(e.config.vid);
  }
  mountElement(e) {
    const { element: n, onProps: o } = this.createElement(e);
    if (this.engine.applyConfig(n), L(n.type)) {
      if (!e.el)
        this.engine.scene.add(
          this.engine.getObjectFromModules(x, n.vid)
        );
      else {
        const i = this.engine.getConfigFromModules(
          x,
          e.el
        );
        if (!i) {
          console.error(
            `widget renderer: can not found parent config with: ${e.el}`
          );
          return;
        }
        i.children.push(n.vid);
      }
      const s = this.engine.getObjectBySymbol(n.vid);
      Pe(e, n, s);
    }
  }
  patchElement(e, n) {
    if (e.type !== n.type)
      this.unmountElement(e), this.mountElement(n);
    else {
      n.config = e.config;
      const o = e.config;
      o || console.error("widget renderer: can not found  config with: ", e);
      let s = {};
      const i = n.props;
      let c = !1;
      for (const r in e.props) {
        if (N(r)) {
          c = !0;
          continue;
        }
        s[r] = e.props[r];
      }
      const l = (r, p, g) => {
        for (const u in r)
          v(r[u]) ? v(p[u]) && p[u].config.vid !== r[u].config.vid ? g[u] = p[u].config.vid : v(p[u]) || (g[u] = p[u]) : le(r[u]) ? l(r[u], p[u], g[u]) : p[u] !== r[u] && (g[u] = p[u]);
      };
      l(s, i, o), c && Fe(n);
    }
  }
  createElement(e) {
    const n = e.props, o = {}, s = {};
    for (const c in n)
      ["ref", "index"].includes(c) || (N(c) ? s[c] = n[c] : o[c] = te(n[c]));
    const i = ie(e.type, o, {
      strict: !1,
      warn: !1
    });
    return e.config = i, { element: i, onProps: s };
  }
  processComponent(e, n) {
    if (!e && !n) {
      console.error("widget renderer: processElement prarams all of null");
      return;
    }
    e === null ? this.mountComponent(n) : n === null ? this.unmountComponent(e) : this.patchComponent(e, n);
  }
  mountComponent(e) {
    e.component = new h(e, this);
  }
  unmountComponent(e) {
    var n;
    (n = e.component) == null || n.distory(), e.component = null;
  }
  patchComponent(e, n) {
    const o = e.component;
    n.component = o, o.vnode = n;
    const s = e.props || {}, i = n.props || {}, c = {};
    let l = !1;
    for (const r in i)
      i[r] !== s[r] && (c[r] = i[r], l = !0);
    l && (o.updateProps(c), o.update());
  }
}
class Ie {
  constructor(e, n) {
    this.wid = H(), this.version = Re, this.components = {}, this.instance = null, this.engine = e, this.root = n, this.renderer = new Ne(this);
  }
  component(e, n) {
    if (typeof e == "object") {
      if (n = e, !n.name) {
        console.error(
          "widget register component must be provide a name",
          n
        );
        return;
      }
      e = n.name;
    }
    if (!n) {
      console.error(
        "widget register component must be provide a component not a null",
        e
      );
      return;
    }
    if (this.components[e]) {
      console.warn(`A component with this name already exists: ${e}`);
      return;
    }
    this.components[e] = n;
  }
  mount() {
    const e = Q(this.root);
    return this.renderer.render(e), this.instance = e.component, this;
  }
  getState() {
    var e;
    return (e = this.instance) == null ? void 0 : e.getState(!0);
  }
  unmount() {
    var e;
    (e = this.instance) == null || e.distory();
  }
  use() {
  }
}
class xe extends ce {
  constructor(e = {}) {
    super(e);
  }
  createWidget(e) {
    return new Ie(this, e);
  }
}
const He = function(t, e = {}) {
  const n = new xe();
  return t.modules && t.modules.forEach((o) => {
    n.registModule(o);
  }), t.plugins && t.plugins.forEach((o) => {
    n.install(o);
  }), t.strategy && t.strategy.forEach((o) => {
    n.exec(o);
  }), t.wdigets && t.wdigets.forEach((o) => {
    n.createWidget(o);
  }), n;
}, Ze = function(t) {
  return {
    value: t
  };
};
function A(t, e, n) {
  let o;
  try {
    o = n ? t(...n) : t();
  } catch (s) {
    console.error(s);
  }
  return o;
}
function q(t, e, n) {
  if (D(t)) {
    const s = A(t, e, n);
    return s && de(s) && s.catch((i) => {
      console.error(i);
    }), s;
  }
  const o = [];
  for (let s = 0; s < t.length; s++)
    o.push(q(t[s], e, n));
  return o;
}
function ze(t, e) {
  return ne(t, null, e);
}
const P = {};
function Qe(t, e, n) {
  return ne(t, e, n);
}
function ne(t, e, { immediate: n, deep: o, flush: s, onTrack: i, onTrigger: c } = me) {
  var U;
  const l = ae() === ((U = h.currentComponent) == null ? void 0 : U.scope) ? h.currentComponent : null;
  let r, p = !1, g = !1;
  if (B(t) ? (r = () => t.value, p = G(t)) : j(t) ? (r = () => t, o = !0) : z(t) ? (g = !0, p = t.some((a) => j(a) || G(a)), r = () => t.map((a) => {
    if (B(a))
      return a.value;
    if (j(a))
      return k(a);
    if (D(a))
      return A(a);
  })) : D(t) ? e ? r = () => A(t) : r = () => {
    if (!(l && !l.isMounted))
      return u && u(), q(t, l);
  } : r = ge, e && o) {
    const a = r;
    r = () => k(a());
  }
  let u, oe = (a) => {
    u = d.onStop = () => {
      A(a), u = d.onStop = void 0;
    };
  }, w = g ? new Array(t.length).fill(P) : P;
  const C = () => {
    if (d.active)
      if (e) {
        const a = d.run();
        (o || p || (g ? a.some((re, se) => Y(re, w[se])) : Y(a, w))) && (u && u(), q(e, l, [
          a,
          // pass undefined as the old value when it's changed for the first time
          w === P ? void 0 : g && w[0] === P ? [] : w,
          oe
        ]), w = a);
      } else
        d.run();
  };
  C.allowRecurse = !!e;
  let b;
  s === "sync" ? b = C : s === "post" ? b = () => $(C) : (C.pre = !0, l && (C.id = l.cid), b = () => X(C));
  const d = new Z(r, b);
  return e ? n ? C() : w = d.run() : s === "post" ? $(d.run.bind(d)) : d.run(), () => {
    d.stop(), l && l.scope && ye(l.scope.effects, d);
  };
}
function k(t, e) {
  if (!Ee(t) || t.__v_skip || (e = e || /* @__PURE__ */ new Set(), e.has(t)))
    return t;
  if (e.add(t), B(t))
    k(t.value, e);
  else if (z(t))
    for (let n = 0; n < t.length; n++)
      k(t[n], e);
  else if (ve(t) || we(t))
    t.forEach((n) => {
      k(n, e);
    });
  else if (Ce(t))
    for (const n in t)
      k(t[n], e);
  return t;
}
export {
  xe as EngineWidget,
  et as computed,
  Ke as defineComponent,
  He as defineEngineWidget,
  qe as h,
  Ge as onBeforeDistory,
  Ye as onFrame,
  Le as onMounted,
  Ze as raw,
  tt as reactive,
  nt as ref,
  ot as shallowReactive,
  rt as shallowReadonly,
  st as shallowRef,
  it as toRef,
  ct as toRefs,
  Ue as vfor,
  Je as vif,
  Qe as watch,
  ze as watchEffect
};
