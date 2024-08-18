import { isObject as w, syncObject as Me, extendPath as ne, isArray as y } from "@vis-three/utils";
import { EventDispatcher as N, ENGINE_EVENT as be, Engine as Oe } from "@vis-three/core";
import { Subject as oe } from "rxjs";
import { nanoid as Se } from "nanoid";
import { LOADER_MANAGER_PLUGIN as ie, LOADER_EVENT as $, LoaderManagerPlugin as xe } from "@vis-three/plugin-loader-manager";
export * from "@vis-three/plugin-loader-manager";
import { PointerManagerPlugin as ve } from "@vis-three/plugin-pointer-manager";
export * from "@vis-three/plugin-pointer-manager";
import { EventManagerPlugin as Ee } from "@vis-three/plugin-event-manager";
export * from "@vis-three/plugin-event-manager";
import { RenderManagerPlugin as Ce } from "@vis-three/plugin-render-manager";
export * from "@vis-three/plugin-render-manager";
const we = function(r) {
  return r = r.replace(/[\-_\s]+(.)?/g, function(e, t) {
    return t ? t.toUpperCase() : "";
  }), r.slice(0, 1).toLowerCase() + r.slice(1);
}, Ae = function(r) {
  return we(r).toUpperCase();
}, ae = function(r) {
  const e = /(?=[A-Z])/;
  return r.split(e).map((t) => t.toUpperCase()).join("_");
}, M = {}, Ot = {}, T = {}, ce = {}, L = {}, k = {}, Q = M, St = T, le = ce, De = L, xt = k, U = (r) => k[r] || null, Re = (r) => L[r], Ne = (r) => {
  const e = U(r);
  return e ? Re(e) : !1;
}, B = "vis.father", b = "vis.key", G = "vis.observer", I = "vis.model", ue = /* @__PURE__ */ new WeakMap(), D = function(r) {
  Array.isArray(r) && ue.set(r, r.concat([]));
}, Le = function(r) {
  return ue.get(r);
}, V = function(r) {
  let e = "";
  const t = (s) => {
    s[Symbol.for(b)] !== void 0 && (e = `${s[Symbol.for(b)]}${e ? `.${e}` : ""}`, s[Symbol.for(B)] && t(s[Symbol.for(B)]));
  };
  return t(r), e;
}, Pe = function(r) {
  if (r.length && w(r[0])) {
    const e = r.length;
    for (let t = 0; t < e; t += 1)
      r[t][Symbol.for(b)] = t;
  }
}, P = function(r) {
  return r[Symbol.for(G)];
}, fe = function(r) {
  return !!r[Symbol.for(G)];
}, je = function(r) {
  return r[Symbol.for(I)];
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
let A = f;
class Y extends N {
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
    A.exec(e);
  }
  asyncNextTick(e) {
    A.nextTick(e);
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
    this.config[Symbol.for(I)] = this, this.puppet = this.createPuppet.call(this, {
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
    }), this.config[Symbol.for(I)] = void 0, this.clear();
  }
}
const pe = function(r) {
  return r;
};
pe.extend = function(r) {
  return function(e) {
    const t = e(r);
    return t.commands = Object.assign({}, r.commands, t.commands), t.context = function(s) {
      return Object.assign(
        r.context ? r.context(
          s
        ) : {},
        t.context ? t.context.call(this, s) : {}
      );
    }, t;
  };
};
const vt = pe;
var m = /* @__PURE__ */ ((r) => (r.COMPILED_ADD = "compiledAdd", r.COMPILED_REMOVE = "compiledRemove", r.COMPILED_ATTR = "compiledAttr", r.COMPILED_UPDATE = "compiledUpdate", r.COMPILED = "compiled", r.NOTICED = "noticed", r))(m || {});
class $e {
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
    const { option: t, Builder: s } = this.builders.get(e.type), n = s ? new s({ config: e, engine: this.engine, compiler: this }) : new Y({
      config: e,
      engine: this.engine,
      compiler: this
    });
    return t.context && Object.assign(n, t.context({ model: n })), n.createPuppet = t.create, n.disposePuppet = t.dispose, n.commands = t.commands, n.create(), this.map.set(e.vid, n), this.symbolMap.set(n.puppet, e.vid), n.emit(m.COMPILED_ADD), n.emit(m.COMPILED), n.puppet;
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
      Me(e, e, {
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
    if (this.builders.has(e.type))
      return console.warn(
        `${this.MODULE} Compiler: has already exist this model ${e.type}.`
      ), this;
    let s;
    if (e.shared) {
      s = class extends Y {
        constructor(n) {
          super(n);
        }
      };
      for (const n in e.shared)
        s.prototype[n] = e.shared[n];
    }
    return this.builders.set(e.type, {
      option: e,
      Builder: s
    }), M[e.type] = e.config, ce[ae(e.type)] = e.type, le[Ae(e.type)] = e.type, k[e.type] = this.MODULE, t && t(this), this;
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
const g = {
  proxy: {
    expand: void 0,
    timing: "before",
    toRaw: void 0
  },
  symbol: {
    generator: Se,
    validator: (r) => r.length === 21
  },
  engine: void 0
}, Et = function(r) {
  r.proxy && Object.assign(g.proxy, r.proxy), r.symbol && Object.assign(g.symbol, r.symbol);
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
class Te extends oe {
  constructor() {
    super(), this.subscriptions = /* @__PURE__ */ new Map();
    const e = g.proxy.expand ? (t = {}) => g.proxy.expand(t) : (t = {}) => t;
    g.proxy.timing === "before" ? this.space = new Proxy(e(), {
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
    const t = P(e);
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
const O = (r, e) => e === 1 / 0 ? "Infinity" : e === -1 / 0 ? "-Infinity" : e, F = (r, e) => e === "Infinity" ? 1 / 0 : e === "-Infinity" ? -1 / 0 : e, E = (r) => JSON.parse(JSON.stringify(r, O), F), S = {
  stringify: O,
  parse: F,
  clone: E
}, Ct = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  clone: E,
  default: S,
  parse: F,
  stringify: O
}, Symbol.toStringTag, { value: "Module" })), d = function(r, e, t = {
  observer: !0,
  strict: !0,
  warn: !0
}) {
  if (t.observer === void 0 && (t.observer = !0), t.strict === void 0 && (t.strict = !0), t.warn === void 0 && (t.warn = !0), t.handler === void 0 && (t.handler = g.proxy.expand), !Q[r])
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
  let n = Q[r]();
  if (n.vid === "" && (n.vid = g.symbol.generator()), e && s(n, e), t.observer === !1)
    return n;
  t.handler && g.proxy.timing === "before" && (n = t.handler(n));
  let o = He(n);
  if (t.handler && g.proxy.timing === "after" && (o = t.handler(o)), d.autoInject && d.injectEngine) {
    const i = d.injectEngine;
    if (i.applyConfig(o), d.injectScene && Ne(n.type) && n.type !== le.SCENE) {
      let a = null;
      typeof d.injectScene == "boolean" ? a = i.getObjectConfig(i.scene) : typeof d.injectScene == "string" && (a = i.getConfigBySymbol(d.injectScene)), a ? a.children.push(
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
d.autoInject = !0;
d.injectScene = !1;
d.injectEngine = null;
const he = (r, e = {}) => {
  let t = JSON.stringify(r, S.stringify);
  const s = {};
  !e.filter && (e.filter = ["assets"]);
  const n = Object.keys(r).filter(
    (i) => !e.filter.includes(i)
  );
  for (const i of n)
    for (const a of r[i]) {
      const c = a.vid, l = qe();
      t = t.replace(new RegExp(c, "g"), l), e.detail && (s[c] = l);
    }
  const o = JSON.parse(t, S.parse);
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
}, H = (r, e, t = {
  filter: ["assets"],
  clone: !0
}) => {
  const s = t.clone ? S.clone(r) : r;
  !t.filter && (t.filter = ["assets"]);
  const n = Object.keys(s).filter(
    (o) => !t.filter.includes(o)
  );
  for (const o of n)
    s[o].forEach((a, c, l) => {
      l[c] = e(a);
    });
  return s;
}, de = function(r) {
  const e = {};
  for (const t of Object.keys(r))
    for (const s of r[t])
      e[s.name] = s;
  return e;
}, ge = function(r, e) {
  return typeof r == "string" && (r = JSON.parse(r, S.parse)), H(S.clone(r), (t) => (t = d(t.type, t, { strict: !1 }), e ? e(t) : t));
}, Be = {
  clone: he,
  handler: H,
  planish: de,
  observable: ge
}, wt = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  clone: he,
  default: Be,
  handler: H,
  observable: ge,
  planish: de
}, Symbol.toStringTag, { value: "Module" }));
class Ie {
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
const At = new Ie();
class Je {
  constructor(e) {
    this.MODULE = "", this.container = new Te(), this.ruler = e.ruler, this.MODULE = e.module, this.container.subscribe((t) => {
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
    return JSON.stringify(e ? this.exportConfig() : Object.values(this.container.space), O);
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
              c[l] = i[l].map((p) => typeof p == "object" && p !== null ? E(p) : p);
              continue;
            }
            c[l] = {}, a[l] ? (o(i[l], a[l], c[l]), Object.keys(c[l]).length === 0 && delete c[l]) : c[l] = E(i[l]);
          } else
            a[l] !== i[l] && (c[l] = i[l]);
        }
      };
      for (const i of Object.values(t)) {
        if (!n[i.type]) {
          if (!M[i.type]) {
            console.error(`can not font some config with: ${i.type}`);
            continue;
          }
          n[i.type] = M[i.type]();
        }
        const a = {};
        o(i, n[i.type], a), s.push(a);
      }
      return s;
    } else
      return Object.values(E(this.container.space));
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
        if (!M[o.type]) {
          console.error(`can not font some config with: ${o.type}`);
          continue;
        }
        s[o.type] = M[o.type]();
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
const ke = [
  "push",
  "pop",
  "shift",
  "unshift",
  "splice",
  "sort",
  "reverse"
], v = /* @__PURE__ */ new WeakSet(), Ue = function(r, e, t) {
  return Array.isArray(r) && ke.includes(e) && v.add(r), Reflect.get(r, e, t);
}, Ge = function(r, e, t, s) {
  const n = V(r), o = P(r);
  if (typeof e == "symbol" || o.ignore(ne(n, e)))
    return Reflect.set(r, e, t, s);
  if (w(t) && !fe(t) && (t = R(o, t, r, e)), r[e] === void 0) {
    w(t) && (t[Symbol.for(b)] = e, y(t) && D(t)), y(r) && v.delete(r);
    const c = Reflect.set(r, e, t);
    return y(r) && D(r), o.next({
      operate: "add",
      path: n,
      key: e,
      value: t
    }), c;
  }
  const i = r[e], a = Reflect.set(r, e, t);
  if (y(r)) {
    if (v.has(r) && e === "length") {
      const c = Le(r);
      if (!c)
        return Array.isArray(i) && console.error("array value is not be cached:", r), a;
      Pe(r);
      const l = Math.abs(c.length - r.length), p = c.length >= r.length ? "delete" : "add", ye = c.length >= r.length ? r : c;
      let Z = 0, X = 0;
      for (const K of p === "delete" ? c : r) {
        if (!ye.includes(K) && (o.next({
          operate: p,
          path: n,
          key: X.toString(),
          value: K
        }), Z += 1, Z === l))
          break;
        X += 1;
      }
      return D(r), v.delete(r), a;
    } else if (v.has(r) || e === "length")
      return a;
  }
  return o.next({
    operate: "set",
    path: n,
    key: e,
    value: t
  }), a;
}, Ve = function(r, e) {
  const t = V(r), s = P(r);
  if (typeof e == "symbol" || s.ignore(t))
    return Reflect.deleteProperty(r, e);
  const n = r[e], o = Reflect.deleteProperty(r, e);
  return y(r) || s.next({
    operate: "delete",
    path: t,
    key: e,
    value: n
  }), o;
}, Fe = {
  get: Ue,
  set: Ge,
  deleteProperty: Ve
}, R = function(r, e, t, s) {
  if (!w(e) || fe(e))
    return e;
  const n = t ? V(t) : "";
  if (r.ignore(n))
    return e;
  t && (e[Symbol.for(B)] = t), e[Symbol.for(G)] = r;
  for (const i in e) {
    const a = ne(n, i);
    if (!r.ignore(a) && w(e[i])) {
      if (y(e[i])) {
        const c = e[i];
        e[i] = R(
          r,
          e[i],
          e
        ), D(c);
      } else
        e[i] = R(
          r,
          e[i],
          e
        );
      e[i][Symbol.for(b)] = i;
    }
  }
  return s && (e[Symbol.for(b)] = s), new Proxy(e, Fe);
}, C = class C extends oe {
  constructor(e) {
    super(), this.disable = !1, this.target = R(this, e);
  }
  ignore(e) {
    const t = e.indexOf(".");
    return t === -1 ? C.IGNORE[e] : C.IGNORE[e.slice(0, t)];
  }
  next(e) {
    if (this.disable)
      return;
    super.next(e);
    const t = je(this.target);
    t && t.emit(m.NOTICED);
  }
};
C.IGNORE = {
  vid: !0,
  type: !0,
  alias: !0,
  meta: !0
};
let J = C;
const He = function(r) {
  return new J(r).target;
}, Dt = function(r, e) {
  const t = P(r);
  if (!t) {
    console.warn("this object can not found it observer:", r);
    return;
  }
  t.disable = !0, e(), t.disable = !1;
}, x = {
  SYMBOL_VALIDATOR(r) {
    return !g.symbol.validator(r.symbol);
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
class We {
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
const Rt = function(r) {
  return r;
}, ze = function() {
  return {
    vid: "",
    type: "",
    name: "",
    alias: "",
    meta: {}
  };
}, Nt = ze, Lt = function(r) {
  return `DEFUALT-${r}`;
}, qe = function() {
  return g.symbol.generator();
}, Pt = function() {
};
class Ze {
  constructor(e) {
    this.type = "", this.module = e, this.type = e.type, this.ruler = new We(e.rule), this.compiler = e.compiler ? new e.compiler({
      module: e.type,
      models: e.models
    }) : new $e({
      module: e.type,
      models: e.models
    }), this.converter = new Je({
      module: e.type,
      ruler: this.ruler
    }).addCompiler(this.compiler);
  }
}
const jt = function(r) {
  return r;
};
class Xe extends N {
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
const W = "CompilerManagerPlugin", Ke = function() {
  return {
    name: W,
    install(r) {
      const e = new Xe();
      r.compilerManager = e, r.getObjectSymbol = function(t) {
        return e.getObjectSymbol(t);
      }, r.getObjectBySymbol = function(t) {
        return e.getObjectBySymbol(t);
      }, r.getObjectfromModule = function(t, s) {
        return e.getObjectfromModule(t, s);
      }, r.getObjectfromModules = function(t, s) {
        return e.getObjectfromModules(t, s);
      }, r.getObject3D = function(t) {
        return e.getObjectfromModules(De, t);
      };
    },
    dispose(r) {
      r.compilerManager.dispose(), delete r.compilerManager, delete r.getObjectSymbol, delete r.getObjectBySymbol, delete r.getObjectfromModule, delete r.getObjectfromModules, delete r.getObject3D;
    }
  };
};
class Qe extends N {
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
  /**
   * @deprecated use getConfigFromModule
   * @param module
   * @param vid
   * @returns
   */
  getConfigfromModule(e, t) {
    return this.getConfigFromModule(e, t);
  }
  getConfigFromModule(e, t) {
    return this.dataSupportMap.has(e) ? this.dataSupportMap.get(e).getConfig(t) || null : (console.warn(`data support manager can not found this module: ${e}`), null);
  }
  /**
   * @deprecated use getConfigFromModules
   * @param modules
   * @param vid
   * @returns
   */
  getConfigfromModules(e, t) {
    return this.getConfigFromModules(e, t);
  }
  getConfigFromModules(e, t) {
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
      const s = U(t.type);
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
      O
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
const j = "DataSupportManagerPlugin", Ye = function() {
  return {
    name: j,
    install(r) {
      const e = new Qe();
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
class _e {
}
class z extends _e {
  constructor() {
    super(...arguments), this.selector = (e, t, s) => s.get(z) || null;
  }
  parse({ url: e, resource: t, configMap: s, resourceMap: n }) {
    n.set(e, t);
  }
}
var q = /* @__PURE__ */ ((r) => (r.MAPPED = "mapped", r))(q || {});
class et extends N {
  constructor(e = {}) {
    super(), this.configMap = /* @__PURE__ */ new Map(), this.resourceMap = /* @__PURE__ */ new Map(), this.paserMap = /* @__PURE__ */ new Map(), this.defalutParser = new z();
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
        const p = t.selector[a](a, c, this.paserMap);
        if (!p) {
          console.warn(
            "resource manager hanlder can not found this resource parser: ",
            c,
            t.selector[a]
          );
          continue;
        }
        p.parse({
          url: a,
          resource: c,
          configMap: s,
          resourceMap: n
        }), i[a] = this.getResourceConfig(a);
        continue;
      }
      let l = null;
      for (const p of o)
        if (l = p.selector(a, c, this.paserMap), l)
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
        const i = U(o.type);
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
const me = "ResourceManagerPlugin", tt = function(r = {}) {
  return {
    name: me,
    install(e) {
      const t = new et(r.resources);
      e.resourceManager = t, e.registerResources = (s) => {
        const n = /* @__PURE__ */ new Map();
        return Object.keys(s).forEach((o) => {
          n.set(o, s[o]);
        }), t.mappingResource(n), e;
      };
    },
    dispose(e) {
      e.addEventListener(be.DISPOSE, () => {
        e.resourceManager.dispose();
      });
    }
  };
}, rt = "LoaderDataSupportStrategy", st = function() {
  let r, e;
  return {
    name: rt,
    condition: [j, ie],
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
}, nt = "LoaderMappingStrategy", ot = function() {
  let r, e;
  return {
    name: nt,
    condition: [me, ie],
    exec(t) {
      r = t.loadResources, t.loadResources = (s, n) => {
        const o = (i) => {
          n(void 0, i), t.resourceManager.removeEventListener(
            $.LOADED,
            o
          );
        };
        try {
          t.resourceManager.addEventListener(
            $.LOADED,
            o
          );
        } catch (i) {
          n(i);
        }
        return t.loaderManager.reset().load(s), t;
      }, e = t.loadResourcesAsync, t.loadResourcesAsync = (s) => new Promise((n, o) => {
        try {
          t.loaderManager.once(
            $.LOADED,
            (i) => {
              t.resourceManager.once(
                q.MAPPED,
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
}, it = "CompilerSupportStrategy", at = function() {
  return {
    name: it,
    condition: [W, j],
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
class ct {
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
const lt = new ct((r) => !!L[r]);
var ut = /* @__PURE__ */ ((r) => (r[r.ZERO = 0] = "ZERO", r[r.ONE = 100] = "ONE", r[r.TWO = 200] = "TWO", r[r.THREE = 300] = "THREE", r[r.FOUR = 400] = "FOUR", r[r.FIVE = 500] = "FIVE", r[r.SIX = 600] = "SIX", r[r.SEVEN = 700] = "SEVEN", r[r.EIGHT = 800] = "EIGHT", r[r.NINE = 900] = "NINE", r))(ut || {});
class ft extends Oe {
  constructor(e = {}) {
    super(), this.moduleLifeCycle = [], this.triggers = { object: lt }, this.install(xe(e.LoaderManagerPlugin)).install(ve(e.PointerManagerPlugin)).install(Ee(e.EventManagerPlugin)).install(Ce(e.RenderManagerPlugin)).install(tt(e.ResourceManagerPlugin)).install(Ye(e.DataSupportManagerPlugin)).install(Ke(e.CompilerManagerPlugin)), this.exec(st()).exec(ot()).exec(at());
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
        type: q.MAPPED,
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
    const t = ae(e.type);
    if (T[t])
      return console.warn(`Engine:module ${e.type} is already exist.`), this;
    T[t] = e.type, e.object && (L[e.type] = !0);
    const s = new Ze(e);
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
const $t = function(r, e = {}) {
  const t = new ft(e);
  return r.modules && r.modules.forEach((s) => {
    t.useModule(s);
  }), r.plugins && r.plugins.forEach((s) => {
    t.install(s);
  }), r.strategy && r.strategy.forEach((s) => {
    t.exec(s);
  }), t;
}, u = class u {
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
let re = u;
const h = class h {
  /**
   * 获取着色器文件
   * @param name 文件名
   * @returns shader | null
   */
  static getShader(e) {
    return h.library.has(e) ? h.cloneShader(
      h.library.get(e)
    ) : (console.warn(`con not found shader in shader library: ${e}`), null);
  }
  /**
   * 获取该着色器文件对应的配置
   * @param name
   * @returns
   */
  static generateConfig(e, t) {
    if (!h.library.has(e))
      return console.warn(`con not found shader in shader library: ${e}`), { shader: e, uniforms: {} };
    const s = h.library.get(e), n = {
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
h.library = /* @__PURE__ */ new Map(), h.register = function(e) {
  h.library.has(e.name) && console.warn(
    `shader library has exist shader: ${e.name} that will be cover.`
  ), h.library.set(e.name, e);
};
let se = h;
const Tt = (r) => {
  A.exec(r);
}, Bt = () => {
}, It = [W, j];
export {
  Ie as AntiShake,
  W as COMPILER_MANAGER_PLUGIN,
  it as COMPILER_SUPPORT_STRATEGY,
  Q as CONFIGFACTORY,
  xt as CONFIGMODULE,
  le as CONFIGTYPE,
  M as CONFIG_FACTORY,
  Ot as CONFIG_MODEL,
  k as CONFIG_MODULE,
  ce as CONFIG_TYPE,
  $e as Compiler,
  Xe as CompilerManager,
  Ke as CompilerManagerPlugin,
  at as CompilerSupportStrategy,
  Te as Container,
  Je as Converter,
  j as DATA_SUPPORT_MANAGER_PLUGIN,
  x as DEFAULT_RULE,
  Qe as DataSupportManager,
  Ye as DataSupportManagerPlugin,
  z as DefaultParser,
  ft as EngineSupport,
  re as EventGeneratorManager,
  Ct as JSONHandler,
  rt as LOADER_DATA_SUPPORT_STRATEGY,
  nt as LOADER_MAPPING_STRATEGY,
  st as LoaderDataSupportStrategy,
  ot as LoaderMappingStrategy,
  m as MODEL_EVENT,
  St as MODULETYPE,
  T as MODULE_TYPE,
  Y as Model,
  Ze as Moduler,
  De as OBJECTMODULE,
  L as OBJECT_MODULE,
  It as PLUGINS,
  _e as Parser,
  q as RESOURCE_EVENT,
  me as RESOURCE_MANAGER_PLUGIN,
  et as ResourceManager,
  tt as ResourceManagerPlugin,
  We as Ruler,
  ut as SUPPORT_LIFE_CYCLE,
  se as ShaderGeneratorManager,
  wt as Template,
  qe as createSymbol,
  $t as defineEngineSupport,
  pe as defineModel,
  jt as defineModule,
  Et as defineOption,
  vt as defineProcessor,
  Rt as defineRule,
  Pt as emptyHandler,
  d as generateConfig,
  ze as getBasicConfig,
  U as getModule,
  P as getObserver,
  Nt as getSymbolConfig,
  At as globalAntiShake,
  g as globalOption,
  Re as isObjectModule,
  Ne as isObjectType,
  He as observable,
  Dt as slientSync,
  Tt as toAsync,
  Bt as toTrigger,
  Lt as uniqueSymbol
};
