import { PerspectiveCamera as h, Scene as l, OrthographicCamera as c, AmbientLight as u, RectAreaLight as d, HemisphereLight as f } from "three";
import { LightShadow as m } from "three/src/lights/LightShadow.js";
import { RectAreaLightUniformsLib as p } from "three/examples/jsm/lights/RectAreaLightUniformsLib.js";
class S {
  constructor() {
    this.listeners = /* @__PURE__ */ new Map(), this.throttleSymbol = Symbol.for("vis.throttle"), this.throttleTimers = /* @__PURE__ */ new WeakSet(), this.antiShakeSymbol = Symbol.for("vis.antiShake"), this.antiShakeTimers = /* @__PURE__ */ new WeakMap();
  }
  /**
   * 订阅一个事件
   * @param type 事件类型
   * @param listener 触发该类型时的执行函数
   * @returns
   */
  addEventListener(t, e) {
    const s = this.listeners;
    s.has(t) || s.set(t, []);
    const i = s.get(t);
    i.includes(e) || i.push(e);
  }
  /**
   * 判断该事件类型下是否有相关方法
   * @param type 事件类型
   * @param listener 事件方法
   * @returns true or false
   */
  hasEventListener(t, e) {
    const s = this.listeners;
    return s.has(t) ? s.get(t).includes(e) : !1;
  }
  /**
   * 移除事件(包括该事件对应的节流事件和防抖事件)
   * @param type 事件类型
   * @param listener 事件方法
   * @returns
   */
  removeEventListener(t, e) {
    const s = this.listeners;
    if (!s.has(t))
      return;
    const i = s.get(t);
    e[this.throttleSymbol] && i.includes(e[this.throttleSymbol]) && (i.splice(i.indexOf(e[this.throttleSymbol]), 1), delete e[this.throttleSymbol]), e[this.antiShakeSymbol] && i.includes(e[this.antiShakeSymbol]) && (i.splice(i.indexOf(e[this.antiShakeSymbol]), 1), delete e[this.antiShakeSymbol]), i.includes(e) && i.splice(i.indexOf(e), 1);
  }
  /**
   * 移除该类型的所有事件
   * @param type 事件类型
   * @returns
   */
  removeEvent(t) {
    const e = this.listeners;
    e.has(t) && e.delete(t);
  }
  /**
   * 触发事件
   * @param event
   * event.type 必传，为需要触发的事件类型
   * event.xxx 为其他需要传入的数据
   * @returns
   */
  dispatchEvent(t) {
    var i;
    const e = t.type, s = this.listeners;
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
   * 一次性事件触发，触发一次之后会自动被移除
   * @param type 事件类型
   * @param listener 事件方法
   */
  once(t, e) {
    const s = function(i) {
      e.call(this, i), Promise.resolve().then(() => {
        this.removeEventListener(t, s);
      });
    };
    this.addEventListener(t, s);
  }
  /**
   * 触发事件
   * @param name 事件类型
   * @param params 其他的事件参数
   */
  emit(t, e = {}) {
    var i;
    const s = this.listeners;
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
   * 订阅事件
   * @param type 事件类型
   * @param listener 事件方法
   */
  on(t, e) {
    this.addEventListener(t, e);
  }
  /**
   * 判断该事件类型下是否有此事件
   * @param type 事件类型
   * @param listener 事件方法
   * @returns
   */
  has(t, e) {
    return this.hasEventListener(t, e);
  }
  /**
   * 移除事件，如果不传listener就会移除整个type事件类型下的事件
   * @param type 事件类型
   * @param listener 事件方法
   * @returns
   */
  off(t, e) {
    e ? this.removeEventListener(t, e) : this.removeEvent(t);
  }
  /**
   * 获取该事件类型下的事件数量
   * @param type 事件类型
   * @returns 数量
   */
  eventCount(t) {
    return this.listeners.has(t) ? this.listeners.get(t).length : 0;
  }
  /**
   * 销毁该类型的最后一个事件
   * @param type 事件类型
   * @returns
   */
  popLatestEvent(t) {
    this.listeners.has(t) && this.listeners.get(t).pop();
  }
  /**
   * 清空所有事件类型的事件
   */
  clear() {
    this.listeners.clear();
  }
  /**
   * 当前派发器是否使用
   * @returns true or false
   */
  useful() {
    return !![...this.listeners.keys()].length;
  }
  /**
   * 事件以节流模式触发
   * @param type 订阅的事件
   * @param listener 触发函数
   * @param time 节流时间
   * @returns
   */
  onThrottle(t, e, s = 1e3 / 60) {
    if (e[this.throttleSymbol]) {
      console.warn(
        `EventDispatcher: this listener has already been decorated with throttle in type ${t}.`,
        e
      );
      return;
    }
    const i = function(r) {
      this.throttleTimers.has(e) || (window.setTimeout(() => {
        e.call(this, r), this.throttleTimers.delete(e);
      }, s), this.throttleTimers.add(e));
    };
    e[this.throttleSymbol] = i, this.addEventListener(t, i);
  }
  /**
   * 事件以防抖模式触发
   * @param type 订阅的事件
   * @param listener 触发函数
   * @param time 防抖时间
   * @returns
   */
  onAntiShake(t, e, s = 1e3 / 60) {
    if (e[this.antiShakeSymbol]) {
      console.warn(
        `EventDispatcher: this listener has already been decorated with anti-shake in type ${t}.`,
        e
      );
      return;
    }
    const i = function(r) {
      this.antiShakeTimers.has(e) && clearTimeout(this.antiShakeTimers.get(e)), this.antiShakeTimers.set(
        e,
        window.setTimeout(() => {
          e.call(this, r), this.antiShakeTimers.delete(e);
        }, s)
      );
    };
    e[this.antiShakeSymbol] = i, this.addEventListener(t, i);
  }
}
class b extends S {
  constructor() {
    super(...arguments), this.pluginTables = /* @__PURE__ */ new Map(), this.strategyTables = /* @__PURE__ */ new Map();
  }
  /**
   * 安装插件
   * @param plugin 插件选项对象
   * @returns this
   */
  install(t) {
    if (this.pluginTables.has(t.name))
      return console.warn("This plugin already exists", t.name), this;
    const e = (s) => this.pluginTables.has(s) ? !0 : (console.error(
      `${t.name} must install this plugin before: ${s}`
    ), !1);
    if (t.deps)
      if (Array.isArray(t.deps))
        for (const s of t.deps)
          e(s);
      else
        e(t.deps);
    return t.install(this), this.pluginTables.set(t.name, t), this;
  }
  /**
   * 卸载插件
   * @param name 插件名称
   * @returns this
   */
  uninstall(t) {
    if (!this.pluginTables.has(t))
      return this;
    for (const s of this.strategyTables.values())
      s.condition.includes(t) && (console.info(
        `engine auto rollback strategy: ${s.name} before uninstall plugin: ${t}.`
      ), this.rollback(s.name));
    for (const s of this.pluginTables.values())
      s.deps && (Array.isArray(s.deps) && s.deps.includes(t) || s.deps === t) && (console.info(
        `engine auto uninstall plugin: ${s.name} before uninstall plugin: ${t}.`
      ), this.uninstall(s.name));
    return this.pluginTables.get(t).dispose(this), this.pluginTables.delete(t), this;
  }
  /**
   * 执行策略
   * @param strategy 策略选项对象
   * @returns this
   */
  exec(t) {
    const e = this.strategyTables;
    if (e.has(t.name))
      return console.warn("This strategy already exists", t.name), this;
    const s = this.pluginTables;
    for (const i of t.condition)
      if (!s.has(i))
        return console.warn(
          `${t.name} does not meet the conditions for execution: ${i}`
        ), this;
    return t.exec(this), e.set(t.name, t), this;
  }
  /**
   * 回滚策略
   * @param name 策略名称
   * @returns this
   */
  rollback(t) {
    const e = this.strategyTables;
    return e.has(t) ? (e.get(t).rollback(this), e.delete(t), this) : this;
  }
}
var g = /* @__PURE__ */ ((n) => (n.SETDOM = "setDom", n.SETSIZE = "setSize", n.SETCAMERA = "setCamera", n.SETSCENE = "setScene", n.RENDER = "render", n.DISPOSE = "dispose", n))(g || {});
const o = class o extends b {
  constructor() {
    super(), this.dom = document.createElement("div"), this.camera = new h(), this.scene = new l(), o.initFlag || o.init(), this.camera.position.set(50, 50, 50), this.camera.lookAt(0, 0, 0);
  }
  static init() {
    const t = new m(
      new c(-256, 256, 256, -256)
    );
    t.autoUpdate = !1, t.needsUpdate = !1, u.prototype.shadow = t, d.prototype.shadow = t, f.prototype.shadow = t, p.init(), o.initFlag = !0;
  }
  /**
   * 设置输出的dom，调用时会发布'setDom'事件
   * @param dom 挂载的dom对象
   * @returns this
   */
  setDom(t) {
    return this.dom = t, this.dispatchEvent({
      type: "setDom",
      dom: t
    }), this;
  }
  /**
   * 设置渲染窗口的整体尺寸，单位为px，调用时会发布'setSize'事件。
   * 不传时会自动获取当前挂载dom对象的宽高。
   * @param width 窗口宽度
   * @param height 窗口高度
   * @returns this
   */
  setSize(t, e) {
    var s, i;
    return t && t <= 0 || e && e <= 0 ? (console.warn(
      `you must be input width and height bigger then zero, width: ${t}, height: ${e}`
    ), this) : (!t && (t = ((s = this.dom) == null ? void 0 : s.offsetWidth) || window.innerWidth), !e && (e = ((i = this.dom) == null ? void 0 : i.offsetHeight) || window.innerHeight), this.dispatchEvent({ type: "setSize", width: t, height: e }), this);
  }
  /**
   * 设置当前相机，调用时会发布'setCamera'事件。
   * @param camera 设置当前渲染的相机对象
   * @param options 额外的选项设置，这些选项会加入到发布的'setCamera'事件中。
   * @returns this
   */
  setCamera(t, e) {
    return this.dispatchEvent({
      type: "setCamera",
      camera: t,
      oldCamera: this.camera,
      options: Object.assign(
        {
          orbitControls: !0,
          transformControls: !0
        },
        e || {}
      )
    }), this.camera = t, this;
  }
  /**
   * 设置渲染场景，调用时会发布'setScene'事件。
   * 事件包含上一个场景，和切换的场景。
   * @param scene 新的场景对象
   * @returns this
   */
  setScene(t) {
    return this.dispatchEvent({
      type: "setScene",
      scene: t,
      oldScene: this.scene
    }), this.scene = t, this;
  }
  /**
   * 渲染方法，调用时会发布'render'事件。
   * @param delta 传入的渲染帧插值，默认为0，会加入到发布的`render`事件中。
   * @returns this
   */
  render(t = 0) {
    return this.dispatchEvent({
      type: "render",
      delta: t
    }), this;
  }
  /**
   * 清除引擎缓存，调用时会发布'dispose'事件。
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
const k = function(n) {
  const t = new a();
  return n.plugins && n.plugins.forEach((e) => {
    t.install(e);
  }), n.strategy && n.strategy.forEach((e) => {
    t.exec(e);
  }), t;
}, E = function(n) {
  return () => n;
}, L = function(n) {
  return () => n;
}, v = "0.7.1";
window.__THREE__ || console.error(
  "vis-three dependent on three.js module, pleace run 'npm i three' first."
);
window.__VIS__ ? console.warn("Duplicate vis-three frames are introduced") : window.__VIS__ = v;
export {
  b as Base,
  g as ENGINE_EVENT,
  a as Engine,
  S as EventDispatcher,
  k as defineEngine,
  E as definePlugin,
  L as defineStrategy
};
