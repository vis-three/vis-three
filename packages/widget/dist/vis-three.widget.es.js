import { createSymbol as H, isObjectType as U, OBJECT_MODULE as x, generateConfig as ie, EngineSupport as ce } from "@vis-three/tdcm";
import { isObject as ue } from "@vis-three/utils";
import { shallowReactive as fe, EffectScope as le, proxyRefs as pe, ReactiveEffect as Z, getCurrentScope as ae, isRef as B, isShallow as G, isReactive as j } from "@vue/reactivity";
import { computed as et, reactive as tt, ref as nt, shallowReactive as st, shallowReadonly as ot, shallowRef as rt, toRef as it, toRefs as ct } from "@vue/reactivity";
import { EventDispatcher as he, ENGINE_EVENT as P } from "@vis-three/core";
import { isFunction as D, isPromise as de, isArray as z, EMPTY_OBJ as me, NOOP as ge, hasChanged as K, remove as ye, isObject as Ee, isSet as ve, isMap as we, isPlainObject as Ce } from "@vue/shared";
const Re = "0.7.1", Q = function(t, e = null, n = {}) {
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
  for (const s in e)
    N(s) && (n[s] = e[s]);
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
const $e = function(t, e = null) {
  return f(t, e);
}, qe = function(t) {
  f.scope = "vif", f.vnodes.push({
    scope: f.scope,
    vnodes: [],
    keyMap: /* @__PURE__ */ new Map()
  }), t(), f.scope = "static";
}, Je = function(t) {
  f.scope = "vfor", f.vnodes.push({
    scope: f.scope,
    vnodes: [],
    keyMap: /* @__PURE__ */ new Map()
  }), t(), f.scope = "static";
};
var F = /* @__PURE__ */ ((t) => (t.MOUNTED = "mounted", t.BEFORE_DISTORY = "beforeDistory", t.UPDATE = "update", t.FRAME = "frame", t.CAMERA_CHANGE = "cameraChange", t.SCENE_CHANGE = "sceneCHange", t))(F || {});
const Ue = function(t = () => {
}) {
  h.currentComponent && h.currentComponent.on("mounted", (e) => t());
}, Ge = function(t = () => {
}) {
  h.currentComponent && h.currentComponent.on(
    "beforeDistory",
    (e) => t()
  );
}, Ke = function(t = () => {
}) {
  h.currentComponent && h.currentComponent.on(
    "frame",
    (e) => t(e.delta, e.total)
  );
};
let I = !1, L = !1;
const m = [];
let E = 0;
const O = [];
let y = null, R = 0;
const ke = /* @__PURE__ */ Promise.resolve();
function Oe(t) {
  let e = E + 1, n = m.length;
  for (; e < n; ) {
    const s = e + n >>> 1, r = m[s], i = M(r);
    i < t || i === t && r.pre ? e = s + 1 : n = s;
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
  !I && !L && (L = !0, ke.then(ee));
}
function _(t) {
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
  L = !1, I = !0, m.sort(be);
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
const S = Symbol.for("vis.widget.event"), Pe = function(t) {
  const e = function(n) {
    e.value(n);
  };
  return e.value = t, e;
}, Y = /Once$/;
function q(t) {
  let e = {};
  if (Y.test(t)) {
    e = {};
    let s;
    for (; s = t.match(Y); )
      t = t.slice(0, t.length - s[0].length), e[s[0].toLowerCase()] = !0;
  }
  return [t.slice(2).toLowerCase(), e];
}
const Te = function(t, e, n) {
  if (e[S]) {
    console.error("config has already create events", e);
    return;
  }
  const s = Se(t);
  for (const r in s) {
    s[r] = Pe(s[r]);
    const [i, c] = q(r);
    n.addEventListener(i, s[r]);
  }
  e[S] = s;
}, Fe = function(t) {
  const e = t.props, n = t.config;
  if (!n[S])
    return;
  const s = n[S];
  for (const r in s) {
    const i = s[r];
    i && i.value !== e[r] && (i.value = e[r]);
  }
}, Ae = function(t, e) {
  const n = t.config;
  if (!n[S])
    return;
  const s = n[S];
  for (const r in s) {
    const i = s[r];
    if (i) {
      const [c, u] = q(r);
      e.removeEventListener(c, i);
    }
  }
  n[S] = void 0;
};
class h extends he {
  constructor(e, n) {
    super(), this.cid = H(), this.name = "", this.el = "", this.isLoaded = !1, this.isMounted = !1, this.props = fe(Object.create(Object.prototype)), this.scope = new le(!0), this.subTree = null, this.cacheResources = Object.create(Object.prototype), this.resourcesKeyEnum = Object.create(
      Object.prototype
    ), this.cacheEvent = {}, this.vnode = e;
    const s = e.type;
    s.name && (this.name = s.name), this.el = s.el, this.options = s, this.renderer = n, this.engine = n.engine, this.ctx = n.context, this.createProps(), this.createSetup(), this.createResources(), this.createRender(), this.createEffect();
  }
  static setCurrentComponent(e) {
    h.currentComponent = e, e.scope.on();
  }
  static unsetCurrentComponent() {
    h.currentComponent && h.currentComponent.scope.off(), h.currentComponent = null;
  }
  createProps() {
    const e = this.options.props || {}, n = this.vnode.props || {}, s = this.props, r = this.options.emits || {}, i = {};
    for (const c in n)
      if (N(c)) {
        const [u, o] = q(c);
        r[u] ? this[o.once ? "once" : "on"](u, n[c]) : console.warn(
          `widget Component: you not declare attribute  ${c}  in emits options`,
          this.options
        );
      } else
        i[c] = n[c];
    for (const c in e) {
      const u = e[c];
      if (u.required && typeof i[c] > "u") {
        console.error("widget component: component prop is required.", {
          component: this,
          props: i,
          key: c
        });
        return;
      }
      let o;
      if (typeof i[c] < "u" ? o = i[c] : u.default && (o = typeof u.default == "function" ? u.default() : u.default), o.constructor !== u.type) {
        console.error(
          "widget component: component prop is not instance of type.",
          {
            component: this,
            props: i,
            key: c,
            value: o,
            type: u.type
          }
        );
        return;
      }
      s[c] = o;
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
  createResources() {
    if (!this.options.resources) {
      this.isLoaded = !0;
      return;
    }
    const e = this.options.resources.call(this.setupState, {
      setup: this.setupState
    });
    if (e instanceof Promise)
      e.then((n) => {
        this.engine.registerResources(n), this.cacheResources = n;
        for (const s in n)
          this.resourcesKeyEnum[s] = s;
        this.isLoaded = !0, this.effect.run();
      });
    else {
      this.engine.registerResources(e), this.cacheResources = e;
      for (const n in e)
        this.resourcesKeyEnum[n] = n;
      this.isLoaded = !0;
    }
  }
  createRender() {
    this.render = this.options.render;
  }
  createEffect() {
    const e = new Z(
      () => {
        if (this.isLoaded)
          if (this.isMounted) {
            const s = this.renderTree(), r = this.subTree;
            if (r.length !== s.length) {
              console.error("widget component render: tree render error", {
                nextTree: s,
                prevTree: r
              });
              return;
            }
            for (let i = 0; i < s.length; i += 1)
              if (v(r[i]) && v(s[i]))
                this.renderer.patch(r[i], s[i]);
              else {
                const c = s[i], u = r[i];
                if (c.scope !== u.scope) {
                  console.error("widget component render: tree render error", {
                    nextTree: s,
                    prevTree: r
                  });
                  return;
                }
                if (c.scope === W.VIF) {
                  for (const o of u.vnodes)
                    this.renderer.patch(o, null);
                  for (const o of c.vnodes)
                    this.renderer.patch(null, o);
                } else if (c.scope === W.VFOR) {
                  for (const o of c.keyMap.keys())
                    u.keyMap.has(o) ? (this.renderer.patch(
                      u.keyMap.get(o),
                      c.keyMap.get(o)
                    ), u.keyMap.delete(o)) : this.renderer.patch(null, c.keyMap.get(o));
                  for (const o of u.keyMap.values())
                    this.renderer.unmountElement(o);
                } else
                  console.warn(
                    `widget component render: unknow scope type: ${c.scope}`
                  );
              }
            this.subTree = s;
          } else {
            const s = this.rawSetupState, r = (o) => {
              o.ref && typeof s[o.ref] < "u" && (s[o.ref].value = o.component ? o.component : o.config || null);
            }, i = (o) => {
              if (o.raw && typeof s[o.raw] < "u")
                if (o.config) {
                  const p = this.engine.getObjectBySymbol(o.config.vid);
                  p || console.warn("can not found raw object in engine", {
                    component: this,
                    vnode: o
                  }), s[o.raw].value = p || null;
                } else {
                  console.warn("component raw object is not a native config", {
                    component: this,
                    vnode: o
                  });
                  return;
                }
            }, c = this.subTree = this.renderTree();
            for (const o of c)
              if (v(o))
                this.renderer.patch(null, o), r(o), i(o);
              else
                for (const p of o.vnodes)
                  this.renderer.patch(null, p), r(p), i(p);
            this.isMounted = !0, _(() => this.emit(F.MOUNTED));
            const u = (o) => {
              this.emit(F.FRAME, o);
            };
            this.engine.renderManager.addEventListener(
              P.RENDER,
              u
            ), this.cacheEvent[P.RENDER] = u;
          }
      },
      () => X(n),
      void 0,
      this.scope
    ), n = () => e.run();
    n(), this.effect = e, this.update = n;
  }
  renderTree() {
    return f.reset(), f.el = this.el, this.render.call(
      { ...this.setupState, ...this.props },
      {
        setup: this.setupState,
        props: this.props,
        components: this.options.components || {},
        resources: this.resourcesKeyEnum
      }
    ), f.vnodes;
  }
  distory() {
    this.engine.removeEventListener(
      P.RENDER,
      this.cacheEvent[P.RENDER]
    ), this.emit(F.BEFORE_DISTORY), this.scope.stop(), this.effect.active = !1, this.effect.stop();
    const e = this.subTree || [];
    for (let n = 0; n < e.length; n += 1)
      if (v(e[n]))
        this.renderer.patch(e[n], null), e[n].config = null, e[n].raw = null;
      else
        for (const s of e[n].vnodes)
          this.renderer.patch(s, null), s.config = null, s.raw = null;
  }
  updateProps(e) {
    const n = this.props;
    for (const s in e)
      n[s] = e[s];
  }
  getState(e = !0) {
    return e ? this.rawSetupState : this.setupState;
  }
}
const Ye = function(t) {
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
  log(e, n, s) {
    n ? console[e](`Widget renderer: ${n}`, s) : console.info(`Widget renderer: ${e}`);
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
    if (U(e.type)) {
      if (e.config.parent) {
        const s = this.engine.getConfigFromModules(
          x,
          e.config.parent
        );
        if (!s) {
          console.error(
            "widget renderer: can not found parent config with: ",
            e
          );
          return;
        }
        s.children.splice(
          s.children.indexOf(
            e.config.vid
          ),
          1
        );
      } else if (!e.el) {
        const s = this.engine.getObjectBySymbol(
          e.config.vid
        );
        s || console.error(
          "widget renderer: can not found Three object with: ",
          e
        ), s.removeFromParent();
      }
      const n = this.engine.getObjectBySymbol(
        e.config.vid
      );
      Ae(e, n);
    }
    this.engine.removeConfigBySymbol(e.config.vid);
  }
  mountElement(e) {
    const { element: n, onProps: s } = this.createElement(e);
    if (this.engine.applyConfig(n), U(n.type)) {
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
      const r = this.engine.getObjectBySymbol(n.vid);
      Te(e, n, r);
    }
  }
  patchElement(e, n) {
    if (e.type !== n.type)
      this.unmountElement(e), this.mountElement(n);
    else {
      n.config = e.config;
      const s = e.config;
      s || console.error("widget renderer: can not found  config with: ", e);
      let r = {};
      const i = n.props;
      let c = !1;
      for (const o in e.props) {
        if (N(o)) {
          c = !0;
          continue;
        }
        r[o] = e.props[o];
      }
      const u = (o, p, g) => {
        for (const l in o)
          v(o[l]) ? v(p[l]) && p[l].config.vid !== o[l].config.vid ? g[l] = p[l].config.vid : v(p[l]) || (g[l] = p[l]) : ue(o[l]) ? u(o[l], p[l], g[l]) : p[l] !== o[l] && (g[l] = p[l]);
      };
      u(r, i, s), c && Fe(n);
    }
  }
  createElement(e) {
    const n = e.props, s = {}, r = {};
    for (const c in n)
      ["ref", "index"].includes(c) || (N(c) ? r[c] = n[c] : s[c] = te(n[c]));
    const i = ie(e.type, s, {
      strict: !1,
      warn: !1
    });
    return e.config = i, { element: i, onProps: r };
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
    const s = e.component;
    n.component = s, s.vnode = n;
    const r = e.props || {}, i = n.props || {}, c = {};
    let u = !1;
    for (const o in i)
      i[o] !== r[o] && (c[o] = i[o], u = !0);
    u && (s.updateProps(c), s.update());
  }
}
class Ie {
  constructor(e, n) {
    this.wid = H(), this.version = Re, this.components = {}, this.instance = null, this.engine = e, this.root = n, this.renderer = new Ne(this);
  }
  /**
   * 注册布局全局组件
   * @param name 组件名
   * @param component 组件选项
   * @returns
   */
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
  /**
   * 部件挂载
   * @returns this
   */
  mount() {
    const e = Q(this.root);
    return this.renderer.render(e), this.instance = e.component, this;
  }
  /**
   * 获取根组件的状态对象
   * @returns any
   */
  getState() {
    var e;
    return (e = this.instance) == null ? void 0 : e.getState(!0);
  }
  /**
   * 解除部件绑定
   */
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
  /**
   * 创建一个小部件
   * @param component 组件
   * @returns Widget
   */
  createWidget(e) {
    return new Ie(this, e);
  }
}
const He = function(t, e = {}) {
  const n = new xe();
  return t.modules && t.modules.forEach((s) => {
    n.useModule(s);
  }), t.plugins && t.plugins.forEach((s) => {
    n.install(s);
  }), t.strategy && t.strategy.forEach((s) => {
    n.exec(s);
  }), t.wdigets && t.wdigets.forEach((s) => {
    n.createWidget(s);
  }), n;
}, Ze = function(t) {
  return {
    value: t
  };
};
function A(t, e, n) {
  let s;
  try {
    s = n ? t(...n) : t();
  } catch (r) {
    console.error(r);
  }
  return s;
}
function $(t, e, n) {
  if (D(t)) {
    const r = A(t, e, n);
    return r && de(r) && r.catch((i) => {
      console.error(i);
    }), r;
  }
  const s = [];
  for (let r = 0; r < t.length; r++)
    s.push($(t[r], e, n));
  return s;
}
function ze(t, e) {
  return ne(t, null, e);
}
const T = {};
function Qe(t, e, n) {
  return ne(t, e, n);
}
function ne(t, e, { immediate: n, deep: s, flush: r, onTrack: i, onTrigger: c } = me) {
  var J;
  const u = ae() === ((J = h.currentComponent) == null ? void 0 : J.scope) ? h.currentComponent : null;
  let o, p = !1, g = !1;
  if (B(t) ? (o = () => t.value, p = G(t)) : j(t) ? (o = () => t, s = !0) : z(t) ? (g = !0, p = t.some((a) => j(a) || G(a)), o = () => t.map((a) => {
    if (B(a))
      return a.value;
    if (j(a))
      return k(a);
    if (D(a))
      return A(a);
  })) : D(t) ? e ? o = () => A(t) : o = () => {
    if (!(u && !u.isMounted))
      return l && l(), $(t, u);
  } : o = ge, e && s) {
    const a = o;
    o = () => k(a());
  }
  let l, se = (a) => {
    l = d.onStop = () => {
      A(a), l = d.onStop = void 0;
    };
  }, w = g ? new Array(t.length).fill(T) : T;
  const C = () => {
    if (d.active)
      if (e) {
        const a = d.run();
        (s || p || (g ? a.some((oe, re) => K(oe, w[re])) : K(a, w))) && (l && l(), $(e, u, [
          a,
          // pass undefined as the old value when it's changed for the first time
          w === T ? void 0 : g && w[0] === T ? [] : w,
          se
        ]), w = a);
      } else
        d.run();
  };
  C.allowRecurse = !!e;
  let b;
  r === "sync" ? b = C : r === "post" ? b = () => _(C) : (C.pre = !0, u && (C.id = u.cid), b = () => X(C));
  const d = new Z(o, b);
  return e ? n ? C() : w = d.run() : r === "post" ? _(d.run.bind(d)) : d.run(), () => {
    d.stop(), u && u.scope && ye(u.scope.effects, d);
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
  Ye as defineComponent,
  He as defineEngineWidget,
  $e as h,
  Ge as onBeforeDistory,
  Ke as onFrame,
  Ue as onMounted,
  Ze as raw,
  tt as reactive,
  nt as ref,
  st as shallowReactive,
  ot as shallowReadonly,
  rt as shallowRef,
  it as toRef,
  ct as toRefs,
  Je as vfor,
  qe as vif,
  Qe as watch,
  ze as watchEffect
};
