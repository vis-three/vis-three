import { getBasicConfig as h, defineRule as O, DEFAULT_RULE as y, defineModel as M, emptyHandler as x, EVENTNAME as A, OBJECT_MODULE as m, MODEL_EVENT as E } from "@vis-three/tdcm";
import { syncObject as L } from "@vis-three/utils";
const C = function() {
  return Object.assign(h(), {
    type: "Object3D",
    castShadow: !0,
    receiveShadow: !0,
    lookAt: "",
    visible: !0,
    raycast: !0,
    matrixAutoUpdate: !0,
    renderOrder: 0,
    position: {
      x: 0,
      y: 0,
      z: 0
    },
    rotation: {
      x: 0,
      y: 0,
      z: 0
    },
    scale: {
      x: 1,
      y: 1,
      z: 1
    },
    up: {
      x: 0,
      y: 1,
      z: 0
    },
    parent: "",
    children: [],
    pointerdown: [],
    pointermove: [],
    pointerup: [],
    pointerenter: [],
    pointerleave: [],
    click: [],
    dblclick: [],
    contextmenu: []
  });
}, T = O([
  function(t) {
    return t.key !== "parent";
  },
  y.SYMBOL_VALIDATOR,
  y.OPERATE_ADD,
  y.OPERATE_DELETE,
  y.OPERATE_COVER,
  y.OPERATE_COMPILE
]), s = class s {
  static generateConfig(e, r) {
    if (!s.configLibrary.has(e))
      return console.warn(`event library can not found config by name: ${e}`), null;
    const n = (o, i) => {
      for (const a in i)
        typeof i[a] == "object" && i[a] !== null && !Array.isArray(i[a]) ? n(o[a], i[a]) : o[a] = i[a];
    }, c = JSON.parse(
      JSON.stringify(s.configLibrary.get(e))
    );
    return n(c, r), c;
  }
  static generateEvent(e, r) {
    return s.generatorLibrary.has(e.name) ? s.generatorLibrary.get(e.name)(r, e) : (console.error(
      `event library can not found generator by name: ${e.name}`
    ), () => {
    });
  }
  static has(e) {
    return s.configLibrary.has(e);
  }
  static useEngine(e) {
    s.engine = e;
  }
  static createEvent(e, r, n) {
    if (!s.engine && !n)
      return console.error(
        "EventGenerator Manager createEvent must provide an engine, you can use 'useEngine' to set it."
      ), null;
    const c = s.generateConfig(e, r);
    return c ? s.generateEvent(c, n || s.engine) : null;
  }
};
s.configLibrary = /* @__PURE__ */ new Map(), s.generatorLibrary = /* @__PURE__ */ new Map(), s.register = function({
  config: e,
  generator: r
}) {
  return s.configLibrary.has(e.name) ? (console.warn(
    `EventManager has already exist this event generator: ${e.name}, that will be cover.`
  ), s) : (s.configLibrary.set(
    e.name,
    JSON.parse(JSON.stringify(e))
  ), s.generatorLibrary.set(e.name, r), s);
};
let b = s;
const g = function({
  model: t,
  target: e,
  config: r,
  value: n,
  engine: c
}) {
  if (r.vid === n) {
    console.warn("can not set object lookAt itself.");
    return;
  }
  const o = t.cacheLookAt;
  if (!n) {
    if (!o.updateMatrixWorld)
      return;
    e.updateMatrixWorld = o.updateMatrixWorld, o.target = null, o.updateMatrixWorld = null;
    return;
  }
  t.toAsync((i) => {
    const a = c.compilerManager.getObjectFromModules(
      m,
      n
    );
    if (!a)
      return i && console.warn(
        `lookAt handler can not found this vid mapping object: '${n}'`
      ), !1;
    const u = e.updateMatrixWorld;
    return o.updateMatrixWorld = u, o.target = a.position, e.updateMatrixWorld = (p) => {
      u.call(e, p), e.lookAt(o.target);
    }, !0;
  });
}, l = function({
  model: t,
  path: e,
  value: r,
  engine: n,
  target: c
}) {
  const o = e[0];
  if (!b.has(r.name)) {
    console.warn(
      `EventManager: can not support this event: ${r.name}`
    );
    return;
  }
  const i = b.generateEvent(r, n), a = Symbol.for(t.eventSymbol);
  r[a] = i, c.addEventListener(o, i);
}, d = function({
  model: t,
  target: e,
  path: r,
  value: n
}) {
  const c = r[0], o = n[Symbol.for(t.eventSymbol)];
  if (!o) {
    console.warn("event remove can not fun found event in config", n);
    return;
  }
  e.removeEventListener(c, o), delete n[Symbol.for(t.eventSymbol)];
}, f = function({
  model: t,
  target: e,
  config: r,
  path: n,
  engine: c
}) {
  if (n.length < 2)
    return;
  const o = n[0], i = r[n[0]][n[1]], a = i[Symbol.for(t.eventSymbol)];
  if (!a) {
    console.warn("event remove can not fun found event in config", i);
    return;
  }
  e.removeEventListener(o, a);
  const u = b.generateEvent(i, c);
  i[Symbol.for(t.eventSymbol)] = u, e.addEventListener(o, u);
}, v = function({
  model: t,
  target: e,
  config: r,
  value: n,
  engine: c
}) {
  t.toTrigger("object", (o) => {
    var u;
    const i = t.toConfig(n);
    if (!i)
      return o || console.warn(` can not foud object config in engine: ${n}`), !1;
    if (i.parent && i.parent !== r.vid) {
      const p = t.toConfig(i.parent);
      if (!p)
        return o || console.warn(
          ` can not foud object parent config in engine: ${i.parent}`
        ), !1;
      p.children.splice(p.children.indexOf(n), 1);
    }
    i.parent = r.vid;
    const a = c.compilerManager.getObjectFromModules(
      m,
      n
    );
    return a ? (e.add(a), a.updateMatrixWorld(!0), (u = t.toModel(n)) == null || u.emit(`${E.COMPILED_ATTR}:parent`), !0) : (o || console.warn(`can not found this vid in engine: ${n}.`), !1);
  });
}, k = function({
  model: t,
  target: e,
  config: r,
  value: n,
  engine: c
}) {
  var a;
  const o = c.compilerManager.getObjectFromModules(
    m,
    n
  );
  if (!o) {
    console.warn(`can not found this vid in engine: ${n}.`);
    return;
  }
  e.remove(o);
  const i = c.getConfigBySymbol(n);
  if (!i) {
    console.warn(`can not found this vid in engine: ${n}.`);
    return;
  }
  i.parent = "", (a = t.toModel(n)) == null || a.emit(`${E.COMPILED_ATTR}:parent`);
}, w = function({
  model: t,
  target: e,
  config: r,
  value: n,
  engine: c
}) {
  n ? delete e.raycast : e.raycast = t.emptyRaycast;
}, R = M.extend({
  shared: {
    eventSymbol: "vis.event",
    emptyRaycast: () => {
    }
  },
  context() {
    return {
      cacheLookAt: {
        target: null,
        updateMatrixWorld: null
      }
    };
  },
  commands: {
    add: {
      pointerdown: l,
      pointerup: l,
      pointermove: l,
      pointerenter: l,
      pointerleave: l,
      click: l,
      dblclick: l,
      contextmenu: l,
      children: v
    },
    set: {
      lookAt: g,
      pointerdown: f,
      pointerup: f,
      pointermove: f,
      pointerenter: f,
      pointerleave: f,
      click: f,
      dblclick: f,
      contextmenu: f,
      parent: x,
      raycast: w,
      children: {
        $reg: [
          {
            reg: new RegExp(".*"),
            handler: v
          }
        ]
      }
    },
    delete: {
      pointerdown: d,
      pointerup: d,
      pointermove: d,
      pointerenter: d,
      pointerleave: d,
      click: d,
      dblclick: d,
      contextmenu: d,
      children: k
    }
  },
  create({ model: t, target: e, config: r, engine: n, filter: c }) {
    !c.lookAt && g.call(t, {
      model: t,
      target: e,
      config: r,
      value: r.lookAt,
      engine: n
    }), !r.raycast && (e.raycast = t.emptyRaycast), r.children.forEach((o) => {
      v.call(t, {
        target: e,
        config: r,
        value: o,
        engine: n
      });
    });
    for (const o of Object.values(A))
      t.asyncNextTick(() => (r[o].forEach((i, a) => {
        l.call(t, {
          model: t,
          target: e,
          path: [o, a.toString()],
          value: i,
          engine: n
        });
      }), !0));
    L(r, e, {
      vid: !0,
      type: !0,
      lookAt: !0,
      parent: !0,
      children: !0,
      raycast: !0,
      pointerdown: !0,
      pointermove: !0,
      pointerup: !0,
      pointerenter: !0,
      pointerleave: !0,
      click: !0,
      dblclick: !0,
      contextmenu: !0,
      ...c
    });
  },
  dispose({ target: t }) {
    t._listener = {};
  }
});
export {
  b as EventManager,
  T as ObjectRule,
  R as defineObjectModel,
  C as getObjectConfig
};
