import { createSymbol as Ke, isObjectType as Ie, OBJECT_MODULE as de, generateConfig as vt, EngineSupport as Et } from "@vis-three/tdcm";
import { isObject as yt } from "@vis-three/utils";
import { EventDispatcher as wt, ENGINE_EVENT as Y } from "@vis-three/core";
const Rt = "0.7.5", We = function(e, t = null, n = {}) {
  return {
    _isVNode: !0,
    type: e,
    props: t,
    config: null,
    component: null,
    el: null,
    key: n.key || null,
    ref: n.ref || null,
    raw: n.raw || null
    // children: null,
  };
}, N = function(e) {
  return typeof e == "object" && e !== null ? !!e._isVNode : !1;
}, ie = function(e) {
  return /^on[A-Z]/.test(e);
}, St = function(e) {
  const t = e.props, n = {};
  for (const s in t)
    ie(s) && (n[s] = t[s]);
  return n;
};
/**
* @vue/shared v3.4.38
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
/*! #__NO_SIDE_EFFECTS__ */
// @__NO_SIDE_EFFECTS__
function bt(e, t) {
  const n = new Set(e.split(","));
  return (s) => n.has(s);
}
const Ot = process.env.NODE_ENV !== "production" ? Object.freeze({}) : {};
process.env.NODE_ENV !== "production" && Object.freeze([]);
const ke = () => {
}, Be = Object.assign, Nt = (e, t) => {
  const n = e.indexOf(t);
  n > -1 && e.splice(n, 1);
}, Mt = Object.prototype.hasOwnProperty, ce = (e, t) => Mt.call(e, t), w = Array.isArray, W = (e) => ae(e) === "[object Map]", Tt = (e) => ae(e) === "[object Set]", M = (e) => typeof e == "function", Ct = (e) => typeof e == "string", q = (e) => typeof e == "symbol", $ = (e) => e !== null && typeof e == "object", It = (e) => ($(e) || M(e)) && M(e.then) && M(e.catch), Pt = Object.prototype.toString, ae = (e) => Pt.call(e), He = (e) => ae(e).slice(8, -1), Dt = (e) => ae(e) === "[object Object]", Re = (e) => Ct(e) && e !== "NaN" && e[0] !== "-" && "" + parseInt(e, 10) === e, Lt = (e) => {
  const t = /* @__PURE__ */ Object.create(null);
  return (n) => t[n] || (t[n] = e(n));
}, jt = Lt((e) => e.charAt(0).toUpperCase() + e.slice(1)), I = (e, t) => !Object.is(e, t);
/**
* @vue/reactivity v3.4.38
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
function S(e, ...t) {
  console.warn(`[Vue warn] ${e}`, ...t);
}
let E;
class xt {
  constructor(t = !1) {
    this.detached = t, this._active = !0, this.effects = [], this.cleanups = [], this.parent = E, !t && E && (this.index = (E.scopes || (E.scopes = [])).push(
      this
    ) - 1);
  }
  get active() {
    return this._active;
  }
  run(t) {
    if (this._active) {
      const n = E;
      try {
        return E = this, t();
      } finally {
        E = n;
      }
    } else process.env.NODE_ENV !== "production" && S("cannot run an inactive effect scope.");
  }
  /**
   * This should only be called on non-detached scopes
   * @internal
   */
  on() {
    E = this;
  }
  /**
   * This should only be called on non-detached scopes
   * @internal
   */
  off() {
    E = this.parent;
  }
  stop(t) {
    if (this._active) {
      let n, s;
      for (n = 0, s = this.effects.length; n < s; n++)
        this.effects[n].stop();
      for (n = 0, s = this.cleanups.length; n < s; n++)
        this.cleanups[n]();
      if (this.scopes)
        for (n = 0, s = this.scopes.length; n < s; n++)
          this.scopes[n].stop(!0);
      if (!this.detached && this.parent && !t) {
        const r = this.parent.scopes.pop();
        r && r !== this && (this.parent.scopes[this.index] = r, r.index = this.index);
      }
      this.parent = void 0, this._active = !1;
    }
  }
}
function At(e, t = E) {
  t && t.active && t.effects.push(e);
}
function Ft() {
  return E;
}
let j;
class Se {
  constructor(t, n, s, r) {
    this.fn = t, this.trigger = n, this.scheduler = s, this.active = !0, this.deps = [], this._dirtyLevel = 4, this._trackId = 0, this._runnings = 0, this._shouldSchedule = !1, this._depsLength = 0, At(this, r);
  }
  get dirty() {
    if (this._dirtyLevel === 2 || this._dirtyLevel === 3) {
      this._dirtyLevel = 1, Ve();
      for (let t = 0; t < this._depsLength; t++) {
        const n = this.deps[t];
        if (n.computed && ($t(n.computed), this._dirtyLevel >= 4))
          break;
      }
      this._dirtyLevel === 1 && (this._dirtyLevel = 0), qe();
    }
    return this._dirtyLevel >= 4;
  }
  set dirty(t) {
    this._dirtyLevel = t ? 4 : 0;
  }
  run() {
    if (this._dirtyLevel = 0, !this.active)
      return this.fn();
    let t = T, n = j;
    try {
      return T = !0, j = this, this._runnings++, Pe(this), this.fn();
    } finally {
      De(this), this._runnings--, j = n, T = t;
    }
  }
  stop() {
    this.active && (Pe(this), De(this), this.onStop && this.onStop(), this.active = !1);
  }
}
function $t(e) {
  return e.value;
}
function Pe(e) {
  e._trackId++, e._depsLength = 0;
}
function De(e) {
  if (e.deps.length > e._depsLength) {
    for (let t = e._depsLength; t < e.deps.length; t++)
      ze(e.deps[t], e);
    e.deps.length = e._depsLength;
  }
}
function ze(e, t) {
  const n = e.get(t);
  n !== void 0 && t._trackId !== n && (e.delete(t), e.size === 0 && e.cleanup());
}
let T = !0, ge = 0;
const Ue = [];
function Ve() {
  Ue.push(T), T = !1;
}
function qe() {
  const e = Ue.pop();
  T = e === void 0 ? !0 : e;
}
function be() {
  ge++;
}
function Oe() {
  for (ge--; !ge && _e.length; )
    _e.shift()();
}
function Ge(e, t, n) {
  var s;
  if (t.get(e) !== e._trackId) {
    t.set(e, e._trackId);
    const r = e.deps[e._depsLength];
    r !== t ? (r && ze(r, e), e.deps[e._depsLength++] = t) : e._depsLength++, process.env.NODE_ENV !== "production" && ((s = e.onTrack) == null || s.call(e, Be({ effect: e }, n)));
  }
}
const _e = [];
function Ye(e, t, n) {
  var s;
  be();
  for (const r of e.keys()) {
    let o;
    r._dirtyLevel < t && (o ?? (o = e.get(r) === r._trackId)) && (r._shouldSchedule || (r._shouldSchedule = r._dirtyLevel === 0), r._dirtyLevel = t), r._shouldSchedule && (o ?? (o = e.get(r) === r._trackId)) && (process.env.NODE_ENV !== "production" && ((s = r.onTrigger) == null || s.call(r, Be({ effect: r }, n))), r.trigger(), (!r._runnings || r.allowRecurse) && r._dirtyLevel !== 2 && (r._shouldSchedule = !1, r.scheduler && _e.push(r.scheduler)));
  }
  Oe();
}
const Je = (e, t) => {
  const n = /* @__PURE__ */ new Map();
  return n.cleanup = e, n.computed = t, n;
}, le = /* @__PURE__ */ new WeakMap(), x = Symbol(process.env.NODE_ENV !== "production" ? "iterate" : ""), me = Symbol(process.env.NODE_ENV !== "production" ? "Map key iterate" : "");
function _(e, t, n) {
  if (T && j) {
    let s = le.get(e);
    s || le.set(e, s = /* @__PURE__ */ new Map());
    let r = s.get(n);
    r || s.set(n, r = Je(() => s.delete(n))), Ge(
      j,
      r,
      process.env.NODE_ENV !== "production" ? {
        target: e,
        type: t,
        key: n
      } : void 0
    );
  }
}
function C(e, t, n, s, r, o) {
  const i = le.get(e);
  if (!i)
    return;
  let l = [];
  if (t === "clear")
    l = [...i.values()];
  else if (n === "length" && w(e)) {
    const c = Number(s);
    i.forEach((f, p) => {
      (p === "length" || !q(p) && p >= c) && l.push(f);
    });
  } else
    switch (n !== void 0 && l.push(i.get(n)), t) {
      case "add":
        w(e) ? Re(n) && l.push(i.get("length")) : (l.push(i.get(x)), W(e) && l.push(i.get(me)));
        break;
      case "delete":
        w(e) || (l.push(i.get(x)), W(e) && l.push(i.get(me)));
        break;
      case "set":
        W(e) && l.push(i.get(x));
        break;
    }
  be();
  for (const c of l)
    c && Ye(
      c,
      4,
      process.env.NODE_ENV !== "production" ? {
        target: e,
        type: t,
        key: n,
        newValue: s,
        oldValue: r,
        oldTarget: o
      } : void 0
    );
  Oe();
}
function Kt(e, t) {
  const n = le.get(e);
  return n && n.get(t);
}
const Wt = /* @__PURE__ */ bt("__proto__,__v_isRef,__isVue"), Ze = new Set(
  /* @__PURE__ */ Object.getOwnPropertyNames(Symbol).filter((e) => e !== "arguments" && e !== "caller").map((e) => Symbol[e]).filter(q)
), Le = /* @__PURE__ */ kt();
function kt() {
  const e = {};
  return ["includes", "indexOf", "lastIndexOf"].forEach((t) => {
    e[t] = function(...n) {
      const s = u(this);
      for (let o = 0, i = this.length; o < i; o++)
        _(s, "get", o + "");
      const r = s[t](...n);
      return r === -1 || r === !1 ? s[t](...n.map(u)) : r;
    };
  }), ["push", "pop", "shift", "unshift", "splice"].forEach((t) => {
    e[t] = function(...n) {
      Ve(), be();
      const s = u(this)[t].apply(this, n);
      return Oe(), qe(), s;
    };
  }), e;
}
function Bt(e) {
  q(e) || (e = String(e));
  const t = u(this);
  return _(t, "has", e), t.hasOwnProperty(e);
}
class Qe {
  constructor(t = !1, n = !1) {
    this._isReadonly = t, this._isShallow = n;
  }
  get(t, n, s) {
    const r = this._isReadonly, o = this._isShallow;
    if (n === "__v_isReactive")
      return !r;
    if (n === "__v_isReadonly")
      return r;
    if (n === "__v_isShallow")
      return o;
    if (n === "__v_raw")
      return s === (r ? o ? ot : rt : o ? st : nt).get(t) || // receiver is not the reactive proxy, but has the same prototype
      // this means the receiver is a user proxy of the reactive proxy
      Object.getPrototypeOf(t) === Object.getPrototypeOf(s) ? t : void 0;
    const i = w(t);
    if (!r) {
      if (i && ce(Le, n))
        return Reflect.get(Le, n, s);
      if (n === "hasOwnProperty")
        return Bt;
    }
    const l = Reflect.get(t, n, s);
    return (q(n) ? Ze.has(n) : Wt(n)) || (r || _(t, "get", n), o) ? l : m(l) ? i && Re(n) ? l : l.value : $(l) ? r ? ct(l) : it(l) : l;
  }
}
class Xe extends Qe {
  constructor(t = !1) {
    super(!1, t);
  }
  set(t, n, s, r) {
    let o = t[n];
    if (!this._isShallow) {
      const c = F(o);
      if (!B(s) && !F(s) && (o = u(o), s = u(s)), !w(t) && m(o) && !m(s))
        return c ? !1 : (o.value = s, !0);
    }
    const i = w(t) && Re(n) ? Number(n) < t.length : ce(t, n), l = Reflect.set(t, n, s, r);
    return t === u(r) && (i ? I(s, o) && C(t, "set", n, s, o) : C(t, "add", n, s)), l;
  }
  deleteProperty(t, n) {
    const s = ce(t, n), r = t[n], o = Reflect.deleteProperty(t, n);
    return o && s && C(t, "delete", n, void 0, r), o;
  }
  has(t, n) {
    const s = Reflect.has(t, n);
    return (!q(n) || !Ze.has(n)) && _(t, "has", n), s;
  }
  ownKeys(t) {
    return _(
      t,
      "iterate",
      w(t) ? "length" : x
    ), Reflect.ownKeys(t);
  }
}
class et extends Qe {
  constructor(t = !1) {
    super(!0, t);
  }
  set(t, n) {
    return process.env.NODE_ENV !== "production" && S(
      `Set operation on key "${String(n)}" failed: target is readonly.`,
      t
    ), !0;
  }
  deleteProperty(t, n) {
    return process.env.NODE_ENV !== "production" && S(
      `Delete operation on key "${String(n)}" failed: target is readonly.`,
      t
    ), !0;
  }
}
const Ht = /* @__PURE__ */ new Xe(), zt = /* @__PURE__ */ new et(), Ut = /* @__PURE__ */ new Xe(
  !0
), Vt = /* @__PURE__ */ new et(!0), Ne = (e) => e, fe = (e) => Reflect.getPrototypeOf(e);
function J(e, t, n = !1, s = !1) {
  e = e.__v_raw;
  const r = u(e), o = u(t);
  n || (I(t, o) && _(r, "get", t), _(r, "get", o));
  const { has: i } = fe(r), l = s ? Ne : n ? Me : U;
  if (i.call(r, t))
    return l(e.get(t));
  if (i.call(r, o))
    return l(e.get(o));
  e !== r && e.get(t);
}
function Z(e, t = !1) {
  const n = this.__v_raw, s = u(n), r = u(e);
  return t || (I(e, r) && _(s, "has", e), _(s, "has", r)), e === r ? n.has(e) : n.has(e) || n.has(r);
}
function Q(e, t = !1) {
  return e = e.__v_raw, !t && _(u(e), "iterate", x), Reflect.get(e, "size", e);
}
function je(e, t = !1) {
  !t && !B(e) && !F(e) && (e = u(e));
  const n = u(this);
  return fe(n).has.call(n, e) || (n.add(e), C(n, "add", e, e)), this;
}
function xe(e, t, n = !1) {
  !n && !B(t) && !F(t) && (t = u(t));
  const s = u(this), { has: r, get: o } = fe(s);
  let i = r.call(s, e);
  i ? process.env.NODE_ENV !== "production" && tt(s, r, e) : (e = u(e), i = r.call(s, e));
  const l = o.call(s, e);
  return s.set(e, t), i ? I(t, l) && C(s, "set", e, t, l) : C(s, "add", e, t), this;
}
function Ae(e) {
  const t = u(this), { has: n, get: s } = fe(t);
  let r = n.call(t, e);
  r ? process.env.NODE_ENV !== "production" && tt(t, n, e) : (e = u(e), r = n.call(t, e));
  const o = s ? s.call(t, e) : void 0, i = t.delete(e);
  return r && C(t, "delete", e, void 0, o), i;
}
function Fe() {
  const e = u(this), t = e.size !== 0, n = process.env.NODE_ENV !== "production" ? W(e) ? new Map(e) : new Set(e) : void 0, s = e.clear();
  return t && C(e, "clear", void 0, void 0, n), s;
}
function X(e, t) {
  return function(s, r) {
    const o = this, i = o.__v_raw, l = u(i), c = t ? Ne : e ? Me : U;
    return !e && _(l, "iterate", x), i.forEach((f, p) => s.call(r, c(f), c(p), o));
  };
}
function ee(e, t, n) {
  return function(...s) {
    const r = this.__v_raw, o = u(r), i = W(o), l = e === "entries" || e === Symbol.iterator && i, c = e === "keys" && i, f = r[e](...s), p = n ? Ne : t ? Me : U;
    return !t && _(
      o,
      "iterate",
      c ? me : x
    ), {
      // iterator protocol
      next() {
        const { value: a, done: H } = f.next();
        return H ? { value: a, done: H } : {
          value: l ? [p(a[0]), p(a[1])] : p(a),
          done: H
        };
      },
      // iterable protocol
      [Symbol.iterator]() {
        return this;
      }
    };
  };
}
function b(e) {
  return function(...t) {
    if (process.env.NODE_ENV !== "production") {
      const n = t[0] ? `on key "${t[0]}" ` : "";
      S(
        `${jt(e)} operation ${n}failed: target is readonly.`,
        u(this)
      );
    }
    return e === "delete" ? !1 : e === "clear" ? void 0 : this;
  };
}
function qt() {
  const e = {
    get(o) {
      return J(this, o);
    },
    get size() {
      return Q(this);
    },
    has: Z,
    add: je,
    set: xe,
    delete: Ae,
    clear: Fe,
    forEach: X(!1, !1)
  }, t = {
    get(o) {
      return J(this, o, !1, !0);
    },
    get size() {
      return Q(this);
    },
    has: Z,
    add(o) {
      return je.call(this, o, !0);
    },
    set(o, i) {
      return xe.call(this, o, i, !0);
    },
    delete: Ae,
    clear: Fe,
    forEach: X(!1, !0)
  }, n = {
    get(o) {
      return J(this, o, !0);
    },
    get size() {
      return Q(this, !0);
    },
    has(o) {
      return Z.call(this, o, !0);
    },
    add: b("add"),
    set: b("set"),
    delete: b("delete"),
    clear: b("clear"),
    forEach: X(!0, !1)
  }, s = {
    get(o) {
      return J(this, o, !0, !0);
    },
    get size() {
      return Q(this, !0);
    },
    has(o) {
      return Z.call(this, o, !0);
    },
    add: b("add"),
    set: b("set"),
    delete: b("delete"),
    clear: b("clear"),
    forEach: X(!0, !0)
  };
  return [
    "keys",
    "values",
    "entries",
    Symbol.iterator
  ].forEach((o) => {
    e[o] = ee(o, !1, !1), n[o] = ee(o, !0, !1), t[o] = ee(o, !1, !0), s[o] = ee(
      o,
      !0,
      !0
    );
  }), [
    e,
    n,
    t,
    s
  ];
}
const [
  Gt,
  Yt,
  Jt,
  Zt
] = /* @__PURE__ */ qt();
function he(e, t) {
  const n = t ? e ? Zt : Jt : e ? Yt : Gt;
  return (s, r, o) => r === "__v_isReactive" ? !e : r === "__v_isReadonly" ? e : r === "__v_raw" ? s : Reflect.get(
    ce(n, r) && r in s ? n : s,
    r,
    o
  );
}
const Qt = {
  get: /* @__PURE__ */ he(!1, !1)
}, Xt = {
  get: /* @__PURE__ */ he(!1, !0)
}, en = {
  get: /* @__PURE__ */ he(!0, !1)
}, tn = {
  get: /* @__PURE__ */ he(!0, !0)
};
function tt(e, t, n) {
  const s = u(n);
  if (s !== n && t.call(e, s)) {
    const r = He(e);
    S(
      `Reactive ${r} contains both the raw and reactive versions of the same object${r === "Map" ? " as keys" : ""}, which can lead to inconsistencies. Avoid differentiating between the raw and reactive versions of an object and only use the reactive version if possible.`
    );
  }
}
const nt = /* @__PURE__ */ new WeakMap(), st = /* @__PURE__ */ new WeakMap(), rt = /* @__PURE__ */ new WeakMap(), ot = /* @__PURE__ */ new WeakMap();
function nn(e) {
  switch (e) {
    case "Object":
    case "Array":
      return 1;
    case "Map":
    case "Set":
    case "WeakMap":
    case "WeakSet":
      return 2;
    default:
      return 0;
  }
}
function sn(e) {
  return e.__v_skip || !Object.isExtensible(e) ? 0 : nn(He(e));
}
function it(e) {
  return F(e) ? e : pe(
    e,
    !1,
    Ht,
    Qt,
    nt
  );
}
function rn(e) {
  return pe(
    e,
    !1,
    Ut,
    Xt,
    st
  );
}
function ct(e) {
  return pe(
    e,
    !0,
    zt,
    en,
    rt
  );
}
function In(e) {
  return pe(
    e,
    !0,
    Vt,
    tn,
    ot
  );
}
function pe(e, t, n, s, r) {
  if (!$(e))
    return process.env.NODE_ENV !== "production" && S(
      `value cannot be made ${t ? "readonly" : "reactive"}: ${String(
        e
      )}`
    ), e;
  if (e.__v_raw && !(t && e.__v_isReactive))
    return e;
  const o = r.get(e);
  if (o)
    return o;
  const i = sn(e);
  if (i === 0)
    return e;
  const l = new Proxy(
    e,
    i === 2 ? s : n
  );
  return r.set(e, l), l;
}
function z(e) {
  return F(e) ? z(e.__v_raw) : !!(e && e.__v_isReactive);
}
function F(e) {
  return !!(e && e.__v_isReadonly);
}
function B(e) {
  return !!(e && e.__v_isShallow);
}
function on(e) {
  return e ? !!e.__v_raw : !1;
}
function u(e) {
  const t = e && e.__v_raw;
  return t ? u(t) : e;
}
const U = (e) => $(e) ? it(e) : e, Me = (e) => $(e) ? ct(e) : e, cn = "Computed is still dirty after getter evaluation, likely because a computed is mutating its own dependency in its getter. State mutations in computed getters should be avoided.  Check the docs for more details: https://vuejs.org/guide/essentials/computed.html#getters-should-be-side-effect-free";
class lt {
  constructor(t, n, s, r) {
    this.getter = t, this._setter = n, this.dep = void 0, this.__v_isRef = !0, this.__v_isReadonly = !1, this.effect = new Se(
      () => t(this._value),
      () => ne(
        this,
        this.effect._dirtyLevel === 2 ? 2 : 3
      )
    ), this.effect.computed = this, this.effect.active = this._cacheable = !r, this.__v_isReadonly = s;
  }
  get value() {
    const t = u(this);
    return (!t._cacheable || t.effect.dirty) && I(t._value, t._value = t.effect.run()) && ne(t, 4), ut(t), t.effect._dirtyLevel >= 2 && (process.env.NODE_ENV !== "production" && this._warnRecursive && S(cn, `

getter: `, this.getter), ne(t, 2)), t._value;
  }
  set value(t) {
    this._setter(t);
  }
  // #region polyfill _dirty for backward compatibility third party code for Vue <= 3.3.x
  get _dirty() {
    return this.effect.dirty;
  }
  set _dirty(t) {
    this.effect.dirty = t;
  }
  // #endregion
}
function Pn(e, t, n = !1) {
  let s, r;
  const o = M(e);
  o ? (s = e, r = process.env.NODE_ENV !== "production" ? () => {
    S("Write operation failed: computed value is readonly");
  } : ke) : (s = e.get, r = e.set);
  const i = new lt(s, r, o || !r, n);
  return process.env.NODE_ENV !== "production" && t && !n && (i.effect.onTrack = t.onTrack, i.effect.onTrigger = t.onTrigger), i;
}
function ut(e) {
  var t;
  T && j && (e = u(e), Ge(
    j,
    (t = e.dep) != null ? t : e.dep = Je(
      () => e.dep = void 0,
      e instanceof lt ? e : void 0
    ),
    process.env.NODE_ENV !== "production" ? {
      target: e,
      type: "get",
      key: "value"
    } : void 0
  ));
}
function ne(e, t = 4, n, s) {
  e = u(e);
  const r = e.dep;
  r && Ye(
    r,
    t,
    process.env.NODE_ENV !== "production" ? {
      target: e,
      type: "set",
      key: "value",
      newValue: n,
      oldValue: s
    } : void 0
  );
}
function m(e) {
  return !!(e && e.__v_isRef === !0);
}
function ln(e) {
  return at(e, !1);
}
function Dn(e) {
  return at(e, !0);
}
function at(e, t) {
  return m(e) ? e : new un(e, t);
}
class un {
  constructor(t, n) {
    this.__v_isShallow = n, this.dep = void 0, this.__v_isRef = !0, this._rawValue = n ? t : u(t), this._value = n ? t : U(t);
  }
  get value() {
    return ut(this), this._value;
  }
  set value(t) {
    const n = this.__v_isShallow || B(t) || F(t);
    if (t = n ? t : u(t), I(t, this._rawValue)) {
      const s = this._rawValue;
      this._rawValue = t, this._value = n ? t : U(t), ne(this, 4, t, s);
    }
  }
}
function an(e) {
  return m(e) ? e.value : e;
}
const fn = {
  get: (e, t, n) => an(Reflect.get(e, t, n)),
  set: (e, t, n, s) => {
    const r = e[t];
    return m(r) && !m(n) ? (r.value = n, !0) : Reflect.set(e, t, n, s);
  }
};
function hn(e) {
  return z(e) ? e : new Proxy(e, fn);
}
function Ln(e) {
  process.env.NODE_ENV !== "production" && !on(e) && S("toRefs() expects a reactive object but received a plain one.");
  const t = w(e) ? new Array(e.length) : {};
  for (const n in e)
    t[n] = ft(e, n);
  return t;
}
class pn {
  constructor(t, n, s) {
    this._object = t, this._key = n, this._defaultValue = s, this.__v_isRef = !0;
  }
  get value() {
    const t = this._object[this._key];
    return t === void 0 ? this._defaultValue : t;
  }
  set value(t) {
    this._object[this._key] = t;
  }
  get dep() {
    return Kt(u(this._object), this._key);
  }
}
class dn {
  constructor(t) {
    this._getter = t, this.__v_isRef = !0, this.__v_isReadonly = !0;
  }
  get value() {
    return this._getter();
  }
}
function jn(e, t, n) {
  return m(e) ? e : M(e) ? new dn(e) : $(e) && arguments.length > 1 ? ft(e, t, n) : ln(e);
}
function ft(e, t, n) {
  const s = e[t];
  return m(s) ? s : new pn(e, t, n);
}
var ve = /* @__PURE__ */ ((e) => (e.STATIC = "static", e.VIF = "vif", e.VFOR = "vfor", e))(ve || {});
const h = function(e, t = null) {
  const n = We(e, t, {
    key: t && t.$key || null,
    ref: t && t.$ref || null,
    raw: t && t.$raw || null
  });
  return h.add(n), n;
};
h.reset = function() {
  h.el = null, h.scope = "static", h.vnodes = [];
};
h.add = function(e) {
  if (e.el = h.el, h.scope !== "static") {
    const t = h.vnodes[h.vnodes.length - 1];
    h.scope === "vfor" && (e.key || (e.key = t.vnodes.length), t.keyMap.set(e.key, e)), t.vnodes.push(e);
  } else
    h.vnodes.push(e);
  return h.vnodes;
};
const xn = function(e, t = null) {
  return h(e, t);
}, An = function(e) {
  h.scope = "vif", h.vnodes.push({
    scope: h.scope,
    vnodes: [],
    keyMap: /* @__PURE__ */ new Map()
  }), e(), h.scope = "static";
}, Fn = function(e) {
  h.scope = "vfor", h.vnodes.push({
    scope: h.scope,
    vnodes: [],
    keyMap: /* @__PURE__ */ new Map()
  }), e(), h.scope = "static";
};
var se = /* @__PURE__ */ ((e) => (e.MOUNTED = "mounted", e.BEFORE_DISTORY = "beforeDistory", e.UPDATE = "update", e.FRAME = "frame", e.CAMERA_CHANGE = "cameraChange", e.SCENE_CHANGE = "sceneCHange", e))(se || {});
const $n = function(e = () => {
}) {
  g.currentComponent && g.currentComponent.on("mounted", (t) => e());
}, Kn = function(e = () => {
}) {
  g.currentComponent && g.currentComponent.on(
    "beforeDistory",
    (t) => e()
  );
}, Wn = function(e = () => {
}) {
  g.currentComponent && g.currentComponent.on(
    "frame",
    (t) => e(t.delta, t.total)
  );
};
let ue = !1, Ee = !1;
const y = [];
let O = 0;
const k = [];
let R = null, L = 0;
const gn = /* @__PURE__ */ Promise.resolve();
function _n(e) {
  let t = O + 1, n = y.length;
  for (; t < n; ) {
    const s = t + n >>> 1, r = y[s], o = V(r);
    o < e || o === e && r.pre ? t = s + 1 : n = s;
  }
  return t;
}
function ht(e) {
  (!y.length || !y.includes(
    e,
    ue && e.allowRecurse ? O + 1 : O
  )) && (e.id == null ? y.push(e) : y.splice(_n(e.id), 0, e), pt());
}
function pt() {
  !ue && !Ee && (Ee = !0, gn.then(dt));
}
function ye(e) {
  Array.isArray(e) ? k.push(...e) : (!R || !R.includes(
    e,
    e.allowRecurse ? L + 1 : L
  )) && k.push(e), pt();
}
function mn() {
  if (k.length) {
    const e = [...new Set(k)];
    if (k.length = 0, R) {
      R.push(...e);
      return;
    }
    for (R = e, R.sort((t, n) => V(t) - V(n)), L = 0; L < R.length; L++)
      R[L]();
    R = null, L = 0;
  }
}
const V = (e) => e.id == null ? 1 / 0 : e.id, vn = (e, t) => {
  const n = V(e) - V(t);
  if (n === 0) {
    if (e.pre && !t.pre) return -1;
    if (t.pre && !e.pre) return 1;
  }
  return n;
};
function dt() {
  Ee = !1, ue = !0, y.sort(vn);
  try {
    for (O = 0; O < y.length; O++) {
      const e = y[O];
      if (e && e.active !== !1)
        try {
          e();
        } catch (t) {
          console.error(t);
        }
    }
  } finally {
    O = 0, y.length = 0, mn(), ue = !1, (y.length || k.length) && dt();
  }
}
const A = Symbol.for("vis.widget.event"), En = function(e) {
  const t = function(n) {
    t.value(n);
  };
  return t.value = e, t;
}, $e = /Once$/;
function Te(e) {
  let t = {};
  if ($e.test(e)) {
    t = {};
    let s;
    for (; s = e.match($e); )
      e = e.slice(0, e.length - s[0].length), t[s[0].toLowerCase()] = !0;
  }
  return [e.slice(2).toLowerCase(), t];
}
const yn = function(e, t, n) {
  if (t[A]) {
    console.error("config has already create events", t);
    return;
  }
  const s = St(e);
  for (const r in s) {
    s[r] = En(s[r]);
    const [o, i] = Te(r);
    n.addEventListener(o, s[r]);
  }
  t[A] = s;
}, wn = function(e) {
  const t = e.props, n = e.config;
  if (!n[A])
    return;
  const s = n[A];
  for (const r in s) {
    const o = s[r];
    o && o.value !== t[r] && (o.value = t[r]);
  }
}, Rn = function(e, t) {
  const n = e.config;
  if (!n[A])
    return;
  const s = n[A];
  for (const r in s) {
    const o = s[r];
    if (o) {
      const [i, l] = Te(r);
      t.removeEventListener(i, o);
    }
  }
  n[A] = void 0;
};
class g extends wt {
  constructor(t, n) {
    super(), this.cid = Ke(), this.name = "", this.el = "", this.isLoaded = !1, this.isMounted = !1, this.props = rn(Object.create(Object.prototype)), this.scope = new xt(!0), this.subTree = null, this.cacheResources = Object.create(Object.prototype), this.resourcesKeyEnum = Object.create(
      Object.prototype
    ), this.cacheEvent = {}, this.vnode = t;
    const s = t.type;
    s.name && (this.name = s.name), this.el = s.el || "", this.options = s, this.renderer = n, this.engine = n.engine, this.ctx = n.context, this.createProps(), this.createSetup(), this.createResources(), this.createRender(), this.createEffect();
  }
  static setCurrentComponent(t) {
    g.currentComponent = t, t.scope.on();
  }
  static unsetCurrentComponent() {
    g.currentComponent && g.currentComponent.scope.off(), g.currentComponent = null;
  }
  createProps() {
    const t = this.options.props || {}, n = this.vnode.props || {}, s = this.props, r = this.options.emits || {}, o = {};
    for (const i in n)
      if (ie(i)) {
        const [l, c] = Te(i);
        r[l] ? this[c.once ? "once" : "on"](l, n[i]) : console.warn(
          `widget Component: you not declare attribute  ${i}  in emits options`,
          this.options
        );
      } else
        o[i] = n[i];
    for (const i in t) {
      const l = t[i];
      if (l.required && typeof o[i] > "u") {
        console.error("widget component: component prop is required.", {
          component: this,
          props: o,
          key: i
        });
        return;
      }
      let c;
      if (typeof o[i] < "u" ? c = o[i] : l.default && (c = typeof l.default == "function" ? l.default() : l.default), c.constructor !== l.type) {
        console.error(
          "widget component: component prop is not instance of type.",
          {
            component: this,
            props: o,
            key: i,
            value: c,
            type: l.type
          }
        );
        return;
      }
      s[i] = c;
    }
  }
  createSetup() {
    if (!this.options.setup)
      return;
    g.setCurrentComponent(this);
    const t = this.options.setup({
      engine: this.engine,
      props: this.props,
      emit: this.emit.bind(this)
    }) || {};
    this.setupState = hn(t), this.rawSetupState = t, g.unsetCurrentComponent();
  }
  createResources() {
    if (!this.options.resources) {
      this.isLoaded = !0;
      return;
    }
    const t = this.options.resources.call(this.setupState, {
      setup: this.setupState
    });
    if (t instanceof Promise)
      t.then((n) => {
        this.engine.registerResources(n), this.cacheResources = n;
        for (const s in n)
          this.resourcesKeyEnum[s] = s;
        this.isLoaded = !0, this.effect.run();
      });
    else {
      this.engine.registerResources(t), this.cacheResources = t;
      for (const n in t)
        this.resourcesKeyEnum[n] = n;
      this.isLoaded = !0;
    }
  }
  createRender() {
    this.render = this.options.render;
  }
  createEffect() {
    const t = new Se(
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
            for (let o = 0; o < s.length; o += 1)
              if (N(r[o]) && N(s[o]))
                this.renderer.patch(r[o], s[o]);
              else {
                const i = s[o], l = r[o];
                if (i.scope !== l.scope) {
                  console.error("widget component render: tree render error", {
                    nextTree: s,
                    prevTree: r
                  });
                  return;
                }
                if (i.scope === ve.VIF) {
                  for (const c of l.vnodes)
                    this.renderer.patch(c, null);
                  for (const c of i.vnodes)
                    this.renderer.patch(null, c);
                } else if (i.scope === ve.VFOR) {
                  for (const c of i.keyMap.keys())
                    l.keyMap.has(c) ? (this.renderer.patch(
                      l.keyMap.get(c),
                      i.keyMap.get(c)
                    ), l.keyMap.delete(c)) : this.renderer.patch(null, i.keyMap.get(c));
                  for (const c of l.keyMap.values())
                    this.renderer.unmountElement(c);
                } else
                  console.warn(
                    `widget component render: unknow scope type: ${i.scope}`
                  );
              }
            this.subTree = s;
          } else {
            const s = this.rawSetupState, r = (c) => {
              c.ref && typeof s[c.ref] < "u" && (s[c.ref].value = c.component ? c.component : c.config || null);
            }, o = (c) => {
              if (c.raw && typeof s[c.raw] < "u")
                if (c.config) {
                  const f = this.engine.getObjectBySymbol(c.config.vid);
                  f || console.warn("can not found raw object in engine", {
                    component: this,
                    vnode: c
                  }), s[c.raw].value = f || null;
                } else {
                  console.warn("component raw object is not a native config", {
                    component: this,
                    vnode: c
                  });
                  return;
                }
            }, i = this.subTree = this.renderTree();
            for (const c of i)
              if (N(c))
                this.renderer.patch(null, c), r(c), o(c);
              else
                for (const f of c.vnodes)
                  this.renderer.patch(null, f), r(f), o(f);
            this.isMounted = !0, ye(() => this.emit(se.MOUNTED));
            const l = (c) => {
              this.emit(se.FRAME, c);
            };
            this.engine.renderManager.addEventListener(
              Y.RENDER,
              l
            ), this.cacheEvent[Y.RENDER] = l;
          }
      },
      () => ht(n),
      void 0,
      this.scope
    ), n = () => t.run();
    n(), this.effect = t, this.update = n;
  }
  renderTree() {
    return h.reset(), h.el = this.el, this.render.call(
      { ...this.setupState, ...this.props },
      {
        setup: this.setupState,
        props: this.props,
        components: this.options.components || {},
        resources: this.resourcesKeyEnum
      }
    ), h.vnodes;
  }
  distory() {
    this.engine.removeEventListener(
      Y.RENDER,
      this.cacheEvent[Y.RENDER]
    ), this.emit(se.BEFORE_DISTORY), this.scope.stop(), this.effect.active = !1, this.effect.stop();
    const t = this.subTree || [];
    for (let n = 0; n < t.length; n += 1)
      if (N(t[n]))
        this.renderer.patch(t[n], null), t[n].config = null, t[n].raw = null;
      else
        for (const s of t[n].vnodes)
          this.renderer.patch(s, null), s.config = null, s.raw = null;
  }
  updateProps(t) {
    const n = this.props;
    for (const s in t)
      n[s] = t[s];
  }
  getState(t = !0) {
    return t ? this.rawSetupState : this.setupState;
  }
}
const kn = function(e) {
  return e;
}, re = (e) => {
  if (typeof e == "object" && e !== null) {
    if (N(e))
      return e.config.vid;
    for (const t in e)
      e[t] = re(e[t]);
    return e;
  } else
    return e;
};
class Sn {
  constructor(t) {
    this.context = t, this.engine = t.engine;
  }
  log(t, n, s) {
    n ? console[t](`Widget renderer: ${n}`, s) : console.info(`Widget renderer: ${t}`);
  }
  patch(t, n) {
    if (!t && !n) {
      console.error("widget renderer: patch prarams all of null");
      return;
    }
    t !== n && (n && typeof n.type == "string" || t && typeof t.type == "string" ? this.processElement(t, n) : this.processComponent(t, n));
  }
  render(t) {
    this.patch(null, t);
  }
  processElement(t, n) {
    if (!t && !n) {
      console.error("widget renderer: processElement prarams all of null");
      return;
    }
    t === null ? this.mountElement(n) : n === null ? this.unmountElement(t) : this.patchElement(t, n);
  }
  unmountElement(t) {
    if (Ie(t.type)) {
      if (t.config.parent) {
        const s = this.engine.getConfigFromModules(
          de,
          t.config.parent
        );
        if (!s) {
          console.error(
            "widget renderer: can not found parent config with: ",
            t
          );
          return;
        }
        s.children.splice(
          s.children.indexOf(
            t.config.vid
          ),
          1
        );
      } else if (!t.el) {
        const s = this.engine.getObjectBySymbol(
          t.config.vid
        );
        s || console.error(
          "widget renderer: can not found Three object with: ",
          t
        ), s.removeFromParent();
      }
      const n = this.engine.getObjectBySymbol(
        t.config.vid
      );
      Rn(t, n);
    }
    this.engine.removeConfigBySymbol(t.config.vid);
  }
  mountElement(t) {
    const { element: n, onProps: s } = this.createElement(t);
    if (this.engine.applyConfig(n), Ie(n.type)) {
      if (!t.el)
        this.engine.scene.add(
          this.engine.getObjectFromModules(de, n.vid)
        );
      else {
        const o = this.engine.getConfigFromModules(
          de,
          t.el
        );
        if (!o) {
          console.error(
            `widget renderer: can not found parent config with: ${t.el}`
          );
          return;
        }
        o.children.push(n.vid);
      }
      const r = this.engine.getObjectBySymbol(n.vid);
      yn(t, n, r);
    }
  }
  patchElement(t, n) {
    if (t.type !== n.type)
      this.unmountElement(t), this.mountElement(n);
    else {
      n.config = t.config;
      const s = t.config;
      s || console.error("widget renderer: can not found  config with: ", t);
      let r = {};
      const o = re(n.props);
      let i = !1;
      for (const c in t.props) {
        if (ie(c) && !i) {
          i = !0;
          continue;
        }
        r[c] = re(t.props[c]);
      }
      const l = (c, f, p) => {
        for (const a in c)
          N(c[a]) ? N(f[a]) && f[a].config.vid !== c[a].config.vid ? p[a] = f[a].config.vid : N(f[a]) || (p[a] = f[a]) : yt(c[a]) ? l(c[a], f[a], p[a]) : f[a] !== c[a] && (p[a] = f[a]);
      };
      l(r, o, s), i && wn(n);
    }
  }
  createElement(t) {
    const n = t.props, s = {}, r = {};
    for (const i in n)
      ["$ref", "$raw", "$key"].includes(i) || ie(i) || (s[i] = re(n[i]));
    const o = vt(t.type, s, {
      strict: !1,
      warn: !1
    });
    return t.config = o, { element: o, onProps: r };
  }
  processComponent(t, n) {
    if (!t && !n) {
      console.error("widget renderer: processElement prarams all of null");
      return;
    }
    t === null ? this.mountComponent(n) : n === null ? this.unmountComponent(t) : this.patchComponent(t, n);
  }
  mountComponent(t) {
    t.component = new g(t, this);
  }
  unmountComponent(t) {
    var n;
    (n = t.component) == null || n.distory(), t.component = null;
  }
  patchComponent(t, n) {
    const s = t.component;
    n.component = s, s.vnode = n;
    const r = t.props || {}, o = n.props || {}, i = {};
    let l = !1;
    for (const c in o)
      o[c] !== r[c] && (i[c] = o[c], l = !0);
    l && (s.updateProps(i), s.update());
  }
}
class bn {
  constructor(t, n) {
    this.wid = Ke(), this.version = Rt, this.components = {}, this.instance = null, this.engine = t, this.root = n, this.renderer = new Sn(this);
  }
  /**
   * 注册布局全局组件
   * @param name 组件名
   * @param component 组件选项
   * @returns
   */
  component(t, n) {
    if (typeof t == "object") {
      if (n = t, !n.name) {
        console.error(
          "widget register component must be provide a name",
          n
        );
        return;
      }
      t = n.name;
    }
    if (!n) {
      console.error(
        "widget register component must be provide a component not a null",
        t
      );
      return;
    }
    if (this.components[t]) {
      console.warn(`A component with this name already exists: ${t}`);
      return;
    }
    this.components[t] = n;
  }
  /**
   * 部件挂载
   * @returns this
   */
  mount() {
    const t = We(this.root);
    return this.renderer.render(t), this.instance = t.component, this;
  }
  /**
   * 获取根组件的状态对象
   * @returns any
   */
  getState() {
    var t;
    return (t = this.instance) == null ? void 0 : t.getState(!0);
  }
  /**
   * 解除部件绑定
   */
  unmount() {
    var t;
    (t = this.instance) == null || t.distory();
  }
  use() {
  }
}
class On extends Et {
  constructor(t = {}) {
    super(t);
  }
  /**
   * 创建一个小部件
   * @param component 组件
   * @returns Widget
   */
  createWidget(t) {
    return new bn(this, t);
  }
}
const Bn = function(e, t = {}) {
  const n = new On();
  return e.modules && e.modules.forEach((s) => {
    n.useModule(s);
  }), e.plugins && e.plugins.forEach((s) => {
    n.install(s);
  }), e.strategy && e.strategy.forEach((s) => {
    n.exec(s);
  }), e.wdigets && e.wdigets.forEach((s) => {
    n.createWidget(s);
  }), n;
}, Hn = function(e) {
  return {
    value: e
  };
};
function oe(e, t, n) {
  let s;
  try {
    s = n ? e(...n) : e();
  } catch (r) {
    console.error(r);
  }
  return s;
}
function we(e, t, n) {
  if (M(e)) {
    const r = oe(e, t, n);
    return r && It(r) && r.catch((o) => {
      console.error(o);
    }), r;
  }
  const s = [];
  for (let r = 0; r < e.length; r++)
    s.push(we(e[r], t, n));
  return s;
}
function zn(e, t) {
  return gt(e, null, t);
}
const te = {};
function Un(e, t, n) {
  return gt(e, t, n);
}
function gt(e, t, { immediate: n, deep: s, flush: r, onTrack: o, onTrigger: i } = Ot) {
  var Ce;
  const l = Ft() === ((Ce = g.currentComponent) == null ? void 0 : Ce.scope) ? g.currentComponent : null;
  let c, f = !1, p = !1;
  if (m(e) ? (c = () => e.value, f = B(e)) : z(e) ? (c = () => e, s = !0) : w(e) ? (p = !0, f = e.some((d) => z(d) || B(d)), c = () => e.map((d) => {
    if (m(d))
      return d.value;
    if (z(d))
      return K(d);
    if (M(d))
      return oe(d);
  })) : M(e) ? t ? c = () => oe(e) : c = () => {
    if (!(l && !l.isMounted))
      return a && a(), we(e, l);
  } : c = ke, t && s) {
    const d = c;
    c = () => K(d());
  }
  let a, H = (d) => {
    a = v.onStop = () => {
      oe(d), a = v.onStop = void 0;
    };
  }, P = p ? new Array(e.length).fill(te) : te;
  const D = () => {
    if (v.active)
      if (t) {
        const d = v.run();
        (s || f || (p ? d.some((_t, mt) => I(_t, P[mt])) : I(d, P))) && (a && a(), we(t, l, [
          d,
          // pass undefined as the old value when it's changed for the first time
          P === te ? void 0 : p && P[0] === te ? [] : P,
          H
        ]), P = d);
      } else
        v.run();
  };
  D.allowRecurse = !!t;
  let G;
  r === "sync" ? G = D : r === "post" ? G = () => ye(D) : (D.pre = !0, l && (D.id = l.cid), G = () => ht(D));
  const v = new Se(c, G);
  return t ? n ? D() : P = v.run() : r === "post" ? ye(v.run.bind(v)) : v.run(), () => {
    v.stop(), l && l.scope && Nt(l.scope.effects, v);
  };
}
function K(e, t) {
  if (!$(e) || e.__v_skip || (t = t || /* @__PURE__ */ new Set(), t.has(e)))
    return e;
  if (t.add(e), m(e))
    K(e.value, t);
  else if (w(e))
    for (let n = 0; n < e.length; n++)
      K(e[n], t);
  else if (Tt(e) || W(e))
    e.forEach((n) => {
      K(n, t);
    });
  else if (Dt(e))
    for (const n in e)
      K(e[n], t);
  return e;
}
export {
  On as EngineWidget,
  Pn as computed,
  kn as defineComponent,
  Bn as defineEngineWidget,
  xn as h,
  Kn as onBeforeDistory,
  Wn as onFrame,
  $n as onMounted,
  Hn as raw,
  it as reactive,
  ln as ref,
  rn as shallowReactive,
  In as shallowReadonly,
  Dn as shallowRef,
  jn as toRef,
  Ln as toRefs,
  Fn as vfor,
  An as vif,
  Un as watch,
  zn as watchEffect
};
