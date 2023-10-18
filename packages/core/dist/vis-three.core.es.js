var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
import { OrthographicCamera, AmbientLight, RectAreaLight, HemisphereLight, PerspectiveCamera, Scene } from "three";
import { RectAreaLightUniformsLib } from "three/examples/jsm/lights/RectAreaLightUniformsLib.js";
import { LightShadow } from "three/src/lights/LightShadow";
const version = "0.6.6";
if (!window.__THREE__) {
  console.error(
    `vis-three dependent on three.js module, pleace run 'npm i three' first.`
  );
}
if (window.__VIS__) {
  console.warn(`Duplicate vis-three frames are introduced`);
} else {
  window.__VIS__ = version;
}
const lightShadow = new LightShadow(
  new OrthographicCamera(-256, 256, 256, -256)
);
lightShadow.autoUpdate = false;
lightShadow.needsUpdate = false;
AmbientLight.prototype.shadow = lightShadow;
RectAreaLight.prototype.shadow = lightShadow;
HemisphereLight.prototype.shadow = lightShadow;
RectAreaLightUniformsLib.init();
class EventDispatcher {
  constructor() {
    __publicField(this, "listeners", /* @__PURE__ */ new Map());
  }
  addEventListener(type, listener) {
    const listeners = this.listeners;
    if (!listeners.has(type)) {
      listeners.set(type, []);
    }
    const array = listeners.get(type);
    if (array.includes(listener)) {
      return;
    }
    array.push(listener);
  }
  hasEventListener(type, listener) {
    const listeners = this.listeners;
    if (!listeners.has(type)) {
      return false;
    }
    return listeners.get(type).includes(listener);
  }
  removeEventListener(type, listener) {
    const listeners = this.listeners;
    if (!listeners.has(type)) {
      return;
    }
    if (!listeners.get(type).includes(listener)) {
      return;
    }
    const array = listeners.get(type);
    array.splice(array.indexOf(listener), 1);
  }
  removeEvent(type) {
    const listeners = this.listeners;
    if (!listeners.has(type)) {
      return;
    }
    listeners.delete(type);
  }
  dispatchEvent(event) {
    var _a;
    const type = event.type;
    const listeners = this.listeners;
    if (listeners.has(type)) {
      try {
        (_a = listeners.get(type)) == null ? void 0 : _a.forEach((listener) => {
          listener.call(this, event);
        });
      } catch (error) {
        console.error(error);
      }
    }
  }
  once(type, listener) {
    const onceListener = function(event) {
      listener.call(this, event);
      Promise.resolve().then(() => {
        this.removeEventListener(type, onceListener);
      });
    };
    this.addEventListener(type, onceListener);
  }
  emit(name, params = {}) {
    var _a;
    const listeners = this.listeners;
    if (listeners.has(name)) {
      try {
        (_a = listeners.get(name)) == null ? void 0 : _a.forEach((listener) => {
          listener.call(this, params);
        });
      } catch (error) {
        console.error(error);
      }
    }
  }
  on(type, listener) {
    this.addEventListener(type, listener);
  }
  has(type, listener) {
    return this.hasEventListener(type, listener);
  }
  off(type, listener) {
    if (listener) {
      this.removeEventListener(type, listener);
    } else {
      const listeners = this.listeners;
      if (!listeners.has(type)) {
        return;
      }
      listeners.delete(type);
    }
  }
  eventCount(type) {
    if (!this.listeners.has(type)) {
      return 0;
    }
    return this.listeners.get(type).length;
  }
  popLatestEvent(type) {
    if (!this.listeners.has(type)) {
      return;
    }
    this.listeners.get(type).pop();
  }
  clear() {
    this.listeners.clear();
  }
  useful() {
    return Boolean([...this.listeners.keys()].length);
  }
}
var ENGINE_EVENT = /* @__PURE__ */ ((ENGINE_EVENT2) => {
  ENGINE_EVENT2["SETDOM"] = "setDom";
  ENGINE_EVENT2["SETSIZE"] = "setSize";
  ENGINE_EVENT2["SETCAMERA"] = "setCamera";
  ENGINE_EVENT2["SETSCENE"] = "setScene";
  ENGINE_EVENT2["RENDER"] = "render";
  ENGINE_EVENT2["DISPOSE"] = "dispose";
  return ENGINE_EVENT2;
})(ENGINE_EVENT || {});
class Engine extends EventDispatcher {
  constructor() {
    super();
    __publicField(this, "pluginTables", /* @__PURE__ */ new Map());
    __publicField(this, "strategyTables", /* @__PURE__ */ new Map());
    __publicField(this, "dom", document.createElement("div"));
    __publicField(this, "camera", new PerspectiveCamera());
    __publicField(this, "scene", new Scene());
    this.camera.position.set(50, 50, 50);
    this.camera.lookAt(0, 0, 0);
  }
  install(plugin) {
    if (this.pluginTables.has(plugin.name)) {
      console.warn(`This plugin already exists`, plugin.name);
      return this;
    }
    const validateDep = (name) => {
      if (!this.pluginTables.has(name)) {
        console.error(
          `${plugin.name} must install this plugin before: ${name}`
        );
        return false;
      }
      return true;
    };
    if (plugin.deps) {
      if (Array.isArray(plugin.deps)) {
        for (const name of plugin.deps) {
          if (!validateDep(name))
            ;
        }
      } else {
        if (!validateDep(plugin.deps))
          ;
      }
    }
    plugin.install(this);
    this.pluginTables.set(plugin.name, plugin);
    return this;
  }
  uninstall(name) {
    if (!this.pluginTables.has(name)) {
      return this;
    }
    for (const strategy of this.strategyTables.values()) {
      if (strategy.condition.includes(name)) {
        console.info(
          `engine auto rollback strategy: ${strategy.name} before uninstall plugin: ${name}.`
        );
        this.rollback(strategy.name);
      }
    }
    for (const plugin2 of this.pluginTables.values()) {
      if (plugin2.deps) {
        if (Array.isArray(plugin2.deps) && plugin2.deps.includes(name) || plugin2.deps === name) {
          console.info(
            `engine auto uninstall plugin: ${plugin2.name} before uninstall plugin: ${name}.`
          );
          this.uninstall(plugin2.name);
        }
      }
    }
    const plugin = this.pluginTables.get(name);
    plugin.dispose(this);
    this.pluginTables.delete(name);
    return this;
  }
  exec(strategy) {
    const tables = this.strategyTables;
    if (tables.has(strategy.name)) {
      console.warn(`This strategy already exists`, strategy.name);
      return this;
    }
    const plugins = this.pluginTables;
    for (const plugin of strategy.condition) {
      if (!plugins.has(plugin)) {
        console.warn(
          `${strategy.name} does not meet the conditions for execution: ${plugin}`
        );
        return this;
      }
    }
    strategy.exec(this);
    tables.set(strategy.name, strategy);
    return this;
  }
  rollback(name) {
    const tables = this.strategyTables;
    if (!tables.has(name)) {
      return this;
    }
    const strategy = tables.get(name);
    strategy.rollback(this);
    tables.delete(name);
    return this;
  }
  setDom(dom) {
    this.dom = dom;
    this.dispatchEvent({
      type: "setDom",
      dom
    });
    return this;
  }
  setSize(width, height) {
    var _a, _b;
    if (width && width <= 0 || height && height <= 0) {
      console.warn(
        `you must be input width and height bigger then zero, width: ${width}, height: ${height}`
      );
      return this;
    }
    !width && (width = ((_a = this.dom) == null ? void 0 : _a.offsetWidth) || window.innerWidth);
    !height && (height = ((_b = this.dom) == null ? void 0 : _b.offsetHeight) || window.innerHeight);
    this.dispatchEvent({ type: "setSize", width, height });
    return this;
  }
  setCamera(camera, options) {
    this.dispatchEvent({
      type: "setCamera",
      camera,
      oldCamera: this.camera,
      options: Object.assign(
        {
          orbitControls: true,
          transformControls: true
        },
        options || {}
      )
    });
    this.camera = camera;
    return this;
  }
  setScene(scene) {
    this.dispatchEvent({
      type: "setScene",
      scene,
      oldScene: this.scene
    });
    this.scene = scene;
    return this;
  }
  render(delta) {
    this.dispatchEvent({
      type: "render",
      delta
    });
    return this;
  }
  dispose() {
    this.dispatchEvent({
      type: "dispose"
    });
    return this;
  }
}
const defineEngine = function(options) {
  const engine = new Engine();
  if (options.plugins) {
    options.plugins.forEach((plugin) => {
      engine.install(plugin);
    });
  }
  if (options.strategy) {
    options.strategy.forEach((strategy) => {
      engine.exec(strategy);
    });
  }
  return engine;
};
const definePlugin = function(options) {
  return () => options;
};
const defineStrategy = function(options) {
  return () => options;
};
export { ENGINE_EVENT, Engine, EventDispatcher, defineEngine, definePlugin, defineStrategy };
