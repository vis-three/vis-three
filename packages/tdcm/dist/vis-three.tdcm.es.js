import { isObject as A, syncObject as be, extendPath as oe, isArray as M } from "@vis-three/utils";
import { EventDispatcher as N, ENGINE_EVENT as Oe, Engine as Se } from "@vis-three/core";
import { Subject as ie } from "rxjs";
import { nanoid as ve } from "nanoid";
import { LOADER_MANAGER_PLUGIN as ae, LOADER_EVENT as T, LoaderManagerPlugin as xe } from "@vis-three/plugin-loader-manager";
export * from "@vis-three/plugin-loader-manager";
import { PointerManagerPlugin as Ee } from "@vis-three/plugin-pointer-manager";
export * from "@vis-three/plugin-pointer-manager";
import { EventManagerPlugin as we } from "@vis-three/plugin-event-manager";
export * from "@vis-three/plugin-event-manager";
import { RenderManagerPlugin as Ce } from "@vis-three/plugin-render-manager";
export * from "@vis-three/plugin-render-manager";
const Ae = function(r) {
  return r = r.replace(/[\-_\s]+(.)?/g, function(e, t) {
    return t ? t.toUpperCase() : "";
  }), r.slice(0, 1).toLowerCase() + r.slice(1);
}, De = function(r) {
  return Ae(r).toUpperCase();
}, ce = function(r) {
  const e = /(?=[A-Z])/;
  return r.split(e).map((t) => t.toUpperCase()).join("_");
}, b = {}, vt = {}, B = {}, le = {}, P = {}, U = {}, Y = b, xt = B, ue = le, Re = P, Et = U, G = (r) => U[r] || null, Le = (r) => P[r], Ne = (r) => {
  const e = G(r);
  return e ? Le(e) : !1;
}, I = "vis.father", O = "vis.key", V = "vis.observer", J = "vis.model", fe = /* @__PURE__ */ new WeakMap(), R = function(r) {
  Array.isArray(r) && fe.set(r, r.concat([]));
}, Pe = function(r) {
  return fe.get(r);
}, H = function(r) {
  let e = "";
  const t = (s) => {
    s[Symbol.for(O)] !== void 0 && (e = `${s[Symbol.for(O)]}${e ? `.${e}` : ""}`, s[Symbol.for(I)] && t(s[Symbol.for(I)]));
  };
  return t(r), e;
}, je = function(r) {
  if (r.length && A(r[0])) {
    const e = r.length;
    for (let t = 0; t < e; t += 1)
      r[t][Symbol.for(O)] = t;
  }
}, j = function(r) {
  return r[Symbol.for(V)];
}, pe = function(r) {
  return !!r[Symbol.for(V)];
}, $e = function(r) {
  return r[Symbol.for(J)];
}, f = class f {
  static exec(e) {
    if (e(!1))
      return;
    f.list.includes(e) || f.list.push(e);
    let t = 0;
    const s = () => {
      f.timer && clearTimeout(f.timer), f.timer = window.setTimeout(() => {
        const n = [];
        for (const o of f.list)
          o(!1) || n.push(o);
        if (n.length)
          if (n.length === t) {
            for (const o of n)
              o(!0);
            f.list = [];
          } else
            t = n.length, f.list = n, s();
        else
          f.list = [];
      }, f.time);
    };
    s();
  }
  static append(e) {
    f.list.length && !f.list.includes(e) ? f.list.push(e) : f.exec(e);
  }
  static nextTick(e) {
    window.setTimeout(() => {
      e();
    }, f.time);
  }
};
f.list = [], f.time = 0;
let D = f;
class Te extends N {
  constructor(e) {
    super(), this.config = e.config, this.engine = e.engine, this.compiler = e.compiler;
  }
  toConfig(e) {
    return this.engine.getConfigBySymbol(e);
  }
  toModel(e) {
    return this.engine.compilerManager.getModelBySymbol(e);
  }
  toObject(e) {
    return this.engine.getObjectBySymbol(e);
  }
  toPuppet(e) {
    return this.toObject(e);
  }
  toAsync(e) {
    D.exec(e);
  }
  asyncNextTick(e) {
    D.nextTick(e);
  }
  toTrigger(e, t) {
    const s = this.engine.getTrigger(e);
    s && s.register(t);
  }
  process(e) {
    if (!this.commands || !this.commands[e.operate]) {
      this[e.operate](e);
      return;
    }
    let t = this.commands[e.operate];
    const s = e.path ? e.path.split(".").concat(e.key) : [e.key];
    for (const n of s)
      if (!t[n] && !t.$reg) {
        this[e.operate](e);
        return;
      } else if (t[n])
        if (typeof t[n] == "function") {
          t[n].call(this, {
            model: this,
            ctx: this,
            config: this.config,
            target: this.puppet,
            puppet: this.puppet,
            engine: this.engine,
            compiler: this.compiler,
            ...e
          });
          return;
        } else
          t = t[n];
      else if (t.$reg) {
        for (const o of t.$reg)
          if (o.reg.test(n)) {
            o.handler.call(this, {
              model: this,
              ctx: this,
              config: this.config,
              target: this.puppet,
              puppet: this.puppet,
              engine: this.engine,
              compiler: this.compiler,
              ...e
            });
            return;
          }
      }
    this[e.operate](e);
  }
  add(e) {
    let t = this.puppet;
    const s = e.path;
    for (const n of s)
      if (typeof t[n] !== void 0)
        t = t[n];
      else {
        console.warn("processor can not exec default add operate.", e);
        return;
      }
    t[e.key] = e.value;
  }
  set(e) {
    let t = this.puppet;
    const s = e.path;
    for (const n of s)
      if (typeof t[n] !== void 0)
        t = t[n];
      else {
        console.warn("processor can not exec default set operate.", e);
        return;
      }
    t[e.key] = e.value;
  }
  delete(e) {
    let t = this.puppet;
    const s = e.path;
    for (const n of s)
      if (typeof t[n] !== void 0)
        t = t[n];
      else {
        console.warn("processor can not exec default delete operate.", e);
        return;
      }
    delete t[e.key];
  }
  create() {
    this.config[Symbol.for(J)] = this, this.puppet = this.createPuppet.call(this, {
      model: this,
      config: this.config,
      engine: this.engine,
      compiler: this.compiler
    });
  }
  dispose() {
    this.disposePuppet.call(this, {
      model: this,
      target: this.puppet,
      puppet: this.puppet,
      config: this.config,
      engine: this.engine,
      compiler: this.compiler
    }), this.config[Symbol.for(J)] = void 0, this.clear();
  }
}
const he = function(r) {
  return r;
};
he.extend = function(r) {
  return function(e) {
    const t = e(r);
    return t.commands = Object.assign({}, r.commands, t.commands), t.context = function(s) {
      return Object.assign(
        r.context ? r.context(s) : {},
        t.context ? t.context.call(this, s) : {}
      );
    }, t;
  };
};
const wt = he;
var m = /* @__PURE__ */ ((r) => (r.COMPILED_ADD = "compiledAdd", r.COMPILED_REMOVE = "compiledRemove", r.COMPILED_ATTR = "compiledAttr", r.COMPILED_UPDATE = "compiledUpdate", r.COMPILED = "compiled", r.NOTICED = "noticed", r))(m || {});
class Be {
  constructor(e) {
    this.MODULE = "", this.builders = /* @__PURE__ */ new Map(), this.target = {}, this.map = /* @__PURE__ */ new Map(), this.symbolMap = /* @__PURE__ */ new WeakMap(), this.MODULE = e.module;
    for (const t of e.models)
      this.useModel(t);
  }
  /**
   * @deprecated
   * @returns
   */
  getMap() {
    return null;
  }
  useEngine(e) {
    return this.engine = e, this;
  }
  setTarget(e) {
    return this.target = e, this;
  }
  add(e) {
    if (!this.builders.has(e.type))
      return console.warn(
        `${this.MODULE} Compiler: can not support this type: ${e.type}`
      ), null;
    const t = this.builders.get(e.type), s = new Te({ config: e, engine: this.engine, compiler: this });
    return t.context && Object.assign(s, t.context({ model: s })), s.createPuppet = t.create, s.disposePuppet = t.dispose, s.commands = t.commands, s.create(), this.map.set(e.vid, s), this.symbolMap.set(s.puppet, e.vid), s.emit(m.COMPILED_ADD), s.emit(m.COMPILED), s.puppet;
  }
  remove(e) {
    const t = e.vid;
    if (!this.map.has(t))
      return console.warn(
        `${this.MODULE} Compiler: can not found this vid object: ${t}.`
      ), this;
    if (!this.builders.has(e.type))
      return console.warn(
        `${this.MODULE} Compiler: can not support this type: ${e.type}`
      ), this;
    const s = this.map.get(t);
    return this.map.delete(t), this.symbolMap.delete(s.puppet), s.dispose(), s.emit(m.COMPILED_REMOVE), s.emit(m.COMPILED), this;
  }
  cover(e) {
    const t = e.vid;
    return this.map.has(t) ? (Promise.resolve().then(() => {
      be(e, e, {
        vid: !0,
        type: !0
      });
    }), this) : (console.warn(
      `${this.MODULE} Compiler: can not found this vid object: ${t}.`
    ), this);
  }
  compile(e, t) {
    if (!this.map.has(e))
      return console.warn(
        `${this.MODULE} Compiler: can not found model which vid is: '${e}'`
      ), this;
    const s = this.map.get(e);
    s.process(t);
    const n = t.path;
    return s.emit(
      `${m.COMPILED_ATTR}:${n && n + "."}${t.key}`
    ), s.emit(m.COMPILED_UPDATE), s.emit(m.COMPILED), this;
  }
  compileAll() {
    const e = this.target;
    for (const t of Object.values(e))
      this.add(t);
    return this;
  }
  dispose() {
    for (const e of this.map.values())
      e.dispose();
    return this.map.clear(), this.target = {}, this;
  }
  getObjectSymbol(e) {
    return this.symbolMap.get(e) || null;
  }
  getObjectBySymbol(e) {
    var t;
    return ((t = this.map.get(e)) == null ? void 0 : t.puppet) || null;
  }
  getModelBySymbol(e) {
    return this.map.get(e) || null;
  }
  useModel(e, t) {
    return this.builders.has(e.type) ? (console.warn(
      `${this.MODULE} Compiler: has already exist this model ${e.type}.`
    ), this) : (this.builders.set(e.type, e), b[e.type] = e.config, le[ce(e.type)] = e.type, ue[De(e.type)] = e.type, U[e.type] = this.MODULE, t && t(this), this);
  }
  /**
   * @deprecated use useModel
   * @param processor
   * @param callback
   * @returns
   */
  useProcessor(e, t) {
    return this.useModel(e, t);
  }
}
const y = {
  proxy: {
    expand: void 0,
    timing: "before",
    toRaw: void 0
  },
  symbol: {
    generator: ve,
    validator: (r) => r.length === 21
  },
  engine: void 0
}, Ct = function(r) {
  r.proxy && Object.assign(y.proxy, r.proxy), r.symbol && Object.assign(y.symbol, r.symbol);
}, _ = function(r, e, t) {
  return Reflect.get(r, e, t);
}, ee = function(r, e, t, s, n) {
  if (typeof e == "symbol")
    return Reflect.set(r, e, t, s);
  if (r[e] === void 0) {
    const o = Reflect.set(r, e, t);
    return n.add(t), n.next({
      operate: "add",
      path: "",
      key: e,
      value: t,
      symbol: e
    }), o;
  } else {
    const o = Reflect.set(r, e, t);
    return n.remove(t.vid), n.add(t), n.next({
      operate: "set",
      path: "",
      key: e,
      value: t,
      symbol: e
    }), o;
  }
}, te = function(r, e, t) {
  if (typeof e == "symbol")
    return Reflect.deleteProperty(r, e);
  const s = r[e], n = Reflect.deleteProperty(r, e);
  return t.next({
    operate: "delete",
    path: "",
    key: e,
    value: s,
    symbol: e
  }), t.remove(s.vid), n;
};
class Ie extends ie {
  constructor() {
    super(), this.subscriptions = /* @__PURE__ */ new Map();
    const e = y.proxy.expand ? (t = {}) => y.proxy.expand(t) : (t = {}) => t;
    y.proxy.timing === "before" ? this.space = new Proxy(e(), {
      get: _,
      set: (t, s, n, o) => ee(t, s, n, o, this),
      deleteProperty: (t, s) => te(t, s, this)
    }) : this.space = e(
      new Proxy(
        {},
        {
          get: _,
          set: (t, s, n, o) => ee(t, s, n, o, this),
          deleteProperty: (t, s) => te(t, s, this)
        }
      )
    );
  }
  add(e) {
    const t = j(e);
    if (!t) {
      console.error("Container: this config can not observer", e);
      return;
    }
    this.subscriptions.set(
      t.target.vid,
      t.subscribe((s) => {
        this.next({
          operate: s.operate,
          path: s.path,
          key: s.key,
          value: s.value,
          symbol: t.target.vid
        });
      })
    );
  }
  remove(e) {
    this.subscriptions.delete(e);
  }
}
const S = (r, e) => e === 1 / 0 ? "Infinity" : e === -1 / 0 ? "-Infinity" : e, W = (r, e) => e === "Infinity" ? 1 / 0 : e === "-Infinity" ? -1 / 0 : e, w = (r) => JSON.parse(JSON.stringify(r, S), W), v = {
  stringify: S,
  parse: W,
  clone: w
}, At = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  clone: w,
  default: v,
  parse: W,
  stringify: S
}, Symbol.toStringTag, { value: "Module" })), g = function(r, e, t = {
  observer: !0,
  strict: !0,
  warn: !0
}) {
  if (t.observer === void 0 && (t.observer = !0), t.strict === void 0 && (t.strict = !0), t.warn === void 0 && (t.warn = !0), t.handler === void 0 && (t.handler = y.proxy.expand), !Y[r])
    return console.error(`type: ${r} can not be found in configList.`), {
      vid: "",
      type: r
    };
  const s = (i, a) => {
    for (const c in a) {
      if (i[c] === void 0) {
        !t.strict && (i[c] = a[c]), t.strict && t.warn && console.warn(`'${r}' config can not set key: ${c}`);
        continue;
      }
      typeof a[c] == "object" && a[c] !== null && !Array.isArray(a[c]) ? (i[c] === null && (i[c] = { ...a[c] }), s(i[c], a[c])) : i[c] = a[c];
    }
  };
  let n = Y[r]();
  if (n.vid === "" && (n.vid = y.symbol.generator()), e && s(n, e), t.observer === !1)
    return n;
  t.handler && y.proxy.timing === "before" && (n = t.handler(n));
  let o = Fe(n);
  if (t.handler && y.proxy.timing === "after" && (o = t.handler(o)), g.autoInject && g.injectEngine) {
    const i = g.injectEngine;
    if (i.applyConfig(o), g.injectScene && Ne(n.type) && n.type !== ue.SCENE) {
      let a = null;
      typeof g.injectScene == "boolean" ? a = i.getObjectConfig(i.scene) : typeof g.injectScene == "string" && (a = i.getConfigBySymbol(g.injectScene)), a ? a.children.push(
        n.vid
      ) : console.warn(
        "current engine scene can not found it config",
        i,
        i.scene
      );
    }
    return o;
  }
  return o;
};
g.autoInject = !0;
g.injectScene = !1;
g.injectEngine = null;
const de = (r, e = {}) => {
  let t = JSON.stringify(r, v.stringify);
  const s = {};
  !e.filter && (e.filter = ["assets"]);
  const n = Object.keys(r).filter(
    (i) => !e.filter.includes(i)
  );
  for (const i of n)
    for (const a of r[i]) {
      const c = a.vid, l = Xe();
      t = t.replace(new RegExp(c, "g"), l), e.detail && (s[c] = l);
    }
  const o = JSON.parse(t, v.parse);
  if (e.fillName)
    if (typeof e.fillName == "function")
      for (const i of n)
        for (const a of o[i])
          a.name || (a.name = e.fillName(a));
    else
      for (const i of n)
        for (const a of o[i])
          a.name || (a.name = `${a.type}-${a.vid.slice(-2)}`);
  return e.detail ? { config: o, detail: s } : o;
}, z = (r, e, t = {
  filter: ["assets"],
  clone: !0
}) => {
  const s = t.clone ? v.clone(r) : r;
  !t.filter && (t.filter = ["assets"]);
  const n = Object.keys(s).filter(
    (o) => !t.filter.includes(o)
  );
  for (const o of n)
    s[o].forEach((a, c, l) => {
      l[c] = e(a);
    });
  return s;
}, ge = function(r) {
  const e = {};
  for (const t of Object.keys(r))
    for (const s of r[t])
      e[s.name] = s;
  return e;
}, ye = function(r, e) {
  return typeof r == "string" && (r = JSON.parse(r, v.parse)), z(v.clone(r), (t) => (t = g(t.type, t, { strict: !1 }), e ? e(t) : t));
}, Je = {
  clone: de,
  handler: z,
  planish: ge,
  observable: ye
}, Dt = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  clone: de,
  default: Je,
  handler: z,
  observable: ye,
  planish: ge
}, Symbol.toStringTag, { value: "Module" }));
class ke {
  constructor() {
    this.list = [], this.time = 0;
  }
  exec(e) {
    if (e(!1))
      return;
    this.list.includes(e) || this.list.push(e);
    let t = 0;
    const s = () => {
      this.timer && clearTimeout(this.timer), this.timer = setTimeout(() => {
        const n = [];
        for (const o of this.list)
          o(!1) || n.push(o);
        if (n.length)
          if (n.length === t) {
            for (const o of n)
              o(!0);
            this.list = [];
          } else
            t = n.length, this.list = n, s();
        else
          this.list = [];
      }, this.time);
    };
    s();
  }
  append(e) {
    this.list.length && !this.list.includes(e) ? this.list.push(e) : this.exec(e);
  }
  nextTick(e) {
    setTimeout(() => {
      e();
    }, this.time);
  }
}
const Rt = new ke();
class Ue {
  constructor(e) {
    this.MODULE = "", this.container = new Ie(), this.ruler = e.ruler, this.MODULE = e.module, this.container.subscribe((t) => {
      this.ruler.execute(t);
    });
  }
  getData() {
    return this.container.space;
  }
  existSymbol(e) {
    return !!this.container.space[e];
  }
  addConfig(e) {
    return this.container.space[e.vid] = e, this;
  }
  getConfig(e) {
    return this.container.space[e];
  }
  removeConfig(e) {
    const t = this.container.space;
    t[e] !== void 0 && delete t[e];
  }
  addCompiler(e) {
    return e.setTarget(this.container.space), e.compileAll(), this.ruler.link(e), this;
  }
  /**
   * 导出json化配置单
   * @returns json config
   */
  toJSON(e = !0) {
    return JSON.stringify(e ? this.exportConfig() : Object.values(this.container.space), S);
  }
  /**
   * 导出配置单
   * @param compress 是否压缩配置单 default true
   * @returns config
   */
  exportConfig(e = !0) {
    if (e) {
      const t = this.container.space, s = [], n = {}, o = (i, a, c = {}) => {
        for (const l in i) {
          if (["vid", "type"].includes(l)) {
            c[l] = i[l];
            continue;
          }
          if (typeof i[l] == "object" && i[l] !== null) {
            if (Array.isArray(i[l])) {
              if (!i[l].length)
                continue;
              c[l] = i[l].map((h) => typeof h == "object" && h !== null ? w(h) : h);
              continue;
            }
            c[l] = {}, a[l] ? (o(i[l], a[l], c[l]), Object.keys(c[l]).length === 0 && delete c[l]) : c[l] = w(i[l]);
          } else
            a[l] !== i[l] && (c[l] = i[l]);
        }
      };
      for (const i of Object.values(t)) {
        if (!n[i.type]) {
          if (!b[i.type]) {
            console.error(`can not font some config with: ${i.type}`);
            continue;
          }
          n[i.type] = b[i.type]();
        }
        const a = {};
        o(i, n[i.type], a), s.push(a);
      }
      return s;
    } else
      return Object.values(w(this.container.space));
  }
  /**
   * 加载配置
   * @param configs this module configs
   * @returns true
   */
  load(e) {
    const t = this.container.space, s = {}, n = (o, i) => {
      for (const a in i)
        typeof o[a] == "object" && o[a] !== null && typeof i[a] == "object" && i[a] !== null ? n(o[a], i[a]) : o[a] === void 0 && (o[a] = i[a]);
    };
    for (const o of e) {
      if (!s[o.type]) {
        if (!b[o.type]) {
          console.error(`can not font some config with: ${o.type}`);
          continue;
        }
        s[o.type] = b[o.type]();
      }
      n(o, s[o.type]), t[o.vid] = o;
    }
    return this;
  }
  remove(e) {
    const t = this.container.space;
    for (const s of e)
      t[s.vid] !== void 0 && delete t[s.vid];
    return this;
  }
}
const Ge = [
  "push",
  "pop",
  "shift",
  "unshift",
  "splice",
  "sort",
  "reverse"
], E = /* @__PURE__ */ new WeakSet(), Ve = function(r, e, t) {
  return Array.isArray(r) && Ge.includes(e) && E.add(r), Reflect.get(r, e, t);
}, He = function(r, e, t, s) {
  const n = H(r), o = j(r);
  if (typeof e == "symbol" || o.ignore(oe(n, e)))
    return Reflect.set(r, e, t, s);
  if (A(t) && !pe(t) && (t = L(o, t, r, e)), r[e] === void 0) {
    A(t) && (t[Symbol.for(O)] = e, M(t) && R(t)), M(r) && E.delete(r);
    const c = Reflect.set(r, e, t);
    return M(r) && R(r), o.next({
      operate: "add",
      path: n,
      key: e,
      value: t
    }), c;
  }
  const i = r[e], a = Reflect.set(r, e, t);
  if (M(r)) {
    if (E.has(r) && e === "length") {
      const c = Pe(r);
      if (!c)
        return Array.isArray(i) && console.error("array value is not be cached:", r), a;
      je(r);
      const l = Math.abs(c.length - r.length), h = c.length >= r.length ? "delete" : "add", Me = c.length >= r.length ? r : c;
      let X = 0, K = 0;
      for (const Q of h === "delete" ? c : r) {
        if (!Me.includes(Q) && (o.next({
          operate: h,
          path: n,
          key: K.toString(),
          value: Q
        }), X += 1, X === l))
          break;
        K += 1;
      }
      return R(r), E.delete(r), a;
    } else if (E.has(r) || e === "length")
      return a;
  }
  return o.next({
    operate: "set",
    path: n,
    key: e,
    value: t
  }), a;
}, We = function(r, e) {
  const t = H(r), s = j(r);
  if (typeof e == "symbol" || s.ignore(t))
    return Reflect.deleteProperty(r, e);
  const n = r[e], o = Reflect.deleteProperty(r, e);
  return M(r) || s.next({
    operate: "delete",
    path: t,
    key: e,
    value: n
  }), o;
}, ze = {
  get: Ve,
  set: He,
  deleteProperty: We
}, L = function(r, e, t, s) {
  if (!A(e) || pe(e))
    return e;
  const n = t ? H(t) : "";
  if (r.ignore(n))
    return e;
  t && (e[Symbol.for(I)] = t), e[Symbol.for(V)] = r;
  for (const i in e) {
    const a = oe(n, i);
    if (!r.ignore(a) && A(e[i])) {
      if (M(e[i])) {
        const c = e[i];
        e[i] = L(
          r,
          e[i],
          e
        ), R(c);
      } else
        e[i] = L(
          r,
          e[i],
          e
        );
      e[i][Symbol.for(O)] = i;
    }
  }
  return s && (e[Symbol.for(O)] = s), new Proxy(e, ze);
}, C = class C extends ie {
  constructor(e) {
    super(), this.disable = !1, this.target = L(this, e);
  }
  ignore(e) {
    const t = e.indexOf(".");
    return t === -1 ? C.IGNORE[e] : C.IGNORE[e.slice(0, t)];
  }
  next(e) {
    if (this.disable)
      return;
    super.next(e);
    const t = $e(this.target);
    t && t.emit(m.NOTICED);
  }
};
C.IGNORE = {
  vid: !0,
  type: !0,
  alias: !0,
  meta: !0
};
let k = C;
const Fe = function(r) {
  return new k(r).target;
}, Lt = function(r, e) {
  const t = j(r);
  if (!t) {
    console.warn("this object can not found it observer:", r);
    return;
  }
  t.disable = !0, e(), t.disable = !1;
}, x = {
  SYMBOL_VALIDATOR(r) {
    return !y.symbol.validator(r.symbol);
  },
  OPERATE_ADD({ operate: r, path: e, symbol: t, key: s, value: n }, o) {
    return r === "add" && !e.length && t === s ? (o.add(n), !1) : !0;
  },
  OPERATE_DELETE({ operate: r, path: e, value: t }, s) {
    return r === "delete" && !e.length ? (s.remove(t), !1) : !0;
  },
  OPERATE_COVER({ operate: r, path: e, value: t, key: s, symbol: n }, o) {
    return r === "set" && !e.length && s === n ? (o.cover(t), !1) : !0;
  },
  OPERATE_COMPILE(r, e) {
    return e.compile(r.symbol, r), !1;
  }
};
class qe {
  constructor(e) {
    this.rules = [], this.pointer = null, e ? this.rules = e : this.rules.push(
      x.SYMBOL_VALIDATOR,
      x.OPERATE_ADD,
      x.OPERATE_DELETE,
      x.OPERATE_COVER,
      x.OPERATE_COMPILE
    );
  }
  link(e) {
    this.compiler = e;
  }
  execute(e) {
    for (const t of this.rules)
      if (!t(e, this.compiler))
        break;
  }
  remove(e) {
    if (this.rules.includes(e)) {
      const t = this.rules.indexOf(e);
      this.rules.splice(t, 1);
    } else
      console.warn("Ruler: can not found rule", e, this.rules);
  }
  add(e, t) {
    return this.rules.includes(e) ? (console.warn("Ruler: rules has already exist this rule", this.rules), this) : t !== void 0 ? (this.rules.splice(t, 0, e), this) : this.pointer === null ? (console.error(
      "Ruler:index is undefined, need a index or use before and after api to set a index"
    ), this) : (this.rules.splice(this.pointer, 0, e), this);
  }
  before(e) {
    return this.rules.includes(e) ? (this.pointer = this.rules.indexOf(e), this) : (console.warn("Ruler: rules not found this rule", this.rules), this);
  }
  after(e) {
    return this.rules.includes(e) ? (this.pointer = this.rules.indexOf(e) + 1, this) : (console.warn("Ruler: rules not found this rule", this.rules), this);
  }
  push(e) {
    return this.rules.includes(e) ? (console.warn("Ruler: rules has already exist this rule", this.rules), this) : (this.rules.push(e), this);
  }
  unshift(e) {
    return this.rules.includes(e) ? (console.warn("Ruler: rules has already exist this rule", this.rules), this) : (this.rules.unshift(e), this);
  }
  pop() {
    return this.rules.pop(), this;
  }
  shift() {
    return this.rules.shift(), this;
  }
}
const Nt = function(r) {
  return r;
}, Ze = function() {
  return {
    vid: "",
    type: "",
    name: "",
    alias: "",
    meta: {}
  };
}, Pt = Ze, jt = function(r) {
  return `DEFUALT-${r}`;
}, Xe = function() {
  return y.symbol.generator();
}, $t = function() {
};
class Ke {
  constructor(e) {
    this.type = "", this.module = e, this.type = e.type, this.ruler = new qe(e.rule), this.compiler = e.compiler ? new e.compiler({
      module: e.type,
      models: e.models
    }) : new Be({
      module: e.type,
      models: e.models
    }), this.converter = new Ue({
      module: e.type,
      ruler: this.ruler
    }).addCompiler(this.compiler);
  }
}
const Tt = function(r) {
  return r;
};
class Qe extends N {
  constructor() {
    super(), this.compilerMap = /* @__PURE__ */ new Map();
  }
  /**
   * 编译器扩展
   * @param compiler
   */
  extend(e, t = !1) {
    this.compilerMap.has(e.MODULE) ? (console.warn("compiler manager has exist this compiler", e), t && this.compilerMap.set(e.MODULE, e)) : this.compilerMap.set(e.MODULE, e);
  }
  getCompiler(e) {
    return this.compilerMap.has(e) ? this.compilerMap.get(e) : (console.warn(`can not found this type in compiler manager: ${e}`), null);
  }
  /**
   * 获取该three物体的vid标识
   * @param object three object
   * @returns vid or null
   */
  getObjectSymbol(e) {
    for (const t of this.compilerMap.values()) {
      const s = t.getObjectSymbol(e);
      if (s)
        return s;
    }
    return null;
  }
  /**
   * 通过vid标识获取相应的three对象
   * @param vid vid标识
   * @returns three object || null
   */
  getObjectBySymbol(e) {
    for (const t of this.compilerMap.values()) {
      const s = t.getObjectBySymbol(e);
      if (s)
        return s;
    }
    return null;
  }
  // TODO: getModelBySymbol
  getModelBySymbol(e) {
    for (const t of this.compilerMap.values()) {
      const s = t.getModelBySymbol(e);
      if (s)
        return s;
    }
    return null;
  }
  /**
   * @deprecated use getObjectFromModule
   * @param module
   * @param vid
   * @returns
   */
  getObjectfromModule(e, t) {
    return this.getObjectFromModule(e, t);
  }
  getObjectFromModule(e, t) {
    return this.compilerMap.has(e) ? this.compilerMap.get(e).map.get(t) || null : (console.warn(`compiler manager can not found this module: ${e}`), null);
  }
  /**
   * @deprecated use getObjectFromModules
   * @param modules
   * @param vid
   * @returns
   */
  getObjectfromModules(e, t) {
    return this.getObjectFromModules(e, t);
  }
  getObjectFromModules(e, t) {
    Array.isArray(e) || (e = Object.keys(e));
    for (const s of e) {
      if (!this.compilerMap.has(s)) {
        console.warn(`compiler manager can not found this module: ${s}`);
        continue;
      }
      const n = this.compilerMap.get(s);
      if (n.map.has(t))
        return n.map.get(t);
    }
    return null;
  }
  dispose() {
    for (const e of this.compilerMap.values())
      e.dispose();
    return this.compilerMap.clear(), this;
  }
}
const F = "CompilerManagerPlugin", Ye = function() {
  return {
    name: F,
    install(r) {
      const e = new Qe();
      r.compilerManager = e, r.getObjectSymbol = function(t) {
        return e.getObjectSymbol(t);
      }, r.getObjectBySymbol = function(t) {
        return e.getObjectBySymbol(t);
      }, r.getObjectfromModule = function(t, s) {
        return e.getObjectfromModule(t, s);
      }, r.getObjectfromModules = function(t, s) {
        return e.getObjectfromModules(t, s);
      }, r.getObject3D = function(t) {
        return e.getObjectfromModules(Re, t);
      };
    },
    dispose(r) {
      r.compilerManager.dispose(), delete r.compilerManager, delete r.getObjectSymbol, delete r.getObjectBySymbol, delete r.getObjectfromModule, delete r.getObjectfromModules, delete r.getObject3D;
    }
  };
};
class _e extends N {
  constructor() {
    super(), this.dataSupportMap = /* @__PURE__ */ new Map();
  }
  /**
   * 编译器扩展
   * @param compiler
   */
  extend(e, t = !1) {
    this.dataSupportMap.has(e.MODULE) ? (console.warn(
      "dataSupport manager has exist this dataSupport",
      e
    ), t && this.dataSupportMap.set(e.MODULE, e)) : this.dataSupportMap.set(e.MODULE, e);
  }
  /**
   * 获取该模块下的支持插件
   * @param type MODULETYPE
   * @returns Converter
   */
  getDataSupport(e) {
    return this.dataSupportMap.has(e) ? this.dataSupportMap.get(e) : (console.warn(`can not found this type in dataSupportManager: ${e}`), null);
  }
  /**
   * 通过vid标识获取相应配置对象
   * @param vid vid标识
   * @returns config || null
   */
  getConfigBySymbol(e) {
    const t = this.dataSupportMap.values();
    for (const s of t) {
      const n = s.getConfig(e);
      if (n)
        return n;
    }
    return null;
  }
  getConfigfromModule(e, t) {
    return this.dataSupportMap.has(e) ? this.dataSupportMap.get(e).getConfig(t) || null : (console.warn(`data support manager can not found this module: ${e}`), null);
  }
  getConfigfromModules(e, t) {
    Array.isArray(e) || (e = Object.keys(e));
    for (const s of e) {
      if (!this.dataSupportMap.has(s)) {
        console.warn(
          `data support manager can not found this module: ${s}`
        );
        continue;
      }
      const o = this.dataSupportMap.get(s).getConfig(t);
      if (o)
        return o;
    }
    return null;
  }
  /**
   * 通过vid标识移除相关配置对象
   * @param vid ...vid标识
   * @returns this
   */
  removeConfigBySymbol(...e) {
    for (const t of e)
      for (const s of this.dataSupportMap.values())
        if (s.existSymbol(t)) {
          s.removeConfig(t);
          break;
        }
    return this;
  }
  /**
   * 通过vid标识获取该标识所处的模块
   * @param vid vid标识
   * @returns MODULETYPE || null
   */
  getModuleBySymbol(e) {
    const t = this.dataSupportMap.values();
    for (const s of t)
      if (s.existSymbol(e))
        return s.MODULE;
    return null;
  }
  /**
   * 应用配置对象
   * @param config vis相关配置对象
   * @returns this
   */
  applyConfig(...e) {
    for (const t of e) {
      const s = G(t.type);
      s ? this.dataSupportMap.get(s).addConfig(t) : console.warn(
        `dataSupportManager can not found this config module: ${t.type}`
      );
    }
    return this;
  }
  /**
   * 根据配置单加载对象
   * @param config 符合vis配置选项的配置单对象
   * @returns this
   */
  load(e) {
    return this.dataSupportMap.forEach((s, n) => {
      e[n] && s.load(e[n]);
    }), this;
  }
  /**
   * 根据模块加载配置
   * @param config
   * @param module
   * @returns
   */
  loadByModule(e, t) {
    const s = this.dataSupportMap.get(t);
    return s ? (s.load(e), this) : (console.warn(`DataSupportManager can not support this module: ${t}`), this);
  }
  /**
   * 根据配置单移除相关对象
   * @param config  符合vis配置选项的配置单对象
   * @returns this
   */
  remove(e) {
    return this.dataSupportMap.forEach((s, n) => {
      e[n] && s.remove(e[n]);
    }), this;
  }
  /**
   * 获取JSON化的配置单
   * @param extendsConfig 需要额外JSON化的配置对象，会被dataSupport的对象覆盖
   * @param compress 是否压缩配置单 default true
   * @returns JSON string
   */
  toJSON(e = {}, t = !0) {
    return JSON.stringify(
      this.exportConfig(e, t),
      S
    );
  }
  /**
   * 导出配置单
   * @param extendsConfig 拓展配置对象
   * @param compress 是否压缩配置单 default true
   * @returns LoadOptions
   */
  exportConfig(e = {}, t = !0) {
    return this.dataSupportMap.forEach((n, o) => {
      e[o] = n.exportConfig(t);
    }), e;
  }
}
const $ = "DataSupportManagerPlugin", et = function() {
  return {
    name: $,
    install(r) {
      const e = new _e();
      r.dataSupportManager = e, r.applyConfig = function(...t) {
        return e.applyConfig(...t), r;
      }, r.getConfigBySymbol = function(t) {
        return e.getConfigBySymbol(t);
      }, r.getConfigfromModule = function(t, s) {
        return e.getConfigfromModule(t, s);
      }, r.getConfigfromModules = function(t, s) {
        return e.getConfigfromModules(t, s);
      }, r.removeConfigBySymbol = function(...t) {
        return e.removeConfigBySymbol(...t), r;
      }, r.toJSON = function() {
        return e.toJSON();
      }, r.exportConfig = function() {
        return e.exportConfig();
      };
    },
    dispose(r) {
      delete r.dataSupportManager, delete r.applyConfig, delete r.getConfigBySymbol, delete r.removeConfigBySymbol, delete r.toJSON, delete r.exportConfig;
    }
  };
};
class tt {
}
class q extends tt {
  constructor() {
    super(...arguments), this.selector = (e, t, s) => s.get(q) || null;
  }
  parse({ url: e, resource: t, configMap: s, resourceMap: n }) {
    n.set(e, t);
  }
}
var Z = /* @__PURE__ */ ((r) => (r.MAPPED = "mapped", r))(Z || {});
class rt extends N {
  constructor(e = {}) {
    super(), this.configMap = /* @__PURE__ */ new Map(), this.resourceMap = /* @__PURE__ */ new Map(), this.paserMap = /* @__PURE__ */ new Map(), this.defalutParser = new q();
    const t = /* @__PURE__ */ new Map();
    for (const s in e)
      t.has(s) && console.warn(
        `resourceManager construct params rescource already exist: ${s}, that will be cover.`
      ), t.set(s, e[s]);
    this.mappingResource(t);
  }
  /**
   * 添加解析器
   * @param parser  extends VIS.Parser
   * @returns this
   */
  addParser(e) {
    return this.paserMap.has(e.constructor) ? this : (this.paserMap.set(e.constructor, e), this);
  }
  /**
   *  根据加载好的资源拆解映射为最小资源单位与形成相应的配置与结构
   * @param loadResourceMap loaderManager的resourceMap
   * @param options options.handler: {url, hanlder}可以根据特定的url指定特定的解析器
   * @returns this
   */
  mappingResource(e, t) {
    const s = this.configMap, n = this.resourceMap, o = [...this.paserMap.values()], i = {};
    for (const [a, c] of e.entries()) {
      if (t != null && t.parser && t.parser[a]) {
        t.parser[a].parse({
          url: a,
          resource: c,
          configMap: s,
          resourceMap: n
        });
        continue;
      }
      if (t != null && t.selector && t.selector[a]) {
        const h = t.selector[a](a, c, this.paserMap);
        if (!h) {
          console.warn(
            "resource manager hanlder can not found this resource parser: ",
            c,
            t.selector[a]
          );
          continue;
        }
        h.parse({
          url: a,
          resource: c,
          configMap: s,
          resourceMap: n
        }), i[a] = this.getResourceConfig(a);
        continue;
      }
      let l = null;
      for (const h of o)
        if (l = h.selector(a, c, this.paserMap), l)
          break;
      if (!l) {
        console.warn(
          "resouce manager can not found some handler to parser this resource, that will use default parser do it:",
          c
        ), this.defalutParser.parse({
          url: a,
          resource: c,
          configMap: s,
          resourceMap: n
        });
        continue;
      }
      l.parse({
        url: a,
        resource: c,
        configMap: s,
        resourceMap: n
      }), i[a] = this.getResourceConfig(a);
    }
    return this.dispatchEvent({
      type: "mapped",
      configMap: s,
      resourceMap: n,
      resourceConfig: i
    }), this;
  }
  /**
   * 获取资源的配置单，该配置单根据资源结构生成
   * @param url 资源url
   * @returns LoadOptions
   */
  getResourceConfig(e) {
    const t = this.configMap, s = {};
    return [...t.keys()].filter((n) => n.startsWith(e)).forEach((n) => {
      const o = t.get(n);
      if (!o)
        console.error(`unknow error: can not found config by url: ${n}`);
      else {
        const i = G(o.type);
        i ? (!s[i] && (s[i] = []), s[i].push(o)) : console.error(
          `unknow error: can not found module by type: ${o.type}`,
          o
        );
      }
    }), s;
  }
  /**
   * 是否有此资源
   * @param url 资源 url
   * @returns boolean
   */
  hasResource(e) {
    return this.resourceMap.has(e);
  }
  /**
   * 移除url下的所有资源
   * @param url url
   * @returns this
   */
  remove(e) {
    const t = this.configMap, s = this.resourceMap;
    return [...t.keys()].filter((n) => n.startsWith(e)).forEach((n) => {
      t.delete(n);
      const o = s.get(n);
      o.dispose && o.dispose(), s.delete(n);
    }), this;
  }
  /**
   * 清空所有资源
   */
  dispose() {
    this.resourceMap.forEach((e, t) => {
      e.dispose && e.dispose();
    }), this.resourceMap.clear(), this.configMap.clear();
  }
}
const me = "ResourceManagerPlugin", st = function(r = {}) {
  return {
    name: me,
    install(e) {
      const t = new rt(r.resources);
      e.resourceManager = t, e.registerResources = (s) => {
        const n = /* @__PURE__ */ new Map();
        return Object.keys(s).forEach((o) => {
          n.set(o, s[o]);
        }), t.mappingResource(n), e;
      };
    },
    dispose(e) {
      e.addEventListener(Oe.DISPOSE, () => {
        e.resourceManager.dispose();
      });
    }
  };
}, nt = "LoaderDataSupportStrategy", ot = function() {
  let r, e;
  return {
    name: nt,
    condition: [$, ae],
    exec(t) {
      r = t.toJSON, t.toJSON = function() {
        const s = {
          assets: JSON.parse(t.loaderManager.toJSON())
        };
        return t.dataSupportManager.toJSON(s);
      }, e = t.exportConfig, t.exportConfig = function() {
        let s = {};
        return s = {
          assets: t.loaderManager.exportConfig()
        }, t.dataSupportManager.exportConfig(s);
      };
    },
    rollback(t) {
      t.toJSON = r, t.exportConfig = e;
    }
  };
}, it = "LoaderMappingStrategy", at = function() {
  let r, e;
  return {
    name: it,
    condition: [me, ae],
    exec(t) {
      r = t.loadResources, t.loadResources = (s, n) => {
        const o = (i) => {
          n(void 0, i), t.resourceManager.removeEventListener(
            T.LOADED,
            o
          );
        };
        try {
          t.resourceManager.addEventListener(
            T.LOADED,
            o
          );
        } catch (i) {
          n(i);
        }
        return t.loaderManager.reset().load(s), t;
      }, e = t.loadResourcesAsync, t.loadResourcesAsync = (s) => new Promise((n, o) => {
        try {
          t.loaderManager.once(
            T.LOADED,
            (i) => {
              t.resourceManager.once(
                Z.MAPPED,
                (c) => {
                  n(c);
                }
              );
              const a = /* @__PURE__ */ new Map();
              s.forEach((c) => {
                typeof c == "string" ? a.set(c, i.resourceMap.get(c)) : a.set(c.url, i.resourceMap.get(c.url));
              }), t.resourceManager.mappingResource(a);
            }
          );
        } catch (i) {
          o(i);
        }
        t.loaderManager.reset().load(s);
      });
    },
    rollback(t) {
      t.loadResources = r, t.loadResourcesAsync = e;
    }
  };
}, ct = "CompilerSupportStrategy", lt = function() {
  return {
    name: ct,
    condition: [F, $],
    exec(r) {
      r.compilerManager.compilerMap.forEach((e, t) => {
        var s;
        e.useEngine(r), (s = r.dataSupportManager.dataSupportMap.get(t)) == null || s.addCompiler(e);
      });
    },
    rollback() {
    }
  };
};
class ut {
  constructor(e) {
    this.condition = {}, this.list = [], this.validator = () => !0, e && (this.validator = e);
  }
  add(e) {
    return this.validator(e) && (this.condition[e] = !1), this;
  }
  reach(e) {
    return this.condition[e] === void 0 ? (console.warn(`ModuleTrigger: can not set module condition: ${e}.`), this) : (this.condition[e] = !0, this.check() && this.trig(), this);
  }
  register(e) {
    e(!0) || this.list.push(e);
  }
  trig() {
    const e = this.list;
    for (const t of e)
      t(!1);
    this.reset();
  }
  reset() {
    this.list = [], Object.keys(this.condition).forEach((e) => {
      this.condition[e] = !1;
    });
  }
  check() {
    return !Object.values(this.condition).includes(!1);
  }
}
const ft = new ut((r) => !!P[r]);
var pt = /* @__PURE__ */ ((r) => (r[r.ZERO = 0] = "ZERO", r[r.ONE = 100] = "ONE", r[r.TWO = 200] = "TWO", r[r.THREE = 300] = "THREE", r[r.FOUR = 400] = "FOUR", r[r.FIVE = 500] = "FIVE", r[r.SIX = 600] = "SIX", r[r.SEVEN = 700] = "SEVEN", r[r.EIGHT = 800] = "EIGHT", r[r.NINE = 900] = "NINE", r))(pt || {});
class ht extends Se {
  constructor(e = {}) {
    super(), this.moduleLifeCycle = [], this.triggers = { object: ft }, this.install(xe(e.LoaderManagerPlugin)).install(Ee(e.PointerManagerPlugin)).install(we(e.EventManagerPlugin)).install(Ce(e.RenderManagerPlugin)).install(st(e.ResourceManagerPlugin)).install(et(e.DataSupportManagerPlugin)).install(Ye(e.CompilerManagerPlugin)), this.exec(ot()).exec(at()).exec(lt());
  }
  loadLifeCycle(e) {
    const t = this.dataSupportManager, s = this.triggers, n = this.moduleLifeCycle.sort((o, i) => o.order - i.order);
    for (const { module: o } of n) {
      e[o] && t.loadByModule(e[o], o);
      for (const i in s)
        s[i].reach(o);
    }
  }
  removeLifeCycle(e) {
    const t = this.dataSupportManager, s = this.moduleLifeCycle.sort((a, c) => c.order - a.order);
    for (const { module: a } of s)
      e[a] && t.remove({ [a]: e[a] });
    const n = e.assets || [], o = this.resourceManager, i = this.loaderManager;
    n.forEach((a) => {
      o.remove(a), i.remove(a);
    });
  }
  loadConfig(e, t) {
    const s = this.renderManager.hasRendering();
    if (s && this.renderManager.stop(), e.assets && e.assets.length) {
      const n = (o) => {
        delete e.assets, this.loadLifeCycle(e), this.resourceManager.removeEventListener("mapped", n), t && t(o), s ? this.renderManager.play() : this.renderManager.render();
      };
      this.resourceManager.addEventListener("mapped", n), this.loaderManager.reset().load(e.assets);
    } else
      this.loadLifeCycle(e), t && t(), s ? this.renderManager.play() : this.renderManager.render();
    return this;
  }
  loadConfigAsync(e, t) {
    return new Promise((s, n) => {
      const o = this.renderManager.hasRendering();
      o && this.renderManager.stop(), e.assets && e.assets.length ? this.loadResourcesAsync(e.assets).then((i) => {
        delete e.assets, this.loadLifeCycle(e), o ? this.renderManager.play() : this.renderManager.render(), s(i);
      }) : (this.loadLifeCycle(e), o ? this.renderManager.play() : this.renderManager.render(), s({
        type: Z.MAPPED,
        configMap: this.resourceManager.configMap,
        resourceMap: this.resourceManager.resourceMap,
        resourceConfig: {}
      }));
    });
  }
  removeConfig(e) {
    this.removeLifeCycle(e);
  }
  getObjectConfig(e) {
    const t = this.getObjectSymbol(e);
    return t ? this.getConfigBySymbol(t) : null;
  }
  useModule(e) {
    const t = ce(e.type);
    if (B[t])
      return console.warn(`Engine:module ${e.type} is already exist.`), this;
    B[t] = e.type, e.object && (P[e.type] = !0);
    const s = new Ke(e);
    return s.compiler.useEngine(this), this.dataSupportManager.extend(s.converter), this.compilerManager.extend(s.compiler), e.extend && e.extend(this), this.moduleLifeCycle.push({
      module: e.type,
      order: e.lifeOrder || 0
    }), Object.values(this.triggers).forEach((n) => {
      n.add(e.type);
    }), this;
  }
  addTrigger(e, t) {
    return this.triggers[e] ? console.warn(
      `EngineSupport: this trigger has already exist: ${e}.`,
      this.triggers
    ) : this.triggers[e] = t, this;
  }
  getTrigger(e) {
    return this.triggers[e] ? this.triggers[e] : (console.warn(
      `EngineSupport: not found this trigger: ${e}.`,
      this.triggers
    ), null);
  }
  //TODO: module init
  init() {
  }
  /**
   * @deprecated
   * use useModule
   */
  registModule(e) {
    return this.useModule(e);
  }
}
const Bt = function(r, e = {}) {
  const t = new ht(e);
  return r.modules && r.modules.forEach((s) => {
    t.useModule(s);
  }), r.plugins && r.plugins.forEach((s) => {
    t.install(s);
  }), r.strategy && r.strategy.forEach((s) => {
    t.exec(s);
  }), t;
}, p = class p {
  static generateConfig(e, t) {
    if (!p.configLibrary.has(e))
      return console.warn(`event library can not found config by name: ${e}`), {
        name: ""
      };
    const s = (o, i) => {
      for (const a in i)
        o[a] !== void 0 && (typeof i[a] == "object" && i[a] !== null && !Array.isArray(i[a]) ? s(o[a], i[a]) : o[a] = i[a]);
    }, n = JSON.parse(
      JSON.stringify(p.configLibrary.get(e))
    );
    return s(n, t), n;
  }
  static generateScript(e, t, s, n) {
    return p.generatorLibrary.has(n.name) ? p.generatorLibrary.get(n.name)(
      e,
      t,
      s,
      n
    ) : (console.error(
      `event library can not found generator by name: ${n.name}`
    ), () => {
    });
  }
  static has(e) {
    return p.configLibrary.has(e);
  }
};
p.configLibrary = /* @__PURE__ */ new Map(), p.generatorLibrary = /* @__PURE__ */ new Map(), p.register = function({
  config: e,
  generator: t
}) {
  return p.configLibrary.has(e.name) ? (console.warn(
    `EventLibrary has already exist this event generator: ${e.name}, that will be cover.`
  ), p) : (p.configLibrary.set(
    e.name,
    JSON.parse(JSON.stringify(e))
  ), p.generatorLibrary.set(e.name, t), p);
};
let re = p;
const u = class u {
  static generateConfig(e, t) {
    if (!u.configLibrary.has(e))
      return console.warn(`event library can not found config by name: ${e}`), null;
    const s = (o, i) => {
      for (const a in i)
        typeof i[a] == "object" && i[a] !== null && !Array.isArray(i[a]) ? s(o[a], i[a]) : o[a] = i[a];
    }, n = JSON.parse(
      JSON.stringify(u.configLibrary.get(e))
    );
    return s(n, t), n;
  }
  static generateEvent(e, t) {
    return u.generatorLibrary.has(e.name) ? u.generatorLibrary.get(e.name)(
      t,
      e
    ) : (console.error(
      `event library can not found generator by name: ${e.name}`
    ), () => {
    });
  }
  static has(e) {
    return u.configLibrary.has(e);
  }
  static useEngine(e) {
    u.engine = e;
  }
  static createEvent(e, t, s) {
    if (!u.engine && !s)
      return console.error(
        "EventGenerator Manager createEvent must provide an engine, you can use 'useEngine' to set it."
      ), null;
    const n = u.generateConfig(e, t);
    return n ? u.generateEvent(
      n,
      s || u.engine
    ) : null;
  }
};
u.configLibrary = /* @__PURE__ */ new Map(), u.generatorLibrary = /* @__PURE__ */ new Map(), u.register = function({
  config: e,
  generator: t
}) {
  return u.configLibrary.has(e.name) ? (console.warn(
    `EventGeneratorManager has already exist this event generator: ${e.name}, that will be cover.`
  ), u) : (u.configLibrary.set(
    e.name,
    JSON.parse(JSON.stringify(e))
  ), u.generatorLibrary.set(e.name, t), u);
};
let se = u;
const d = class d {
  /**
   * 获取着色器文件
   * @param name 文件名
   * @returns shader | null
   */
  static getShader(e) {
    return d.library.has(e) ? d.cloneShader(
      d.library.get(e)
    ) : (console.warn(`con not found shader in shader library: ${e}`), null);
  }
  /**
   * 获取该着色器文件对应的配置
   * @param name
   * @returns
   */
  static generateConfig(e, t) {
    if (!d.library.has(e))
      return console.warn(`con not found shader in shader library: ${e}`), { shader: e, uniforms: {} };
    const s = d.library.get(e), n = {
      shader: e,
      uniforms: {}
    };
    if (s.uniforms && (n.uniforms = JSON.parse(JSON.stringify(s.uniforms))), t) {
      const o = (i, a) => {
        for (const c in a)
          i[c] !== void 0 && (typeof a[c] == "object" && a[c] !== null && !Array.isArray(a[c]) ? (i[c] === null && (i[c] = { ...a[c] }), o(i[c], a[c])) : i[c] = a[c]);
      };
      o(n.uniforms, t);
    }
    return n;
  }
  /**
   * 克隆着色器
   * @param shader
   * @returns
   */
  static cloneShader(e) {
    const t = {
      name: e.name
    };
    return e.vertexShader && (t.vertexShader = e.vertexShader), e.fragmentShader && (t.fragmentShader = e.fragmentShader), e.uniforms && (t.uniforms = JSON.parse(JSON.stringify(e.uniforms))), t;
  }
};
d.library = /* @__PURE__ */ new Map(), d.register = function(e) {
  d.library.has(e.name) && console.warn(
    `shader library has exist shader: ${e.name} that will be cover.`
  ), d.library.set(e.name, e);
};
let ne = d;
const It = (r) => {
  D.exec(r);
}, Jt = () => {
}, kt = [F, $];
export {
  re as AniScriptGeneratorManager,
  ke as AntiShake,
  F as COMPILER_MANAGER_PLUGIN,
  ct as COMPILER_SUPPORT_STRATEGY,
  Y as CONFIGFACTORY,
  Et as CONFIGMODULE,
  ue as CONFIGTYPE,
  b as CONFIG_FACTORY,
  vt as CONFIG_MODEL,
  U as CONFIG_MODULE,
  le as CONFIG_TYPE,
  Be as Compiler,
  Qe as CompilerManager,
  Ye as CompilerManagerPlugin,
  lt as CompilerSupportStrategy,
  Ie as Container,
  Ue as Converter,
  $ as DATA_SUPPORT_MANAGER_PLUGIN,
  x as DEFAULT_RULE,
  _e as DataSupportManager,
  et as DataSupportManagerPlugin,
  q as DefaultParser,
  ht as EngineSupport,
  se as EventGeneratorManager,
  At as JSONHandler,
  nt as LOADER_DATA_SUPPORT_STRATEGY,
  it as LOADER_MAPPING_STRATEGY,
  ot as LoaderDataSupportStrategy,
  at as LoaderMappingStrategy,
  m as MODEL_EVENT,
  xt as MODULETYPE,
  B as MODULE_TYPE,
  Te as Model,
  Ke as Moduler,
  Re as OBJECTMODULE,
  P as OBJECT_MODULE,
  kt as PLUGINS,
  tt as Parser,
  Z as RESOURCE_EVENT,
  me as RESOURCE_MANAGER_PLUGIN,
  rt as ResourceManager,
  st as ResourceManagerPlugin,
  qe as Ruler,
  pt as SUPPORT_LIFE_CYCLE,
  ne as ShaderGeneratorManager,
  Dt as Template,
  Xe as createSymbol,
  Bt as defineEngineSupport,
  he as defineModel,
  Tt as defineModule,
  Ct as defineOption,
  wt as defineProcessor,
  Nt as defineRule,
  $t as emptyHandler,
  g as generateConfig,
  Ze as getBasicConfig,
  G as getModule,
  j as getObserver,
  Pt as getSymbolConfig,
  Rt as globalAntiShake,
  y as globalOption,
  Le as isObjectModule,
  Ne as isObjectType,
  Fe as observable,
  Lt as slientSync,
  It as toAsync,
  Jt as toTrigger,
  jt as uniqueSymbol
};
