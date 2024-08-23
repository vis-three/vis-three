import { getBasicConfig as h, defineRule as M, DEFAULT_RULE as f, defineModel as g, emptyHandler as O, EVENTNAME as x, OBJECT_MODULE as y, EventGeneratorManager as m, MODEL_EVENT as b } from "@vis-three/tdcm";
import { syncObject as A } from "@vis-three/utils";
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
}, L = M([
  function(n) {
    return n.key !== "parent";
  },
  f.SYMBOL_VALIDATOR,
  f.OPERATE_ADD,
  f.OPERATE_DELETE,
  f.OPERATE_COVER,
  f.OPERATE_COMPILE
]), E = function({
  model: n,
  target: r,
  config: o,
  value: e,
  engine: c
}) {
  if (o.vid === e) {
    console.warn("can not set object lookAt itself.");
    return;
  }
  const t = n.cacheLookAt;
  if (!e) {
    if (!t.updateMatrixWorld)
      return;
    r.updateMatrixWorld = t.updateMatrixWorld, t.target = null, t.updateMatrixWorld = null;
    return;
  }
  n.toAsync((i) => {
    const a = c.compilerManager.getObjectFromModules(
      y,
      e
    );
    if (!a)
      return i && console.warn(
        `lookAt handler can not found this vid mapping object: '${e}'`
      ), !1;
    const s = r.updateMatrixWorld;
    return t.updateMatrixWorld = s, t.target = a.position, r.updateMatrixWorld = (p) => {
      s.call(r, p), r.lookAt(t.target);
    }, !0;
  });
}, l = function({
  model: n,
  path: r,
  value: o,
  engine: e,
  target: c
}) {
  const t = r[0];
  if (!m.has(o.name)) {
    console.warn(
      `EventGeneratorManager: can not support this event: ${o.name}`
    );
    return;
  }
  const i = m.generateEvent(o, e), a = Symbol.for(n.eventSymbol);
  o[a] = i, c.addEventListener(t, i);
}, d = function({
  model: n,
  target: r,
  path: o,
  value: e
}) {
  const c = o[0], t = e[Symbol.for(n.eventSymbol)];
  if (!t) {
    console.warn("event remove can not fun found event in config", e);
    return;
  }
  r.removeEventListener(c, t), delete e[Symbol.for(n.eventSymbol)];
}, u = function({
  model: n,
  target: r,
  config: o,
  path: e,
  engine: c
}) {
  if (e.length < 2)
    return;
  const t = e[0], i = o[e[0]][e[1]], a = i[Symbol.for(n.eventSymbol)];
  if (!a) {
    console.warn("event remove can not fun found event in config", i);
    return;
  }
  r.removeEventListener(t, a);
  const s = m.generateEvent(i, c);
  i[Symbol.for(n.eventSymbol)] = s, r.addEventListener(t, s);
}, v = function({
  model: n,
  target: r,
  config: o,
  value: e,
  engine: c
}) {
  n.toTrigger("object", (t) => {
    var s;
    const i = n.toConfig(e);
    if (!i)
      return t || console.warn(` can not foud object config in engine: ${e}`), !1;
    if (i.parent && i.parent !== o.vid) {
      const p = n.toConfig(i.parent);
      if (!p)
        return t || console.warn(
          ` can not foud object parent config in engine: ${i.parent}`
        ), !1;
      p.children.splice(p.children.indexOf(e), 1);
    }
    i.parent = o.vid;
    const a = c.compilerManager.getObjectFromModules(
      y,
      e
    );
    return a ? (r.add(a), a.updateMatrixWorld(!0), (s = n.toModel(e)) == null || s.emit(`${b.COMPILED_ATTR}:parent`), !0) : (t || console.warn(`can not found this vid in engine: ${e}.`), !1);
  });
}, k = function({
  model: n,
  target: r,
  config: o,
  value: e,
  engine: c
}) {
  var a;
  const t = c.compilerManager.getObjectFromModules(
    y,
    e
  );
  if (!t) {
    console.warn(`can not found this vid in engine: ${e}.`);
    return;
  }
  r.remove(t);
  const i = c.getConfigBySymbol(e);
  if (!i) {
    console.warn(`can not found this vid in engine: ${e}.`);
    return;
  }
  i.parent = "", (a = n.toModel(e)) == null || a.emit(`${b.COMPILED_ATTR}:parent`);
}, w = function({
  model: n,
  target: r,
  config: o,
  value: e,
  engine: c
}) {
  e ? delete r.raycast : r.raycast = n.emptyRaycast;
}, S = g.extend({
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
      lookAt: E,
      pointerdown: u,
      pointerup: u,
      pointermove: u,
      pointerenter: u,
      pointerleave: u,
      click: u,
      dblclick: u,
      contextmenu: u,
      parent: O,
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
  create({ model: n, target: r, config: o, engine: e, filter: c }) {
    !c.lookAt && E.call(n, {
      model: n,
      target: r,
      config: o,
      value: o.lookAt,
      engine: e
    }), !o.raycast && (r.raycast = n.emptyRaycast), o.children.forEach((t) => {
      v.call(n, {
        target: r,
        config: o,
        value: t,
        engine: e
      });
    });
    for (const t of Object.values(x))
      n.asyncNextTick(() => (o[t].forEach((i, a) => {
        l.call(n, {
          model: n,
          target: r,
          path: [t, a.toString()],
          value: i,
          engine: e
        });
      }), !0));
    A(o, r, {
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
  dispose({ target: n }) {
    n._listener = {};
  }
});
export {
  L as ObjectRule,
  S as defineObjectModel,
  C as getObjectConfig
};
