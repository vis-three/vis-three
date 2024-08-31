import { isObject as v, syncObject as de, extendPath as te, isArray as g } from "@vis-three/utils";
import { EventDispatcher as R, ENGINE_EVENT as ge, Engine as me } from "@vis-three/core";
import { Subject as re } from "rxjs";
import { nanoid as ye } from "nanoid";
import { LOADER_MANAGER_PLUGIN as se, LOADER_EVENT as T, LoaderManagerPlugin as Me } from "@vis-three/plugin-loader-manager";
export * from "@vis-three/plugin-loader-manager";
import { PointerManagerPlugin as Oe } from "@vis-three/plugin-pointer-manager";
export * from "@vis-three/plugin-pointer-manager";
import { EventManagerPlugin as be } from "@vis-three/plugin-event-manager";
export * from "@vis-three/plugin-event-manager";
import { RenderManagerPlugin as Se } from "@vis-three/plugin-render-manager";
export * from "@vis-three/plugin-render-manager";
const xe = function(r) {
  return r = r.replace(/[\-_\s]+(.)?/g, function(e, t) {
    return t ? t.toUpperCase() : "";
  }), r.slice(0, 1).toLowerCase() + r.slice(1);
}, Ee = function(r) {
  return xe(r).toUpperCase();
}, oe = function(r) {
  const e = /(?=[A-Z])/;
  return r.split(e).map((t) => t.toUpperCase()).join("_");
}, m = {}, ve = {}, L = {}, ne = {}, j = {}, G = {}, K = m, yt = L, ie = ne, Ce = j, Mt = G, k = (r) => G[r] || null, we = (r) => j[r], Ae = (r) => {
  const e = k(r);
  return e ? we(e) : !1;
}, $ = "vis.father", y = "vis.key", J = "vis.observer", B = "vis.model", ae = /* @__PURE__ */ new WeakMap(), w = function(r) {
  Array.isArray(r) && ae.set(r, r.concat([]));
}, De = function(r) {
  return ae.get(r);
}, U = function(r) {
  let e = "";
  const t = (s) => {
    s[Symbol.for(y)] !== void 0 && (e = `${s[Symbol.for(y)]}${e ? `.${e}` : ""}`, s[Symbol.for($)] && t(s[Symbol.for($)]));
  };
  return t(r), e;
}, Re = function(r) {
  if (r.length && v(r[0])) {
    const e = r.length;
    for (let t = 0; t < e; t += 1)
      r[t][Symbol.for(y)] = t;
  }
}, P = function(r) {
  return r[Symbol.for(J)];
}, ce = function(r) {
  return !!r[Symbol.for(J)];
}, je = function(r) {
  return r[Symbol.for(B)];
}, u = class u {
  static exec(e) {
    if (e(!1))
      return;
    u.list.includes(e) || u.list.push(e);
    let t = 0;
    const s = () => {
      u.timer && clearTimeout(u.timer), u.timer = window.setTimeout(() => {
        const o = [];
        for (const n of u.list)
          n(!1) || o.push(n);
        if (o.length)
          if (o.length === t) {
            for (const n of o)
              n(!0);
            u.list = [];
          } else
            t = o.length, u.list = o, s();
        else
          u.list = [];
      }, u.time);
    };
    s();
  }
  static append(e) {
    u.list.length && !u.list.includes(e) ? u.list.push(e) : u.exec(e);
  }
  static nextTick(e) {
    window.setTimeout(() => {
      e();
    }, u.time);
  }
};
u.list = [], u.time = 0;
let C = u;
class Q extends R {
  constructor(e) {
    super(), this.config = e.config, this.engine = e.engine, this.compiler = e.compiler;
  }
  toConfig(e) {
    return this.engine.getConfigBySymbol(e);
  }
  toModel(e) {
    if (typeof e == "string")
      return this.engine.compilerManager.getModelBySymbol(e);
    {
      const t = this.engine.getObjectSymbol(e);
      return t ? this.engine.compilerManager.getModelBySymbol(t) : (console.warn("Model: can not found object symbol:", e), null);
    }
  }
  toObject(e) {
    return this.engine.getObjectBySymbol(e);
  }
  toPuppet(e) {
    return this.toObject(e);
  }
  toAsync(e) {
    C.exec(e);
  }
  asyncNextTick(e) {
    C.nextTick(e);
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
    for (const o of s)
      if (!t[o] && !t.$reg) {
        this[e.operate](e);
        return;
      } else if (t[o])
        if (typeof t[o] == "function") {
          t[o].call(this, {
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
          t = t[o];
      else if (t.$reg) {
        for (const n of t.$reg)
          if (n.reg.test(o)) {
            n.handler.call(this, {
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
    for (const o of s)
      if (typeof t[o] !== void 0)
        t = t[o];
      else {
        console.warn("processor can not exec default add operate.", e);
        return;
      }
    t[e.key] = e.value;
  }
  set(e) {
    let t = this.puppet;
    const s = e.path;
    for (const o of s)
      if (typeof t[o] !== void 0)
        t = t[o];
      else {
        console.warn("processor can not exec default set operate.", e);
        return;
      }
    t[e.key] = e.value;
  }
  delete(e) {
    let t = this.puppet;
    const s = e.path;
    for (const o of s)
      if (typeof t[o] !== void 0)
        t = t[o];
      else {
        console.warn("processor can not exec default delete operate.", e);
        return;
      }
    delete t[e.key];
  }
  create() {
    this.config[Symbol.for(B)] = this, this.puppet = this.createPuppet.call(this, {
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
    }), this.config[Symbol.for(B)] = void 0, this.clear();
  }
}
const A = function(r) {
  return r;
};
A.extend = function(r) {
  const e = function(t) {
    const s = t(r);
    return s.shared = Object.assign({}, r.shared, s.shared), s.commands = Object.assign({}, r.commands, s.commands), s.context = function(o) {
      return Object.assign(
        r.context ? r.context(
          o
        ) : {},
        s.context ? s.context.call(this, o) : {}
      );
    }, s;
  };
  return e.extend = function(t) {
    const s = t(r);
    return s.shared = Object.assign(
      {},
      r.shared,
      s.shared
    ), s.commands = Object.assign(
      {},
      r.commands,
      s.commands
    ), s.context = function(o) {
      return Object.assign(
        r.context ? r.context(
          o
        ) : {},
        s.context ? s.context.call(this, o) : {}
      );
    }, A.extend(s);
  }, e;
};
A.expand = function(r) {
  return r;
};
const Ot = A;
var d = /* @__PURE__ */ ((r) => (r.COMPILED_ADD = "compiledAdd", r.COMPILED_REMOVE = "compiledRemove", r.COMPILED_ATTR = "compiledAttr", r.COMPILED_UPDATE = "compiledUpdate", r.COMPILED = "compiled", r.NOTICED = "noticed", r))(d || {});
class Pe {
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
    const { option: t, Builder: s } = this.builders.get(e.type), o = s ? new s({ config: e, engine: this.engine, compiler: this }) : new Q({
      config: e,
      engine: this.engine,
      compiler: this
    });
    return t.context && Object.assign(o, t.context({ model: o })), o.createPuppet = t.create, o.disposePuppet = t.dispose, o.commands = t.commands, o.create(), this.map.set(e.vid, o), this.symbolMap.set(o.puppet, e.vid), o.emit(d.COMPILED_ADD), o.emit(d.COMPILED), o.puppet;
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
    return this.map.delete(t), this.symbolMap.delete(s.puppet), s.dispose(), s.emit(d.COMPILED_REMOVE), s.emit(d.COMPILED), this;
  }
  cover(e) {
    const t = e.vid;
    return this.map.has(t) ? (Promise.resolve().then(() => {
      de(e, e, {
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
    const o = t.path;
    return s.emit(
      `${d.COMPILED_ATTR}:${o && o + "."}${t.key}`
    ), s.emit(d.COMPILED_UPDATE), s.emit(d.COMPILED), this;
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
      s = class extends Q {
        constructor(o) {
          super(o);
        }
      };
      for (const o in e.shared)
        s.prototype[o] = e.shared[o];
    }
    return this.builders.set(e.type, {
      option: e,
      Builder: s
    }), Object.defineProperty(m, e.type, {
      get() {
        return e.config;
      }
    }), ne[oe(e.type)] = e.type, ie[Ee(e.type)] = e.type, G[e.type] = this.MODULE, ve[e.type] = e, t && t(this), this;
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
const h = {
  proxy: {
    expand: void 0,
    timing: "before",
    toRaw: void 0
  },
  symbol: {
    generator: ye,
    validator: (r) => r.length === 21
  },
  engine: void 0
}, bt = function(r) {
  r.proxy && Object.assign(h.proxy, r.proxy), r.symbol && Object.assign(h.symbol, r.symbol);
}, Y = function(r, e, t) {
  return Reflect.get(r, e, t);
}, _ = function(r, e, t, s, o) {
  if (typeof e == "symbol")
    return Reflect.set(r, e, t, s);
  if (r[e] === void 0) {
    const n = Reflect.set(r, e, t);
    return o.add(t), o.next({
      operate: "add",
      path: "",
      key: e,
      value: t,
      symbol: e
    }), n;
  } else {
    const n = Reflect.set(r, e, t);
    return o.remove(t.vid), o.add(t), o.next({
      operate: "set",
      path: "",
      key: e,
      value: t,
      symbol: e
    }), n;
  }
}, ee = function(r, e, t) {
  if (typeof e == "symbol")
    return Reflect.deleteProperty(r, e);
  const s = r[e], o = Reflect.deleteProperty(r, e);
  return t.next({
    operate: "delete",
    path: "",
    key: e,
    value: s,
    symbol: e
  }), t.remove(s.vid), o;
};
class Ne extends re {
  constructor() {
    super(), this.subscriptions = /* @__PURE__ */ new Map();
    const e = h.proxy.expand ? (t = {}) => h.proxy.expand(t) : (t = {}) => t;
    h.proxy.timing === "before" ? this.space = new Proxy(e(), {
      get: Y,
      set: (t, s, o, n) => _(t, s, o, n, this),
      deleteProperty: (t, s) => ee(t, s, this)
    }) : this.space = e(
      new Proxy(
        {},
        {
          get: Y,
          set: (t, s, o, n) => _(t, s, o, n, this),
          deleteProperty: (t, s) => ee(t, s, this)
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
const M = (r, e) => e === 1 / 0 ? "Infinity" : e === -1 / 0 ? "-Infinity" : e, F = (r, e) => e === "Infinity" ? 1 / 0 : e === "-Infinity" ? -1 / 0 : e, x = (r) => JSON.parse(JSON.stringify(r, M), F), O = {
  stringify: M,
  parse: F,
  clone: x
}, St = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  clone: x,
  default: O,
  parse: F,
  stringify: M
}, Symbol.toStringTag, { value: "Module" })), f = function(r, e, t = {
  observer: !0,
  strict: !0,
  warn: !0
}) {
  if (t.observer === void 0 && (t.observer = !0), t.strict === void 0 && (t.strict = !0), t.warn === void 0 && (t.warn = !0), t.handler === void 0 && (t.handler = h.proxy.expand), !K[r])
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
  let o = K[r]();
  if (o.vid === "" && (o.vid = h.symbol.generator()), e && s(o, e), t.observer === !1)
    return o;
  t.handler && h.proxy.timing === "before" && (o = t.handler(o));
  let n = Ue(o);
  if (t.handler && h.proxy.timing === "after" && (n = t.handler(n)), f.autoInject && f.injectEngine) {
    const i = f.injectEngine;
    if (i.applyConfig(n), f.injectScene && Ae(o.type) && o.type !== ie.SCENE) {
      let a = null;
      typeof f.injectScene == "boolean" ? a = i.getObjectConfig(i.scene) : typeof f.injectScene == "string" && (a = i.getConfigBySymbol(f.injectScene)), a ? a.children.push(
        o.vid
      ) : console.warn(
        "current engine scene can not found it config",
        i,
        i.scene
      );
    }
    return n;
  }
  return n;
};
f.autoInject = !0;
f.injectScene = !1;
f.injectEngine = null;
const le = (r, e = {}) => {
  let t = JSON.stringify(r, O.stringify);
  const s = {};
  !e.filter && (e.filter = ["assets"]);
  const o = Object.keys(r).filter(
    (i) => !e.filter.includes(i)
  );
  for (const i of o)
    for (const a of r[i]) {
      const c = a.vid, l = He();
      t = t.replace(new RegExp(c, "g"), l), e.detail && (s[c] = l);
    }
  const n = JSON.parse(t, O.parse);
  if (e.fillName)
    if (typeof e.fillName == "function")
      for (const i of o)
        for (const a of n[i])
          a.name || (a.name = e.fillName(a));
    else
      for (const i of o)
        for (const a of n[i])
          a.name || (a.name = `${a.type}-${a.vid.slice(-2)}`);
  return e.detail ? { config: n, detail: s } : n;
}, V = (r, e, t = {
  filter: ["assets"],
  clone: !0
}) => {
  const s = t.clone ? O.clone(r) : r;
  !t.filter && (t.filter = ["assets"]);
  const o = Object.keys(s).filter(
    (n) => !t.filter.includes(n)
  );
  for (const n of o)
    s[n].forEach((a, c, l) => {
      l[c] = e(a);
    });
  return s;
}, ue = function(r) {
  const e = {};
  for (const t of Object.keys(r))
    for (const s of r[t])
      e[s.name] = s;
  return e;
}, pe = function(r, e) {
  return typeof r == "string" && (r = JSON.parse(r, O.parse)), V(O.clone(r), (t) => (t = f(t.type, t, { strict: !1 }), e ? e(t) : t));
}, Te = {
  clone: le,
  handler: V,
  planish: ue,
  observable: pe
}, xt = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  clone: le,
  default: Te,
  handler: V,
  observable: pe,
  planish: ue
}, Symbol.toStringTag, { value: "Module" }));
class Le {
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
        const o = [];
        for (const n of this.list)
          n(!1) || o.push(n);
        if (o.length)
          if (o.length === t) {
            for (const n of o)
              n(!0);
            this.list = [];
          } else
            t = o.length, this.list = o, s();
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
const Et = new Le();
class $e {
  constructor(e) {
    this.MODULE = "", this.container = new Ne(), this.ruler = e.ruler, this.MODULE = e.module, this.container.subscribe((t) => {
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
    return JSON.stringify(e ? this.exportConfig() : Object.values(this.container.space), M);
  }
  /**
   * 导出配置单
   * @param compress 是否压缩配置单 default true
   * @returns config
   */
  exportConfig(e = !0) {
    if (e) {
      const t = this.container.space, s = [], o = {}, n = (i, a, c = {}) => {
        for (const l in i) {
          if (["vid", "type"].includes(l)) {
            c[l] = i[l];
            continue;
          }
          if (typeof i[l] == "object" && i[l] !== null) {
            if (Array.isArray(i[l])) {
              if (!i[l].length)
                continue;
              c[l] = i[l].map((p) => typeof p == "object" && p !== null ? x(p) : p);
              continue;
            }
            c[l] = {}, a[l] ? (n(i[l], a[l], c[l]), Object.keys(c[l]).length === 0 && delete c[l]) : c[l] = x(i[l]);
          } else
            a[l] !== i[l] && (c[l] = i[l]);
        }
      };
      for (const i of Object.values(t)) {
        if (!o[i.type]) {
          if (!m[i.type]) {
            console.error(`can not font some config with: ${i.type}`);
            continue;
          }
          o[i.type] = m[i.type]();
        }
        const a = {};
        n(i, o[i.type], a), s.push(a);
      }
      return s;
    } else
      return Object.values(x(this.container.space));
  }
  /**
   * 加载配置
   * @param configs this module configs
   * @returns true
   */
  load(e) {
    const t = this.container.space, s = {}, o = (n, i) => {
      for (const a in i)
        typeof n[a] == "object" && n[a] !== null && typeof i[a] == "object" && i[a] !== null ? o(n[a], i[a]) : n[a] === void 0 && (n[a] = i[a]);
    };
    for (const n of e) {
      if (!s[n.type]) {
        if (!m[n.type]) {
          console.error(`can not font some config with: ${n.type}`);
          continue;
        }
        s[n.type] = m[n.type]();
      }
      o(n, s[n.type]), t[n.vid] = n;
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
const Be = [
  "push",
  "pop",
  "shift",
  "unshift",
  "splice",
  "sort",
  "reverse"
], S = /* @__PURE__ */ new WeakSet(), Ie = function(r, e, t) {
  return Array.isArray(r) && Be.includes(e) && S.add(r), Reflect.get(r, e, t);
}, Ge = function(r, e, t, s) {
  const o = U(r), n = P(r);
  if (typeof e == "symbol" || n.ignore(te(o, e)))
    return Reflect.set(r, e, t, s);
  if (v(t) && !ce(t) && (t = D(n, t, r, e)), r[e] === void 0) {
    v(t) && (t[Symbol.for(y)] = e, g(t) && w(t)), g(r) && S.delete(r);
    const c = Reflect.set(r, e, t);
    return g(r) && w(r), n.next({
      operate: "add",
      path: o,
      key: e,
      value: t
    }), c;
  }
  const i = r[e], a = Reflect.set(r, e, t);
  if (g(r)) {
    if (S.has(r) && e === "length") {
      const c = De(r);
      if (!c)
        return Array.isArray(i) && console.error("array value is not be cached:", r), a;
      Re(r);
      const l = Math.abs(c.length - r.length), p = c.length >= r.length ? "delete" : "add", he = c.length >= r.length ? r : c;
      let q = 0, Z = 0;
      for (const X of p === "delete" ? c : r) {
        if (!he.includes(X) && (n.next({
          operate: p,
          path: o,
          key: Z.toString(),
          value: X
        }), q += 1, q === l))
          break;
        Z += 1;
      }
      return w(r), S.delete(r), a;
    } else if (S.has(r) || e === "length")
      return a;
  }
  return n.next({
    operate: "set",
    path: o,
    key: e,
    value: t
  }), a;
}, ke = function(r, e) {
  const t = U(r), s = P(r);
  if (typeof e == "symbol" || s.ignore(t))
    return Reflect.deleteProperty(r, e);
  const o = r[e], n = Reflect.deleteProperty(r, e);
  return g(r) || s.next({
    operate: "delete",
    path: t,
    key: e,
    value: o
  }), n;
}, Je = {
  get: Ie,
  set: Ge,
  deleteProperty: ke
}, D = function(r, e, t, s) {
  if (!v(e) || ce(e))
    return e;
  const o = t ? U(t) : "";
  if (r.ignore(o))
    return e;
  t && (e[Symbol.for($)] = t), e[Symbol.for(J)] = r;
  for (const i in e) {
    const a = te(o, i);
    if (!r.ignore(a) && v(e[i])) {
      if (g(e[i])) {
        const c = e[i];
        e[i] = D(
          r,
          e[i],
          e
        ), w(c);
      } else
        e[i] = D(
          r,
          e[i],
          e
        );
      e[i][Symbol.for(y)] = i;
    }
  }
  return s && (e[Symbol.for(y)] = s), new Proxy(e, Je);
}, E = class E extends re {
  constructor(e) {
    super(), this.disable = !1, this.target = D(this, e);
  }
  ignore(e) {
    const t = e.indexOf(".");
    return t === -1 ? E.IGNORE[e] : E.IGNORE[e.slice(0, t)];
  }
  next(e) {
    if (this.disable)
      return;
    super.next(e);
    const t = je(this.target);
    t && t.emit(d.NOTICED);
  }
};
E.IGNORE = {
  vid: !0,
  type: !0,
  alias: !0,
  meta: !0
};
let I = E;
const Ue = function(r) {
  return new I(r).target;
}, vt = function(r, e) {
  const t = P(r);
  if (!t) {
    console.warn("this object can not found it observer:", r);
    return;
  }
  t.disable = !0, e(), t.disable = !1;
}, b = {
  SYMBOL_VALIDATOR(r) {
    return !h.symbol.validator(r.symbol);
  },
  OPERATE_ADD({ operate: r, path: e, symbol: t, key: s, value: o }, n) {
    return r === "add" && !e.length && t === s ? (n.add(o), !1) : !0;
  },
  OPERATE_DELETE({ operate: r, path: e, value: t }, s) {
    return r === "delete" && !e.length ? (s.remove(t), !1) : !0;
  },
  OPERATE_COVER({ operate: r, path: e, value: t, key: s, symbol: o }, n) {
    return r === "set" && !e.length && s === o ? (n.cover(t), !1) : !0;
  },
  OPERATE_COMPILE(r, e) {
    return e.compile(r.symbol, r), !1;
  }
};
class Fe {
  constructor(e) {
    this.rules = [], this.pointer = null, e ? this.rules = e : this.rules.push(
      b.SYMBOL_VALIDATOR,
      b.OPERATE_ADD,
      b.OPERATE_DELETE,
      b.OPERATE_COVER,
      b.OPERATE_COMPILE
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
const Ct = function(r) {
  return r;
}, Ve = function() {
  return {
    vid: "",
    type: "",
    name: "",
    alias: "",
    meta: {}
  };
}, wt = Ve, At = function(r) {
  return `DEFUALT-${r}`;
}, He = function() {
  return h.symbol.generator();
}, Dt = function() {
};
class We {
  constructor(e) {
    this.type = "", this.module = e, this.type = e.type, this.ruler = new Fe(e.rule), this.compiler = e.compiler ? new e.compiler({
      module: e.type,
      models: e.models
    }) : new Pe({
      module: e.type,
      models: e.models
    }), this.converter = new $e({
      module: e.type,
      ruler: this.ruler
    }).addCompiler(this.compiler);
  }
}
const Rt = function(r) {
  return r;
};
class ze extends R {
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
    var o;
    return this.compilerMap.has(e) ? ((o = this.compilerMap.get(e).map.get(t)) == null ? void 0 : o.puppet) || null : (console.warn(`compiler manager can not found this module: ${e}`), null);
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
    var s;
    Array.isArray(e) || (e = Object.keys(e));
    for (const o of e) {
      if (!this.compilerMap.has(o)) {
        console.warn(`compiler manager can not found this module: ${o}`);
        continue;
      }
      const n = this.compilerMap.get(o);
      if (n.map.has(t))
        return (s = n.map.get(t)) == null ? void 0 : s.puppet;
    }
    return null;
  }
  dispose() {
    for (const e of this.compilerMap.values())
      e.dispose();
    return this.compilerMap.clear(), this;
  }
}
const H = "CompilerManagerPlugin", qe = function() {
  return {
    name: H,
    install(r) {
      const e = new ze();
      r.compilerManager = e, r.getObjectSymbol = function(t) {
        return e.getObjectSymbol(t);
      }, r.getObjectBySymbol = function(t) {
        return e.getObjectBySymbol(t);
      }, r.getObjectfromModule = function(t, s) {
        return e.getObjectfromModule(t, s);
      }, r.getObjectfromModules = function(t, s) {
        return e.getObjectfromModules(t, s);
      }, r.getObject3D = function(t) {
        return e.getObjectfromModules(Ce, t);
      };
    },
    dispose(r) {
      r.compilerManager.dispose(), delete r.compilerManager, delete r.getObjectSymbol, delete r.getObjectBySymbol, delete r.getObjectfromModule, delete r.getObjectfromModules, delete r.getObject3D;
    }
  };
};
class Ze extends R {
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
      const o = s.getConfig(e);
      if (o)
        return o;
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
      const n = this.dataSupportMap.get(s).getConfig(t);
      if (n)
        return n;
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
      const s = k(t.type);
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
    return this.dataSupportMap.forEach((s, o) => {
      e[o] && s.load(e[o]);
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
    return this.dataSupportMap.forEach((s, o) => {
      e[o] && s.remove(e[o]);
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
      M
    );
  }
  /**
   * 导出配置单
   * @param extendsConfig 拓展配置对象
   * @param compress 是否压缩配置单 default true
   * @returns LoadOptions
   */
  exportConfig(e = {}, t = !0) {
    return this.dataSupportMap.forEach((o, n) => {
      e[n] = o.exportConfig(t);
    }), e;
  }
}
const N = "DataSupportManagerPlugin", Xe = function() {
  return {
    name: N,
    install(r) {
      const e = new Ze();
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
class Ke {
}
class W extends Ke {
  constructor() {
    super(...arguments), this.selector = (e, t, s) => s.get(W) || null;
  }
  parse({ url: e, resource: t, configMap: s, resourceMap: o }) {
    o.set(e, t);
  }
}
var z = /* @__PURE__ */ ((r) => (r.MAPPED = "mapped", r))(z || {});
class Qe extends R {
  constructor(e = {}) {
    super(), this.configMap = /* @__PURE__ */ new Map(), this.resourceMap = /* @__PURE__ */ new Map(), this.paserMap = /* @__PURE__ */ new Map(), this.defalutParser = new W();
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
    const s = this.configMap, o = this.resourceMap, n = [...this.paserMap.values()], i = {};
    for (const [a, c] of e.entries()) {
      if (t != null && t.parser && t.parser[a]) {
        t.parser[a].parse({
          url: a,
          resource: c,
          configMap: s,
          resourceMap: o
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
          resourceMap: o
        }), i[a] = this.getResourceConfig(a);
        continue;
      }
      let l = null;
      for (const p of n)
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
          resourceMap: o
        });
        continue;
      }
      l.parse({
        url: a,
        resource: c,
        configMap: s,
        resourceMap: o
      }), i[a] = this.getResourceConfig(a);
    }
    return this.dispatchEvent({
      type: "mapped",
      configMap: s,
      resourceMap: o,
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
    return [...t.keys()].filter((o) => o.startsWith(e)).forEach((o) => {
      const n = t.get(o);
      if (!n)
        console.error(`unknow error: can not found config by url: ${o}`);
      else {
        const i = k(n.type);
        i ? (!s[i] && (s[i] = []), s[i].push(n)) : console.error(
          `unknow error: can not found module by type: ${n.type}`,
          n
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
    return [...t.keys()].filter((o) => o.startsWith(e)).forEach((o) => {
      t.delete(o);
      const n = s.get(o);
      n.dispose && n.dispose(), s.delete(o);
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
const fe = "ResourceManagerPlugin", Ye = function(r = {}) {
  return {
    name: fe,
    install(e) {
      const t = new Qe(r.resources);
      e.resourceManager = t, e.registerResources = (s) => {
        const o = /* @__PURE__ */ new Map();
        return Object.keys(s).forEach((n) => {
          o.set(n, s[n]);
        }), t.mappingResource(o), e;
      };
    },
    dispose(e) {
      e.addEventListener(ge.DISPOSE, () => {
        e.resourceManager.dispose();
      });
    }
  };
}, _e = "LoaderDataSupportStrategy", et = function() {
  let r, e;
  return {
    name: _e,
    condition: [N, se],
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
}, tt = "LoaderMappingStrategy", rt = function() {
  let r, e;
  return {
    name: tt,
    condition: [fe, se],
    exec(t) {
      r = t.loadResources, t.loadResources = (s, o) => {
        const n = (i) => {
          o(void 0, i), t.resourceManager.removeEventListener(
            T.LOADED,
            n
          );
        };
        try {
          t.resourceManager.addEventListener(
            T.LOADED,
            n
          );
        } catch (i) {
          o(i);
        }
        return t.loaderManager.reset().load(s), t;
      }, e = t.loadResourcesAsync, t.loadResourcesAsync = (s) => new Promise((o, n) => {
        try {
          t.loaderManager.once(
            T.LOADED,
            (i) => {
              t.resourceManager.once(
                z.MAPPED,
                (c) => {
                  o(c);
                }
              );
              const a = /* @__PURE__ */ new Map();
              s.forEach((c) => {
                typeof c == "string" ? a.set(c, i.resourceMap.get(c)) : a.set(c.url, i.resourceMap.get(c.url));
              }), t.resourceManager.mappingResource(a);
            }
          );
        } catch (i) {
          n(i);
        }
        t.loaderManager.reset().load(s);
      });
    },
    rollback(t) {
      t.loadResources = r, t.loadResourcesAsync = e;
    }
  };
}, st = "CompilerSupportStrategy", ot = function() {
  return {
    name: st,
    condition: [H, N],
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
class nt {
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
const it = new nt((r) => !!j[r]);
var at = /* @__PURE__ */ ((r) => (r[r.ZERO = 0] = "ZERO", r[r.ONE = 100] = "ONE", r[r.TWO = 200] = "TWO", r[r.THREE = 300] = "THREE", r[r.FOUR = 400] = "FOUR", r[r.FIVE = 500] = "FIVE", r[r.SIX = 600] = "SIX", r[r.SEVEN = 700] = "SEVEN", r[r.EIGHT = 800] = "EIGHT", r[r.NINE = 900] = "NINE", r))(at || {});
class ct extends me {
  constructor(e = {}) {
    super(), this.moduleLifeCycle = [], this.triggers = { object: it }, this.install(Me(e.LoaderManagerPlugin)).install(Oe(e.PointerManagerPlugin)).install(be(e.EventManagerPlugin)).install(Se(e.RenderManagerPlugin)).install(Ye(e.ResourceManagerPlugin)).install(Xe(e.DataSupportManagerPlugin)).install(qe(e.CompilerManagerPlugin)), this.exec(et()).exec(rt()).exec(ot());
  }
  loadLifeCycle(e) {
    const t = this.dataSupportManager, s = this.triggers, o = this.moduleLifeCycle.sort((n, i) => n.order - i.order);
    for (const { module: n } of o) {
      e[n] && t.loadByModule(e[n], n);
      for (const i in s)
        s[i].reach(n);
    }
  }
  removeLifeCycle(e) {
    const t = this.dataSupportManager, s = this.moduleLifeCycle.sort((a, c) => c.order - a.order);
    for (const { module: a } of s)
      e[a] && t.remove({ [a]: e[a] });
    const o = e.assets || [], n = this.resourceManager, i = this.loaderManager;
    o.forEach((a) => {
      n.remove(a), i.remove(a);
    });
  }
  loadConfig(e, t) {
    const s = this.renderManager.hasRendering();
    if (s && this.renderManager.stop(), e.assets && e.assets.length) {
      const o = (n) => {
        delete e.assets, this.loadLifeCycle(e), this.resourceManager.removeEventListener("mapped", o), t && t(n), s ? this.renderManager.play() : this.renderManager.render();
      };
      this.resourceManager.addEventListener("mapped", o), this.loaderManager.reset().load(e.assets);
    } else
      this.loadLifeCycle(e), t && t(), s ? this.renderManager.play() : this.renderManager.render();
    return this;
  }
  loadConfigAsync(e, t) {
    return new Promise((s, o) => {
      const n = this.renderManager.hasRendering();
      n && this.renderManager.stop(), e.assets && e.assets.length ? this.loadResourcesAsync(e.assets).then((i) => {
        delete e.assets, this.loadLifeCycle(e), n ? this.renderManager.play() : this.renderManager.render(), s(i);
      }) : (this.loadLifeCycle(e), n ? this.renderManager.play() : this.renderManager.render(), s({
        type: z.MAPPED,
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
    const t = oe(e.type);
    if (L[t])
      return console.warn(`Engine:module ${e.type} is already exist.`), this;
    L[t] = e.type, e.object && (j[e.type] = !0);
    const s = new We(e);
    return s.compiler.useEngine(this), this.dataSupportManager.extend(s.converter), this.compilerManager.extend(s.compiler), e.extend && e.extend(this), this.moduleLifeCycle.push({
      module: e.type,
      order: e.lifeOrder || 0
    }), Object.values(this.triggers).forEach((o) => {
      o.add(e.type);
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
const jt = function(r, e = {}) {
  const t = new ct(e);
  return r.modules && r.modules.forEach((s) => {
    t.useModule(s);
  }), r.plugins && r.plugins.forEach((s) => {
    t.install(s);
  }), r.strategy && r.strategy.forEach((s) => {
    t.exec(s);
  }), t;
}, Pt = (r) => {
  C.exec(r);
}, Nt = () => {
}, Tt = [H, N];
export {
  Le as AntiShake,
  H as COMPILER_MANAGER_PLUGIN,
  st as COMPILER_SUPPORT_STRATEGY,
  K as CONFIGFACTORY,
  Mt as CONFIGMODULE,
  ie as CONFIGTYPE,
  m as CONFIG_FACTORY,
  ve as CONFIG_MODEL,
  G as CONFIG_MODULE,
  ne as CONFIG_TYPE,
  Pe as Compiler,
  ze as CompilerManager,
  qe as CompilerManagerPlugin,
  ot as CompilerSupportStrategy,
  Ne as Container,
  $e as Converter,
  N as DATA_SUPPORT_MANAGER_PLUGIN,
  b as DEFAULT_RULE,
  Ze as DataSupportManager,
  Xe as DataSupportManagerPlugin,
  W as DefaultParser,
  ct as EngineSupport,
  St as JSONHandler,
  _e as LOADER_DATA_SUPPORT_STRATEGY,
  tt as LOADER_MAPPING_STRATEGY,
  et as LoaderDataSupportStrategy,
  rt as LoaderMappingStrategy,
  d as MODEL_EVENT,
  yt as MODULETYPE,
  L as MODULE_TYPE,
  Q as Model,
  We as Moduler,
  Ce as OBJECTMODULE,
  j as OBJECT_MODULE,
  Tt as PLUGINS,
  Ke as Parser,
  z as RESOURCE_EVENT,
  fe as RESOURCE_MANAGER_PLUGIN,
  Qe as ResourceManager,
  Ye as ResourceManagerPlugin,
  Fe as Ruler,
  at as SUPPORT_LIFE_CYCLE,
  xt as Template,
  He as createSymbol,
  jt as defineEngineSupport,
  A as defineModel,
  Rt as defineModule,
  bt as defineOption,
  Ot as defineProcessor,
  Ct as defineRule,
  Dt as emptyHandler,
  f as generateConfig,
  Ve as getBasicConfig,
  k as getModule,
  P as getObserver,
  wt as getSymbolConfig,
  Et as globalAntiShake,
  h as globalOption,
  we as isObjectModule,
  Ae as isObjectType,
  Ue as observable,
  vt as slientSync,
  Pt as toAsync,
  Nt as toTrigger,
  At as uniqueSymbol
};
