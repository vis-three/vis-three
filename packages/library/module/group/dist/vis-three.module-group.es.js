import { Vector2 as u, Loader as b, Cache as f, Group as O } from "three";
import "three/examples/jsm/lights/RectAreaLightUniformsLib.js";
import "three/examples/jsm/loaders/OBJLoader";
import "three/examples/jsm/loaders/MTLLoader";
import "three/examples/jsm/loaders/RGBELoader";
import "three/examples/jsm/loaders/GLTFLoader";
import "three/examples/jsm/loaders/FBXLoader";
import "three/examples/jsm/loaders/DRACOLoader";
import "three/examples/jsm/loaders/KTX2Loader.js";
import "three/examples/jsm/loaders/DDSLoader.js";
import "three/examples/jsm/libs/meshopt_decoder.module.js";
import "three/examples/jsm/loaders/LUTCubeLoader";
import "three/examples/jsm/loaders/LUT3dlLoader";
import { getObjectConfig as E, ObjectRule as w, defineObjectModel as I } from "@vis-three/module-object";
const g = function(e) {
  let t = e.split("/").pop();
  if (!t)
    return e;
  const n = t.split("-");
  return n.push(n[0]), n.shift(), n.reduce((a, o) => a += o[0].toUpperCase() + o.slice(1), "");
};
new u();
new u();
new u();
new u();
new u();
new u();
const L = "0.7.0";
window.__THREE__ || console.error(
  "vis-three dependent on three.js module, pleace run 'npm i three' first."
);
window.__VIS__ ? console.warn("Duplicate vis-three frames are introduced") : window.__VIS__ = L;
var R = Object.defineProperty, P = (e, t, n) => t in e ? R(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n, l = (e, t, n) => (P(e, typeof t != "symbol" ? t + "" : t, n), n);
const m = class extends b {
  constructor(e) {
    super(e);
  }
  load(e, t, n, a) {
    this.path !== void 0 && (e = this.path + e), this.manager.itemStart(e), e = this.manager.resolveURL(e);
    const o = f.get(e);
    if (o !== void 0)
      return setTimeout(() => {
        t && t(o), this.manager.itemEnd(e);
      }, 0), o;
    const r = document.createElement("video");
    return r.preload = m.preload, r.autoplay = m.autoplay, r.loop = m.loop, r.muted = m.muted, r.src = e, r.style.position = "fixed", r.style.top = "0", r.style.left = "0", r.style.zIndex = "-1", document.body.appendChild(r), r.oncanplay = () => {
      f.add(e, r), this.manager.itemEnd(e), t && t(r);
    }, r.onerror = (s) => {
      this.manager.itemEnd(e), a && a(s);
    }, r;
  }
};
let d = m;
l(d, "autoplay", !0);
l(d, "preload", "auto");
l(d, "muted", !0);
l(d, "loop", !0);
const C = "@vis-three/plugin-loader-manager";
g(C);
const S = "@vis-three/plugin-pointer-manager";
g(S);
var y;
(function(e) {
  e.POINTERDOWN = "pointerdown", e.POINTERUP = "pointerup", e.POINTERMOVE = "pointermove", e.POINTERENTER = "pointerenter", e.POINTERLEAVE = "pointerleave", e.CLICK = "click", e.DBLCLICK = "dblclick", e.CONTEXTMENU = "contextmenu";
})(y || (y = {}));
const T = "@vis-three/plugin-event-manager";
g(T);
var h;
(function(e) {
  e.RENDER = "render", e.PLAY = "play", e.STOP = "stop";
})(h || (h = {}));
const N = "@vis-three/plugin-render-manager";
g(N);
const j = function(e) {
  return e;
};
var v = /* @__PURE__ */ ((e) => (e[e.ZERO = 0] = "ZERO", e[e.ONE = 100] = "ONE", e[e.TWO = 200] = "TWO", e[e.THREE = 300] = "THREE", e[e.FOUR = 400] = "FOUR", e[e.FIVE = 500] = "FIVE", e[e.SIX = 600] = "SIX", e[e.SEVEN = 700] = "SEVEN", e[e.EIGHT = 800] = "EIGHT", e[e.NINE = 900] = "NINE", e))(v || {});
const c = class i {
  static generateConfig(t, n) {
    if (!i.configLibrary.has(t))
      return console.warn(`event library can not found config by name: ${t}`), null;
    const a = (r, s) => {
      for (const p in s)
        typeof s[p] == "object" && s[p] !== null && !Array.isArray(s[p]) ? a(r[p], s[p]) : r[p] = s[p];
    }, o = JSON.parse(
      JSON.stringify(i.configLibrary.get(t))
    );
    return a(o, n), o;
  }
  static generateEvent(t, n) {
    return i.generatorLibrary.has(t.name) ? i.generatorLibrary.get(t.name)(
      n,
      t
    ) : (console.error(
      `event library can not found generator by name: ${t.name}`
    ), () => {
    });
  }
  static has(t) {
    return i.configLibrary.has(t);
  }
  static useEngine(t) {
    i.engine = t;
  }
  static createEvent(t, n, a) {
    if (!i.engine && !a)
      return console.error(
        "EventGenerator Manager createEvent must provide an engine, you can use 'useEngine' to set it."
      ), null;
    const o = i.generateConfig(t, n);
    return o ? i.generateEvent(
      o,
      a || i.engine
    ) : null;
  }
};
c.configLibrary = /* @__PURE__ */ new Map(), c.generatorLibrary = /* @__PURE__ */ new Map(), c.register = function({
  config: e,
  generator: t
}) {
  return c.configLibrary.has(e.name) ? (console.warn(
    `EventGeneratorManager has already exist this event generator: ${e.name}, that will be cover.`
  ), c) : (c.configLibrary.set(
    e.name,
    JSON.parse(JSON.stringify(e))
  ), c.generatorLibrary.set(e.name, t), c);
};
const _ = function() {
  return Object.assign(E(), {
    children: []
  });
}, B = j({
  type: "group",
  object: !0,
  rule: w,
  models: [
    I((e) => ({
      type: "Object3D",
      config: _,
      create({ model: t, config: n, engine: a }) {
        const o = new O();
        return e.create({
          model: t,
          target: o,
          config: n,
          filter: {},
          engine: a
        }), o;
      },
      dispose({ target: t }) {
        e.dispose({ target: t });
      }
    }))
  ],
  lifeOrder: v.THREE
});
export {
  B as default,
  _ as getGroupConfig
};
