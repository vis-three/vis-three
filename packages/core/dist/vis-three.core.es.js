import { PerspectiveCamera as l, Scene as h, OrthographicCamera as c, AmbientLight as u, RectAreaLight as f, HemisphereLight as d } from "three";
import { LightShadow as p } from "three/src/lights/LightShadow.js";
import { RectAreaLightUniformsLib as g } from "three/examples/jsm/lights/RectAreaLightUniformsLib.js";
class m {
  constructor() {
    this.listeners = /* @__PURE__ */ new Map();
  }
  /**
   * 添加事件
   * @param type
   * @param listener
   * @returns
   */
  addEventListener(e, t) {
    const s = this.listeners;
    s.has(e) || s.set(e, []);
    const i = s.get(e);
    i.includes(t) || i.push(t);
  }
  /**
   * 是否有此事件
   * @param type
   * @param listener
   * @returns
   */
  hasEventListener(e, t) {
    const s = this.listeners;
    return s.has(e) ? s.get(e).includes(t) : !1;
  }
  /**
   * 移除事件
   * @param type
   * @param listener
   * @returns
   */
  removeEventListener(e, t) {
    const s = this.listeners;
    if (!s.has(e) || !s.get(e).includes(t))
      return;
    const i = s.get(e);
    i.splice(i.indexOf(t), 1);
  }
  /**
   * 移除该类型的所有事件
   * @param type
   * @returns
   */
  removeEvent(e) {
    const t = this.listeners;
    t.has(e) && t.delete(e);
  }
  /**
   * 触发事件
   * @param event
   */
  dispatchEvent(e) {
    var i;
    const t = e.type, s = this.listeners;
    if (s.has(t))
      try {
        (i = s.get(t)) == null || i.forEach((r) => {
          r.call(this, e);
        });
      } catch (r) {
        console.error(r);
      }
  }
  /**
   * 一次性事件触发
   * @param type
   * @param listener
   */
  once(e, t) {
    const s = function(i) {
      t.call(this, i), Promise.resolve().then(() => {
        this.removeEventListener(e, s);
      });
    };
    this.addEventListener(e, s);
  }
  /**
   * 触发事件
   * @param name
   * @param params
   */
  emit(e, t = {}) {
    var i;
    const s = this.listeners;
    if (s.has(e))
      try {
        (i = s.get(e)) == null || i.forEach((r) => {
          r.call(this, t);
        });
      } catch (r) {
        console.error(r);
      }
  }
  /**
   * 订阅事件
   * @param type
   * @param listener
   */
  on(e, t) {
    this.addEventListener(e, t);
  }
  /**
   * 是否有此事件
   * @param type
   * @param listener
   * @returns
   */
  has(e, t) {
    return this.hasEventListener(e, t);
  }
  /**
   * 移除事件
   * @param type
   * @param listener
   * @returns
   */
  off(e, t) {
    if (t)
      this.removeEventListener(e, t);
    else {
      const s = this.listeners;
      if (!s.has(e))
        return;
      s.delete(e);
    }
  }
  /**
   * 获取事件数量
   * @param type
   * @returns
   */
  eventCount(e) {
    return this.listeners.has(e) ? this.listeners.get(e).length : 0;
  }
  /**
   * 销毁该类型的最后一个事件
   * @param type
   * @returns
   */
  popLatestEvent(e) {
    this.listeners.has(e) && this.listeners.get(e).pop();
  }
  /**
   * 清空所有事件
   */
  clear() {
    this.listeners.clear();
  }
  /**
   * 当前派发器是否使用
   * @returns
   */
  useful() {
    return !![...this.listeners.keys()].length;
  }
}
class v extends m {
  constructor() {
    super(...arguments), this.pluginTables = /* @__PURE__ */ new Map(), this.strategyTables = /* @__PURE__ */ new Map();
  }
  /**
   * 安装插件
   * @param plugin
   * @returns
   */
  install(e) {
    if (this.pluginTables.has(e.name))
      return console.warn("This plugin already exists", e.name), this;
    const t = (s) => this.pluginTables.has(s) ? !0 : (console.error(
      `${e.name} must install this plugin before: ${s}`
    ), !1);
    if (e.deps)
      if (Array.isArray(e.deps))
        for (const s of e.deps)
          t(s);
      else
        t(e.deps);
    return e.install(this), this.pluginTables.set(e.name, e), this;
  }
  /**
   * 卸载插件
   * @param plugin
   * @returns
   */
  uninstall(e) {
    if (!this.pluginTables.has(e))
      return this;
    for (const s of this.strategyTables.values())
      s.condition.includes(e) && (console.info(
        `engine auto rollback strategy: ${s.name} before uninstall plugin: ${e}.`
      ), this.rollback(s.name));
    for (const s of this.pluginTables.values())
      s.deps && (Array.isArray(s.deps) && s.deps.includes(e) || s.deps === e) && (console.info(
        `engine auto uninstall plugin: ${s.name} before uninstall plugin: ${e}.`
      ), this.uninstall(s.name));
    return this.pluginTables.get(e).dispose(this), this.pluginTables.delete(e), this;
  }
  /**
   * 执行策略
   * @returns
   */
  exec(e) {
    const t = this.strategyTables;
    if (t.has(e.name))
      return console.warn("This strategy already exists", e.name), this;
    const s = this.pluginTables;
    for (const i of e.condition)
      if (!s.has(i))
        return console.warn(
          `${e.name} does not meet the conditions for execution: ${i}`
        ), this;
    return e.exec(this), t.set(e.name, e), this;
  }
  /**
   * 回滚策略
   * @returns
   */
  rollback(e) {
    const t = this.strategyTables;
    return t.has(e) ? (t.get(e).rollback(this), t.delete(e), this) : this;
  }
}
var b = /* @__PURE__ */ ((n) => (n.SETDOM = "setDom", n.SETSIZE = "setSize", n.SETCAMERA = "setCamera", n.SETSCENE = "setScene", n.RENDER = "render", n.DISPOSE = "dispose", n))(b || {});
const o = class o extends v {
  constructor() {
    super(), this.dom = document.createElement("div"), this.camera = new l(), this.scene = new h(), o.initFlag || o.init(), this.camera.position.set(50, 50, 50), this.camera.lookAt(0, 0, 0);
  }
  static init() {
    const e = new p(
      new c(-256, 256, 256, -256)
    );
    e.autoUpdate = !1, e.needsUpdate = !1, u.prototype.shadow = e, f.prototype.shadow = e, d.prototype.shadow = e, g.init(), o.initFlag = !0;
  }
  /**
   * 设置输出的dom
   * @param dom HTMLElement
   * @returns this
   */
  setDom(e) {
    return this.dom = e, this.dispatchEvent({
      type: "setDom",
      dom: e
    }), this;
  }
  /**
   * 设置引擎整体尺寸
   * @param width number
   * @param height number
   * @returns this
   */
  setSize(e, t) {
    var s, i;
    return e && e <= 0 || t && t <= 0 ? (console.warn(
      `you must be input width and height bigger then zero, width: ${e}, height: ${t}`
    ), this) : (!e && (e = ((s = this.dom) == null ? void 0 : s.offsetWidth) || window.innerWidth), !t && (t = ((i = this.dom) == null ? void 0 : i.offsetHeight) || window.innerHeight), this.dispatchEvent({ type: "setSize", width: e, height: t }), this);
  }
  /**
   * 设置当前相机
   * @param camera
   * @param options
   * @returns
   */
  setCamera(e, t) {
    return this.dispatchEvent({
      type: "setCamera",
      camera: e,
      oldCamera: this.camera,
      options: Object.assign(
        {
          orbitControls: !0,
          transformControls: !0
        },
        t || {}
      )
    }), this.camera = e, this;
  }
  /**
   * 设置渲染场景
   * @param scene
   * @returns
   */
  setScene(e) {
    return this.dispatchEvent({
      type: "setScene",
      scene: e,
      oldScene: this.scene
    }), this.scene = e, this;
  }
  /**
   * 渲染方法
   * @param delta
   * @returns
   */
  render(e = 0) {
    return this.dispatchEvent({
      type: "render",
      delta: e
    }), this;
  }
  /**
   * 清除引擎缓存
   * @returns this
   */
  dispose() {
    return this.dispatchEvent({
      type: "dispose"
      /* DISPOSE */
    }), this;
  }
};
o.initFlag = !1;
let a = o;
const E = function(n) {
  const e = new a();
  return n.plugins && n.plugins.forEach((t) => {
    e.install(t);
  }), n.strategy && n.strategy.forEach((t) => {
    e.exec(t);
  }), e;
}, T = function(n) {
  return () => n;
}, C = function(n) {
  return () => n;
}, w = "0.7.0";
window.__THREE__ || console.error(
  "vis-three dependent on three.js module, pleace run 'npm i three' first."
);
window.__VIS__ ? console.warn("Duplicate vis-three frames are introduced") : window.__VIS__ = w;
export {
  v as Base,
  b as ENGINE_EVENT,
  a as Engine,
  m as EventDispatcher,
  E as defineEngine,
  T as definePlugin,
  C as defineStrategy
};
