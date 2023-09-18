var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
import { PointLight, Mesh, BoxBufferGeometry, MeshStandardMaterial, AmbientLight, SphereBufferGeometry, WebGLRenderer, PCFSoftShadowMap, Scene, PerspectiveCamera, Vector3, Object3D, Line, Points, Sprite } from "three";
class CanvasGenerator {
  constructor(parameters) {
    __publicField(this, "canvas");
    this.canvas = document.createElement("canvas");
    const devicePixelRatio2 = window.devicePixelRatio;
    this.canvas.width = ((parameters == null ? void 0 : parameters.width) || 512) * devicePixelRatio2;
    this.canvas.height = ((parameters == null ? void 0 : parameters.height) || 512) * devicePixelRatio2;
    this.canvas.style.backgroundColor = (parameters == null ? void 0 : parameters.bgColor) || "rgb(255, 255, 255)";
    const ctx = this.canvas.getContext("2d");
    ctx && ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
  }
  get() {
    return this.canvas;
  }
  getDom() {
    return this.canvas;
  }
  clear(x = 0, y = 0, width, height) {
    !width && (width = this.canvas.width);
    !height && (height = this.canvas.height);
    const ctx = this.canvas.getContext("2d");
    if (ctx) {
      ctx.clearRect(x, y, width, height);
      return this;
    } else {
      console.warn(`you browser can not support canvas 2d`);
      return this;
    }
  }
  draw(fun) {
    const ctx = this.canvas.getContext("2d");
    if (ctx) {
      fun(ctx);
      return this;
    } else {
      console.warn(`you browser can not support canvas 2d`);
      return this;
    }
  }
  preview(parameters) {
    const canvas = this.canvas;
    canvas.style.position = "fixed";
    canvas.style.top = (parameters == null ? void 0 : parameters.top) || "5%";
    canvas.style.left = (parameters == null ? void 0 : parameters.left) || "5%";
    canvas.style.right = (parameters == null ? void 0 : parameters.right) || "unset";
    canvas.style.bottom = (parameters == null ? void 0 : parameters.bottom) || "unset";
    if (parameters == null ? void 0 : parameters.scale) {
      canvas.style.transform = `scale(${parameters.scale})`;
    }
    document.body.appendChild(this.canvas);
    return this;
  }
  setSize(width, height) {
    this.canvas.width = width * devicePixelRatio;
    this.canvas.height = height * devicePixelRatio;
    return this;
  }
}
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
      Promise.resolve(() => {
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
var RECT_EVENT = /* @__PURE__ */ ((RECT_EVENT2) => {
  RECT_EVENT2["RELOAD"] = "reload";
  RECT_EVENT2["UPDATE"] = "update";
  return RECT_EVENT2;
})(RECT_EVENT || {});
const _CanvasReactor = class extends EventDispatcher {
  constructor(config) {
    super();
    __publicField(this, "canvas");
    __publicField(this, "data");
    this.data = new Proxy(config, {
      get: _CanvasReactor.proxyGetter,
      set: _CanvasReactor.proxySetter.bind(this)
    });
  }
  setSize() {
    return this;
  }
  draw() {
    return this;
  }
};
let CanvasReactor = _CanvasReactor;
__publicField(CanvasReactor, "proxyGetter", function(target, property, value) {
  return Reflect.get(target, property, value);
});
__publicField(CanvasReactor, "proxySetter", function(target, property, value, receiver) {
  const result = Reflect.set(target, property, value, receiver);
  if (property === "width" || property === "height") {
    this.setSize();
    this.dispatchEvent({
      type: "reload"
    });
  }
  this.draw();
  this.dispatchEvent({
    type: "update"
  });
  return result;
});
class Action {
  next() {
    console.warn(
      `this action can not set next function: ${this.constructor.name}`
    );
  }
  prev() {
    console.warn(
      `this action can not set prev function: ${this.constructor.name}`
    );
  }
}
class History {
  constructor(step) {
    __publicField(this, "actionList", []);
    __publicField(this, "index", -1);
    __publicField(this, "step", 50);
    this.step = step || 50;
  }
  do(command) {
    this.actionList[this.index][command]();
  }
  apply(action, exec = false) {
    const actionList = this.actionList;
    if (this.index === actionList.length - 1 && actionList.length >= this.step) {
      actionList.shift();
      this.index = this.actionList.length - 1;
    } else if (this.index !== -1) {
      actionList.splice(this.index + 1, actionList.length - 1);
    } else if (this.index === -1) {
      this.actionList = [];
    }
    this.actionList.push(action);
    if (exec) {
      this.redo();
    } else {
      this.index += 1;
    }
  }
  redo() {
    this.index += 1;
    if (this.index > this.actionList.length - 1) {
      this.index = this.actionList.length - 1;
      return;
    }
    this.do("next");
  }
  undo() {
    if (this.index < 0) {
      return;
    }
    this.do("prev");
    this.index -= 1;
  }
  clear() {
    this.actionList = [];
  }
}
const pointLight = new PointLight("rgb(255, 255, 255)", 0.5, 200, 1);
pointLight.position.set(-30, 5, 20);
pointLight.castShadow = true;
const plane = new Mesh(
  new BoxBufferGeometry(80, 2, 80),
  new MeshStandardMaterial({
    color: "rgb(255, 255, 255)"
  })
);
plane.position.set(0, -11, 0);
plane.receiveShadow = true;
plane.castShadow = true;
const _MaterialDisplayer = class {
  constructor(parameters) {
    __publicField(this, "material");
    __publicField(this, "dom");
    __publicField(this, "renderer");
    __publicField(this, "scene");
    __publicField(this, "camera");
    __publicField(this, "object");
    const renderer = new WebGLRenderer({
      antialias: true,
      preserveDrawingBuffer: true
    });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setClearColor("rgb(150, 150, 150)");
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = PCFSoftShadowMap;
    const scene = new Scene();
    const camera = new PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      1,
      500
    );
    camera.position.set(0, 0, 35);
    camera.up.x = 0;
    camera.up.y = 1;
    camera.up.z = 0;
    camera.lookAt(new Vector3(0, 0, 0));
    scene.add(_MaterialDisplayer.ambientLight);
    scene.add(_MaterialDisplayer.pointLight);
    scene.add(_MaterialDisplayer.plane);
    this.scene = scene;
    this.renderer = renderer;
    this.camera = camera;
    this.object = new Object3D();
    (parameters == null ? void 0 : parameters.material) && this.setMaterial(parameters.material);
    (parameters == null ? void 0 : parameters.dom) && this.setDom(parameters.dom);
  }
  setMaterial(material) {
    this.scene.remove(this.object);
    this.material = material;
    if (material.type.includes("Mesh") || material.type === "ShaderMaterial" || material.type === "RawShaderMaterial") {
      this.object = new Mesh(_MaterialDisplayer.geometry, material);
    } else if (material.type.includes("Line")) {
      this.object = new Line(_MaterialDisplayer.geometry, material);
    } else if (material.type.includes("Points")) {
      this.object = new Points(_MaterialDisplayer.geometry, material);
    } else if (material.type.includes("Sprite")) {
      this.object = new Sprite(material);
    } else {
      console.warn(
        `material displayer can not support this type material: '${material.type}'`
      );
      return this;
    }
    this.object.castShadow = true;
    this.object.receiveShadow = true;
    this.scene.add(this.object);
    return this;
  }
  setDom(dom) {
    this.dom = dom;
    this.setSize();
    dom.appendChild(this.renderer.domElement);
    return this;
  }
  setSize(width, height) {
    if (width && height) {
      this.camera.aspect = width / height;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(width, height, true);
    } else {
      if (!this.dom) {
        console.warn(
          `material displayer must set dom before setSize with empty parameters`
        );
        return this;
      }
      const dom = this.dom;
      this.camera.aspect = dom.offsetWidth / dom.offsetHeight;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(dom.offsetWidth, dom.offsetHeight, true);
    }
    return this;
  }
  render() {
    this.renderer.render(this.scene, this.camera);
  }
  getDataURL(mine) {
    return this.renderer.domElement.toDataURL(mine || "image/png");
  }
  dispose() {
    this.renderer.dispose();
  }
};
let MaterialDisplayer = _MaterialDisplayer;
__publicField(MaterialDisplayer, "ambientLight", new AmbientLight("rgb(255, 255, 255)", 0.7));
__publicField(MaterialDisplayer, "pointLight", pointLight);
__publicField(MaterialDisplayer, "geometry", new SphereBufferGeometry(10, 12, 12));
__publicField(MaterialDisplayer, "plane", plane);
__publicField(MaterialDisplayer, "dispose", () => {
  _MaterialDisplayer.geometry.dispose();
  _MaterialDisplayer.plane.geometry.dispose();
});
const _TextureDisplayer = class {
  constructor(parameters) {
    __publicField(this, "dom");
    __publicField(this, "texture");
    __publicField(this, "renderer");
    __publicField(this, "scene");
    __publicField(this, "camera");
    const renderer = new WebGLRenderer({
      antialias: true,
      preserveDrawingBuffer: true
    });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setClearColor("rgb(150, 150, 150)");
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = PCFSoftShadowMap;
    const scene = new Scene();
    const camera = new PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      1,
      500
    );
    camera.position.set(0, 0, 35);
    camera.up.x = 0;
    camera.up.y = 1;
    camera.up.z = 0;
    camera.lookAt(new Vector3(0, 0, 0));
    scene.add(_TextureDisplayer.ambientLight);
    this.scene = scene;
    this.renderer = renderer;
    this.camera = camera;
    (parameters == null ? void 0 : parameters.texture) && this.setTexture(parameters.texture);
    (parameters == null ? void 0 : parameters.dom) && this.setDom(parameters.dom);
  }
  setTexture(texture) {
    this.scene.background = texture;
    return this;
  }
  setDom(dom) {
    this.dom = dom;
    this.setSize();
    dom.appendChild(this.renderer.domElement);
    return this;
  }
  setSize(width, height) {
    if (width && height) {
      this.camera.aspect = width / height;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(width, height, true);
    } else {
      if (!this.dom) {
        console.warn(
          `texture displayer must set dom before setSize with empty parameters`
        );
        return this;
      }
      const dom = this.dom;
      this.camera.aspect = dom.offsetWidth / dom.offsetHeight;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(dom.offsetWidth, dom.offsetHeight, true);
    }
    return this;
  }
  render() {
    this.renderer.render(this.scene, this.camera);
  }
  getDataURL(mine) {
    return this.renderer.domElement.toDataURL(mine || "image/png");
  }
  dispose() {
    this.renderer.dispose();
  }
};
let TextureDisplayer = _TextureDisplayer;
__publicField(TextureDisplayer, "ambientLight", new AmbientLight("rgb(255, 255, 255)", 1));
export { Action, CanvasGenerator, CanvasReactor, EventDispatcher, History, MaterialDisplayer, RECT_EVENT, TextureDisplayer };
