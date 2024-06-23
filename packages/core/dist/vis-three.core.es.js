import { PerspectiveCamera as l, Scene as h } from "three";
import { RectAreaLightUniformsLib as c } from "three/examples/jsm/lights/RectAreaLightUniformsLib.js";
class u {
  constructor() {
    this.listeners = /* @__PURE__ */ new Map();
  }
  /**
   * 添加事件
   * @param type
   * @param listener
   * @returns
   */
  addEventListener(e, s) {
    const t = this.listeners;
    t.has(e) || t.set(e, []);
    const i = t.get(e);
    i.includes(s) || i.push(s);
  }
  /**
   * 是否有此事件
   * @param type
   * @param listener
   * @returns
   */
  hasEventListener(e, s) {
    const t = this.listeners;
    return t.has(e) ? t.get(e).includes(s) : !1;
  }
  /**
   * 移除事件
   * @param type
   * @param listener
   * @returns
   */
  removeEventListener(e, s) {
    const t = this.listeners;
    if (!t.has(e) || !t.get(e).includes(s))
      return;
    const i = t.get(e);
    i.splice(i.indexOf(s), 1);
  }
  /**
   * 移除该类型的所有事件
   * @param type
   * @returns
   */
  removeEvent(e) {
    const s = this.listeners;
    s.has(e) && s.delete(e);
  }
  /**
   * 触发事件
   * @param event
   */
  dispatchEvent(e) {
    var i;
    const s = e.type, t = this.listeners;
    if (t.has(s))
      try {
        (i = t.get(s)) == null || i.forEach((r) => {
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
  once(e, s) {
    const t = function(i) {
      s.call(this, i), Promise.resolve().then(() => {
        this.removeEventListener(e, t);
      });
    };
    this.addEventListener(e, t);
  }
  /**
   * 触发事件
   * @param name
   * @param params
   */
  emit(e, s = {}) {
    var i;
    const t = this.listeners;
    if (t.has(e))
      try {
        (i = t.get(e)) == null || i.forEach((r) => {
          r.call(this, s);
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
  on(e, s) {
    this.addEventListener(e, s);
  }
  /**
   * 是否有此事件
   * @param type
   * @param listener
   * @returns
   */
  has(e, s) {
    return this.hasEventListener(e, s);
  }
  /**
   * 移除事件
   * @param type
   * @param listener
   * @returns
   */
  off(e, s) {
    if (s)
      this.removeEventListener(e, s);
    else {
      const t = this.listeners;
      if (!t.has(e))
        return;
      t.delete(e);
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
class f extends u {
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
    const s = (t) => this.pluginTables.has(t) ? !0 : (console.error(
      `${e.name} must install this plugin before: ${t}`
    ), !1);
    if (e.deps)
      if (Array.isArray(e.deps))
        for (const t of e.deps)
          s(t);
      else
        s(e.deps);
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
    for (const t of this.strategyTables.values())
      t.condition.includes(e) && (console.info(
        `engine auto rollback strategy: ${t.name} before uninstall plugin: ${e}.`
      ), this.rollback(t.name));
    for (const t of this.pluginTables.values())
      t.deps && (Array.isArray(t.deps) && t.deps.includes(e) || t.deps === e) && (console.info(
        `engine auto uninstall plugin: ${t.name} before uninstall plugin: ${e}.`
      ), this.uninstall(t.name));
    return this.pluginTables.get(e).dispose(this), this.pluginTables.delete(e), this;
  }
  /**
   * 执行策略
   * @returns
   */
  exec(e) {
    const s = this.strategyTables;
    if (s.has(e.name))
      return console.warn("This strategy already exists", e.name), this;
    const t = this.pluginTables;
    for (const i of e.condition)
      if (!t.has(i))
        return console.warn(
          `${e.name} does not meet the conditions for execution: ${i}`
        ), this;
    return e.exec(this), s.set(e.name, e), this;
  }
  /**
   * 回滚策略
   * @returns
   */
  rollback(e) {
    const s = this.strategyTables;
    return s.has(e) ? (s.get(e).rollback(this), s.delete(e), this) : this;
  }
}
var d = /* @__PURE__ */ ((n) => (n.SETDOM = "setDom", n.SETSIZE = "setSize", n.SETCAMERA = "setCamera", n.SETSCENE = "setScene", n.RENDER = "render", n.DISPOSE = "dispose", n))(d || {});
const o = class o extends f {
  constructor() {
    super(), this.dom = document.createElement("div"), this.camera = new l(), this.scene = new h(), o.initFlag || o.init(), this.camera.position.set(50, 50, 50), this.camera.lookAt(0, 0, 0);
  }
  static init() {
    c.init(), o.initFlag = !0;
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
  setSize(e, s) {
    var t, i;
    return e && e <= 0 || s && s <= 0 ? (console.warn(
      `you must be input width and height bigger then zero, width: ${e}, height: ${s}`
    ), this) : (!e && (e = ((t = this.dom) == null ? void 0 : t.offsetWidth) || window.innerWidth), !s && (s = ((i = this.dom) == null ? void 0 : i.offsetHeight) || window.innerHeight), this.dispatchEvent({ type: "setSize", width: e, height: s }), this);
  }
  /**
   * 设置当前相机
   * @param camera
   * @param options
   * @returns
   */
  setCamera(e, s) {
    return this.dispatchEvent({
      type: "setCamera",
      camera: e,
      oldCamera: this.camera,
      options: Object.assign(
        {
          orbitControls: !0,
          transformControls: !0
        },
        s || {}
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
const v = function(n) {
  const e = new a();
  return n.plugins && n.plugins.forEach((s) => {
    e.install(s);
  }), n.strategy && n.strategy.forEach((s) => {
    e.exec(s);
  }), e;
}, b = function(n) {
  return () => n;
}, S = function(n) {
  return () => n;
}, p = "0.7.0";
window.__THREE__ || console.error(
  "vis-three dependent on three.js module, pleace run 'npm i three' first."
);
window.__VIS__ ? console.warn("Duplicate vis-three frames are introduced") : window.__VIS__ = p;
export {
  f as Base,
  d as ENGINE_EVENT,
  a as Engine,
  u as EventDispatcher,
  v as defineEngine,
  b as definePlugin,
  S as defineStrategy
};
