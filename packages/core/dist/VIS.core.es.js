var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
import { OrthographicCamera, AmbientLight, RectAreaLight, HemisphereLight, PerspectiveCamera, Scene, Texture, RGBFormat, LinearFilter, PlaneBufferGeometry, Box3, Vector3, Quaternion, Matrix4, MOUSE, TOUCH, Spherical, Vector2, BufferGeometry, CurvePath, CubicBezierCurve3, LineCurve3, QuadraticBezierCurve3, CatmullRomCurve3, ShapeBufferGeometry, Shape, TubeGeometry } from "three";
import { RectAreaLightUniformsLib } from "three/examples/jsm/lights/RectAreaLightUniformsLib.js";
import { LightShadow } from "three/src/lights/LightShadow";
import { CSS2DObject } from "three/examples/jsm/renderers/CSS2DRenderer";
import { CSS3DObject, CSS3DSprite as CSS3DSprite$1 } from "three/examples/jsm/renderers/CSS3DRenderer";
const version = "0.4.0";
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
      listeners.set(type, /* @__PURE__ */ new Set());
    }
    listeners.get(type).add(listener);
  }
  hasEventListener(type, listener) {
    const listeners = this.listeners;
    if (!listeners.has(type)) {
      return false;
    }
    return listeners.get(type).has(listener);
  }
  removeEventListener(type, listener) {
    const listeners = this.listeners;
    if (!listeners.has(type)) {
      return;
    }
    if (!listeners.get(type).has(listener)) {
      return;
    }
    listeners.get(type).delete(listener);
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
  clear() {
    this.listeners.clear();
  }
  useful() {
    return Boolean([...this.listeners.keys()].length);
  }
  once(type, listener) {
    const onceListener = function(event) {
      listener.call(this, event);
      this.removeEventListener(type, onceListener);
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
}
var ENGINE_EVENT = /* @__PURE__ */ ((ENGINE_EVENT2) => {
  ENGINE_EVENT2["SETDOM"] = "setDom";
  ENGINE_EVENT2["SETSIZE"] = "setSize";
  ENGINE_EVENT2["SETCAMERA"] = "setCamera";
  ENGINE_EVENT2["SETSCENE"] = "setScene";
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
    __publicField(this, "render");
    this.camera.position.set(50, 50, 50);
    this.render = function() {
      console.warn("can not install some plugin");
    };
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
  unistall(name) {
    if (!this.pluginTables.has(name)) {
      return this;
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
class VideoTexture extends Texture {
  constructor(video, mapping, wrapS, wrapT, magFilter, minFilter, format, type, anisotropy) {
    super(
      video,
      mapping,
      wrapS,
      wrapT,
      magFilter,
      minFilter,
      format,
      type,
      anisotropy
    );
    __publicField(this, "isVideoTexture", true);
    this.format = format !== void 0 ? format : RGBFormat;
    this.minFilter = minFilter !== void 0 ? minFilter : LinearFilter;
    this.magFilter = magFilter !== void 0 ? magFilter : LinearFilter;
    this.generateMipmaps = false;
  }
  clone() {
    return new this.constructor(this.image).copy(this);
  }
  update() {
    const video = this.image;
    const hasVideoFrameCallback = "requestVideoFrameCallback" in video;
    if (hasVideoFrameCallback) {
      this.needsUpdate = true;
    } else if (hasVideoFrameCallback === false && video.readyState >= video.HAVE_CURRENT_DATA) {
      this.needsUpdate = true;
    }
  }
}
class VisCSS2DObject extends CSS2DObject {
  constructor(element = document.createElement("div")) {
    const root = document.createElement("div");
    const width = 50;
    const height = 50;
    root.style.width = `${width}px`;
    root.style.height = `${height}px`;
    root.appendChild(element);
    super(root);
    __publicField(this, "geometry");
    __publicField(this, "_width");
    __publicField(this, "_height");
    this.geometry = new PlaneBufferGeometry(width, height);
    this.geometry.computeBoundingBox();
    this._width = width;
    this._height = height;
  }
  get width() {
    return this._width;
  }
  set width(value) {
    this.geometry.dispose();
    this.geometry = new PlaneBufferGeometry(value, this._height);
    this.geometry.computeBoundingBox();
    this.element.style.width = `${value}px`;
    this._width = value;
  }
  get height() {
    return this._height;
  }
  set height(value) {
    this.geometry.dispose();
    this.geometry = new PlaneBufferGeometry(this._width, value);
    this.geometry.computeBoundingBox();
    this.element.style.height = `${value}px`;
    this._height = value;
  }
}
class VisCSS3DObject extends CSS3DObject {
  constructor(element = document.createElement("div")) {
    const root = document.createElement("div");
    const width = 50;
    const height = 50;
    root.style.width = `${width}px`;
    root.style.height = `${height}px`;
    root.appendChild(element);
    super(root);
    __publicField(this, "geometry");
    __publicField(this, "_width");
    __publicField(this, "_height");
    this.geometry = new PlaneBufferGeometry(width, height);
    this.geometry.computeBoundingBox();
    this._width = width;
    this._height = height;
  }
  get width() {
    return this._width;
  }
  set width(value) {
    this.geometry.dispose();
    this.geometry = new PlaneBufferGeometry(value, this._height);
    this.geometry.computeBoundingBox();
    this.element.style.width = `${value}px`;
    this._width = value;
  }
  get height() {
    return this._height;
  }
  set height(value) {
    this.geometry.dispose();
    this.geometry = new PlaneBufferGeometry(this._width, value);
    this.geometry.computeBoundingBox();
    this.element.style.height = `${value}px`;
    this._height = value;
  }
}
class VisCSS3DSprite extends CSS3DSprite$1 {
  constructor(element = document.createElement("div")) {
    const root = document.createElement("div");
    const width = 50;
    const height = 50;
    root.style.width = `${width}px`;
    root.style.height = `${height}px`;
    root.appendChild(element);
    element.classList.add("vis-css3d", "vis-css3d-sprite");
    super(root);
    __publicField(this, "geometry");
    __publicField(this, "_width");
    __publicField(this, "_height");
    __publicField(this, "cacheBox", new Box3());
    __publicField(this, "cachePosition", new Vector3());
    __publicField(this, "cacheQuaternion", new Quaternion());
    __publicField(this, "cacheScale", new Vector3());
    __publicField(this, "cacheMatrix4", new Matrix4());
    __publicField(this, "rotateMatrix4", new Matrix4());
    this.geometry = new PlaneBufferGeometry(width, height);
    this.geometry.computeBoundingBox();
    this._width = width;
    this._height = height;
    this.type = "CSS3DSprite";
  }
  get width() {
    return this._width;
  }
  set width(value) {
    this.geometry.dispose();
    this.geometry = new PlaneBufferGeometry(value, this._height);
    this.geometry.computeBoundingBox();
    this.element.style.width = `${value}px`;
    this._width = value;
  }
  get height() {
    return this._height;
  }
  set height(value) {
    this.geometry.dispose();
    this.geometry = new PlaneBufferGeometry(this._width, value);
    this.geometry.computeBoundingBox();
    this.element.style.height = `${value}px`;
    this._height = value;
  }
  raycast(raycaster, intersects) {
    const box = this.cacheBox.copy(this.geometry.boundingBox);
    this.matrixWorld.decompose(
      this.cachePosition,
      this.cacheQuaternion,
      this.cacheScale
    );
    const rotateMatrix4 = this.rotateMatrix4.lookAt(
      this.position,
      raycaster.camera.position,
      this.up
    );
    this.cacheQuaternion.setFromRotationMatrix(rotateMatrix4);
    this.cacheMatrix4.compose(
      this.cachePosition,
      this.cacheQuaternion,
      this.cacheScale
    );
    box.applyMatrix4(this.cacheMatrix4);
    if (raycaster.ray.intersectsBox(box)) {
      intersects.push({
        distance: raycaster.ray.origin.distanceTo(this.position),
        object: this,
        point: this.position
      });
    }
  }
}
class VisOrbitControls extends EventDispatcher {
  constructor(object, domElement) {
    super();
    __publicField(this, "object");
    __publicField(this, "domElement");
    __publicField(this, "enabled", true);
    __publicField(this, "target", new Vector3());
    __publicField(this, "minDistance", 0);
    __publicField(this, "maxDistance", Infinity);
    __publicField(this, "minZoom", 0);
    __publicField(this, "maxZoom", Infinity);
    __publicField(this, "minPolarAngle", 0);
    __publicField(this, "maxPolarAngle", Math.PI);
    __publicField(this, "minAzimuthAngle", -Infinity);
    __publicField(this, "maxAzimuthAngle", Infinity);
    __publicField(this, "enableDamping", false);
    __publicField(this, "dampingFactor", 0.05);
    __publicField(this, "enableZoom", true);
    __publicField(this, "zoomSpeed", 1);
    __publicField(this, "enableRotate", true);
    __publicField(this, "rotateSpeed", 1);
    __publicField(this, "enablePan", true);
    __publicField(this, "panSpeed", 1);
    __publicField(this, "screenSpacePanning", true);
    __publicField(this, "keyPanSpeed", 7);
    __publicField(this, "autoRotate", false);
    __publicField(this, "autoRotateSpeed", 2);
    __publicField(this, "keys", {
      LEFT: "ArrowLeft",
      UP: "ArrowUp",
      RIGHT: "ArrowRight",
      BOTTOM: "ArrowDown"
    });
    __publicField(this, "mouseButtons", {
      LEFT: null,
      MIDDLE: MOUSE.DOLLY,
      RIGHT: MOUSE.ROTATE
    });
    __publicField(this, "touches", { ONE: TOUCH.ROTATE, TWO: TOUCH.DOLLY_PAN });
    __publicField(this, "target0");
    __publicField(this, "position0");
    __publicField(this, "zoom0");
    __publicField(this, "_domElementKeyEvents", null);
    __publicField(this, "spherical");
    __publicField(this, "reset");
    __publicField(this, "update");
    __publicField(this, "onContextMenu");
    __publicField(this, "onPointerDown");
    __publicField(this, "onPointerCancel");
    __publicField(this, "onMouseWheel");
    __publicField(this, "onPointerMove");
    __publicField(this, "onPointerUp");
    __publicField(this, "onKeyDown");
    this.object = object || new PerspectiveCamera();
    this.domElement = domElement || document.createElement("div");
    this.domElement.style.touchAction = "none";
    this.target0 = this.target.clone();
    this.position0 = this.object.position.clone();
    this.zoom0 = this.object.zoom;
    this.update = (() => {
      const offset = new Vector3();
      const quat = new Quaternion().setFromUnitVectors(
        this.object.up,
        new Vector3(0, 1, 0)
      );
      const quatInverse = quat.clone().invert();
      const lastPosition = new Vector3();
      const lastQuaternion = new Quaternion();
      const twoPI = 2 * Math.PI;
      return () => {
        const position = this.object.position;
        offset.copy(position).sub(this.target);
        offset.applyQuaternion(quat);
        spherical.setFromVector3(offset);
        if (this.autoRotate && state === STATE.NONE) {
          rotateLeft(getAutoRotationAngle());
        }
        if (this.enableDamping) {
          spherical.theta += sphericalDelta.theta * this.dampingFactor;
          spherical.phi += sphericalDelta.phi * this.dampingFactor;
        } else {
          spherical.theta += sphericalDelta.theta;
          spherical.phi += sphericalDelta.phi;
        }
        let min = this.minAzimuthAngle;
        let max = this.maxAzimuthAngle;
        if (isFinite(min) && isFinite(max)) {
          if (min < -Math.PI)
            min += twoPI;
          else if (min > Math.PI)
            min -= twoPI;
          if (max < -Math.PI)
            max += twoPI;
          else if (max > Math.PI)
            max -= twoPI;
          if (min <= max) {
            spherical.theta = Math.max(min, Math.min(max, spherical.theta));
          } else {
            spherical.theta = spherical.theta > (min + max) / 2 ? Math.max(min, spherical.theta) : Math.min(max, spherical.theta);
          }
        }
        spherical.phi = Math.max(
          this.minPolarAngle,
          Math.min(this.maxPolarAngle, spherical.phi)
        );
        spherical.makeSafe();
        spherical.radius *= scale;
        spherical.radius = Math.max(
          this.minDistance,
          Math.min(this.maxDistance, spherical.radius)
        );
        if (this.enableDamping === true) {
          this.target.addScaledVector(panOffset, this.dampingFactor);
        } else {
          this.target.add(panOffset);
        }
        offset.setFromSpherical(spherical);
        offset.applyQuaternion(quatInverse);
        position.copy(this.target).add(offset);
        this.object.lookAt(this.target);
        if (this.enableDamping === true) {
          sphericalDelta.theta *= 1 - this.dampingFactor;
          sphericalDelta.phi *= 1 - this.dampingFactor;
          panOffset.multiplyScalar(1 - this.dampingFactor);
        } else {
          sphericalDelta.set(0, 0, 0);
          panOffset.set(0, 0, 0);
        }
        scale = 1;
        if (zoomChanged || lastPosition.distanceToSquared(this.object.position) > EPS || 8 * (1 - lastQuaternion.dot(this.object.quaternion)) > EPS) {
          this.dispatchEvent({ type: "change" });
          lastPosition.copy(this.object.position);
          lastQuaternion.copy(this.object.quaternion);
          zoomChanged = false;
          return true;
        }
        return false;
      };
    })();
    const STATE = {
      NONE: -1,
      ROTATE: 0,
      DOLLY: 1,
      PAN: 2,
      TOUCH_ROTATE: 3,
      TOUCH_PAN: 4,
      TOUCH_DOLLY_PAN: 5,
      TOUCH_DOLLY_ROTATE: 6
    };
    let state = STATE.NONE;
    const EPS = 1e-6;
    const spherical = new Spherical();
    const sphericalDelta = new Spherical();
    let scale = 1;
    const panOffset = new Vector3();
    let zoomChanged = false;
    const rotateStart = new Vector2();
    const rotateEnd = new Vector2();
    const rotateDelta = new Vector2();
    const panStart = new Vector2();
    const panEnd = new Vector2();
    const panDelta = new Vector2();
    const dollyStart = new Vector2();
    const dollyEnd = new Vector2();
    const dollyDelta = new Vector2();
    const pointers = [];
    const pointerPositions = {};
    const getAutoRotationAngle = () => {
      return 2 * Math.PI / 60 / 60 * this.autoRotateSpeed;
    };
    const getZoomScale = () => {
      return Math.pow(0.95, this.zoomSpeed);
    };
    const rotateLeft = (angle) => {
      sphericalDelta.theta -= angle;
    };
    const rotateUp = (angle) => {
      sphericalDelta.phi -= angle;
    };
    const panLeft = function() {
      const v = new Vector3();
      return function panLeft2(distance, objectMatrix) {
        v.setFromMatrixColumn(objectMatrix, 0);
        v.multiplyScalar(-distance);
        panOffset.add(v);
      };
    }();
    const panUp = (() => {
      const v = new Vector3();
      return (distance, objectMatrix) => {
        if (this.screenSpacePanning === true) {
          v.setFromMatrixColumn(objectMatrix, 1);
        } else {
          v.setFromMatrixColumn(objectMatrix, 0);
          v.crossVectors(this.object.up, v);
        }
        v.multiplyScalar(distance);
        panOffset.add(v);
      };
    })();
    const pan = (() => {
      const offset = new Vector3();
      return (deltaX, deltaY) => {
        const element = this.domElement;
        if (this.object instanceof PerspectiveCamera) {
          const position = this.object.position;
          offset.copy(position).sub(this.target);
          let targetDistance = offset.length();
          targetDistance *= Math.tan(this.object.fov / 2 * Math.PI / 180);
          panLeft(
            2 * deltaX * targetDistance / element.clientHeight,
            this.object.matrix
          );
          panUp(
            2 * deltaY * targetDistance / element.clientHeight,
            this.object.matrix
          );
        } else if (this.object instanceof OrthographicCamera) {
          panLeft(
            deltaX * (this.object.right - this.object.left) / this.object.zoom / element.clientWidth,
            this.object.matrix
          );
          panUp(
            deltaY * (this.object.top - this.object.bottom) / this.object.zoom / element.clientHeight,
            this.object.matrix
          );
        } else {
          console.warn(
            "WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."
          );
          this.enablePan = false;
        }
      };
    })();
    const dollyOut = (dollyScale) => {
      if (this.object instanceof PerspectiveCamera) {
        scale /= dollyScale;
      } else if (this.object instanceof OrthographicCamera) {
        this.object.zoom = Math.max(
          this.minZoom,
          Math.min(this.maxZoom, this.object.zoom * dollyScale)
        );
        this.object.updateProjectionMatrix();
        zoomChanged = true;
      } else {
        console.warn(
          "WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."
        );
        this.enableZoom = false;
      }
    };
    const dollyIn = (dollyScale) => {
      if (this.object instanceof PerspectiveCamera) {
        scale *= dollyScale;
      } else if (this.object instanceof OrthographicCamera) {
        this.object.zoom = Math.max(
          this.minZoom,
          Math.min(this.maxZoom, this.object.zoom / dollyScale)
        );
        this.object.updateProjectionMatrix();
        zoomChanged = true;
      } else {
        console.warn(
          "WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."
        );
        this.enableZoom = false;
      }
    };
    function handleMouseDownRotate(event) {
      rotateStart.set(event.clientX, event.clientY);
    }
    function handleMouseDownDolly(event) {
      dollyStart.set(event.clientX, event.clientY);
    }
    function handleMouseDownPan(event) {
      panStart.set(event.clientX, event.clientY);
    }
    const handleMouseMoveRotate = (event) => {
      rotateEnd.set(event.clientX, event.clientY);
      rotateDelta.subVectors(rotateEnd, rotateStart).multiplyScalar(this.rotateSpeed);
      const element = this.domElement;
      rotateLeft(2 * Math.PI * rotateDelta.x / element.clientHeight);
      rotateUp(2 * Math.PI * rotateDelta.y / element.clientHeight);
      rotateStart.copy(rotateEnd);
      this.update();
    };
    const handleMouseMoveDolly = (event) => {
      dollyEnd.set(event.clientX, event.clientY);
      dollyDelta.subVectors(dollyEnd, dollyStart);
      if (dollyDelta.y > 0) {
        dollyOut(getZoomScale());
      } else if (dollyDelta.y < 0) {
        dollyIn(getZoomScale());
      }
      dollyStart.copy(dollyEnd);
      this.update();
    };
    const handleMouseMovePan = (event) => {
      panEnd.set(event.clientX, event.clientY);
      panDelta.subVectors(panEnd, panStart).multiplyScalar(this.panSpeed);
      pan(panDelta.x, panDelta.y);
      panStart.copy(panEnd);
      this.update();
    };
    const handleMouseWheel = (event) => {
      if (event.deltaY < 0) {
        dollyIn(getZoomScale());
      } else if (event.deltaY > 0) {
        dollyOut(getZoomScale());
      }
      this.update();
    };
    const handleKeyDown = (event) => {
      let needsUpdate = false;
      switch (event.code) {
        case this.keys.UP:
          pan(0, this.keyPanSpeed);
          needsUpdate = true;
          break;
        case this.keys.BOTTOM:
          pan(0, -this.keyPanSpeed);
          needsUpdate = true;
          break;
        case this.keys.LEFT:
          pan(this.keyPanSpeed, 0);
          needsUpdate = true;
          break;
        case this.keys.RIGHT:
          pan(-this.keyPanSpeed, 0);
          needsUpdate = true;
          break;
      }
      if (needsUpdate) {
        event.preventDefault();
        this.update();
      }
    };
    function handleTouchStartRotate() {
      if (pointers.length === 1) {
        rotateStart.set(pointers[0].pageX, pointers[0].pageY);
      } else {
        const x = 0.5 * (pointers[0].pageX + pointers[1].pageX);
        const y = 0.5 * (pointers[0].pageY + pointers[1].pageY);
        rotateStart.set(x, y);
      }
    }
    function handleTouchStartPan() {
      if (pointers.length === 1) {
        panStart.set(pointers[0].pageX, pointers[0].pageY);
      } else {
        const x = 0.5 * (pointers[0].pageX + pointers[1].pageX);
        const y = 0.5 * (pointers[0].pageY + pointers[1].pageY);
        panStart.set(x, y);
      }
    }
    function handleTouchStartDolly() {
      const dx = pointers[0].pageX - pointers[1].pageX;
      const dy = pointers[0].pageY - pointers[1].pageY;
      const distance = Math.sqrt(dx * dx + dy * dy);
      dollyStart.set(0, distance);
    }
    const handleTouchStartDollyPan = () => {
      if (this.enableZoom)
        handleTouchStartDolly();
      if (this.enablePan)
        handleTouchStartPan();
    };
    const handleTouchStartDollyRotate = () => {
      if (this.enableZoom)
        handleTouchStartDolly();
      if (this.enableRotate)
        handleTouchStartRotate();
    };
    const handleTouchMoveRotate = (event) => {
      if (pointers.length == 1) {
        rotateEnd.set(event.pageX, event.pageY);
      } else {
        const position = getSecondPointerPosition(event);
        const x = 0.5 * (event.pageX + position.x);
        const y = 0.5 * (event.pageY + position.y);
        rotateEnd.set(x, y);
      }
      rotateDelta.subVectors(rotateEnd, rotateStart).multiplyScalar(this.rotateSpeed);
      const element = this.domElement;
      rotateLeft(2 * Math.PI * rotateDelta.x / element.clientHeight);
      rotateUp(2 * Math.PI * rotateDelta.y / element.clientHeight);
      rotateStart.copy(rotateEnd);
    };
    const handleTouchMovePan = (event) => {
      if (pointers.length === 1) {
        panEnd.set(event.pageX, event.pageY);
      } else {
        const position = getSecondPointerPosition(event);
        const x = 0.5 * (event.pageX + position.x);
        const y = 0.5 * (event.pageY + position.y);
        panEnd.set(x, y);
      }
      panDelta.subVectors(panEnd, panStart).multiplyScalar(this.panSpeed);
      pan(panDelta.x, panDelta.y);
      panStart.copy(panEnd);
    };
    const handleTouchMoveDolly = (event) => {
      const position = getSecondPointerPosition(event);
      const dx = event.pageX - position.x;
      const dy = event.pageY - position.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      dollyEnd.set(0, distance);
      dollyDelta.set(0, Math.pow(dollyEnd.y / dollyStart.y, this.zoomSpeed));
      dollyOut(dollyDelta.y);
      dollyStart.copy(dollyEnd);
    };
    const handleTouchMoveDollyPan = (event) => {
      if (this.enableZoom)
        handleTouchMoveDolly(event);
      if (this.enablePan)
        handleTouchMovePan(event);
    };
    const handleTouchMoveDollyRotate = (event) => {
      if (this.enableZoom)
        handleTouchMoveDolly(event);
      if (this.enableRotate)
        handleTouchMoveRotate(event);
    };
    this.onPointerDown = (event) => {
      if (this.enabled === false)
        return;
      if (pointers.length === 0) {
        this.domElement.addEventListener("pointermove", this.onPointerMove);
        this.domElement.addEventListener("pointerup", this.onPointerUp);
      }
      addPointer(event);
      if (event.pointerType === "touch") {
        onTouchStart(event);
      } else {
        onMouseDown(event);
      }
    };
    let pointerLock = false;
    this.onPointerMove = (event) => {
      if (this.enabled === false)
        return;
      if (!pointerLock) {
        this.domElement.setPointerCapture(event.pointerId);
        pointerLock = true;
      }
      if (event.pointerType === "touch") {
        onTouchMove(event);
      } else {
        onMouseMove(event);
      }
    };
    this.onPointerUp = (event) => {
      if (this.enabled === false)
        return;
      pointerLock = false;
      if (event.pointerType === "touch") {
        onTouchEnd();
      } else {
        onMouseUp();
      }
      removePointer(event);
      if (pointers.length === 0) {
        this.domElement.releasePointerCapture(event.pointerId);
        this.domElement.removeEventListener("pointermove", this.onPointerMove);
        this.domElement.removeEventListener("pointerup", this.onPointerUp);
      }
    };
    this.onPointerCancel = (event) => {
      removePointer(event);
    };
    const onMouseDown = (event) => {
      let mouseAction;
      switch (event.button) {
        case 0:
          mouseAction = this.mouseButtons.LEFT;
          break;
        case 1:
          mouseAction = this.mouseButtons.MIDDLE;
          break;
        case 2:
          mouseAction = this.mouseButtons.RIGHT;
          break;
        default:
          mouseAction = -1;
      }
      switch (mouseAction) {
        case MOUSE.DOLLY:
          if (this.enableZoom === false)
            return;
          handleMouseDownDolly(event);
          state = STATE.DOLLY;
          break;
        case MOUSE.ROTATE:
          if (event.ctrlKey || event.metaKey || event.shiftKey) {
            if (this.enablePan === false)
              return;
            handleMouseDownPan(event);
            state = STATE.PAN;
          } else {
            if (this.enableRotate === false)
              return;
            handleMouseDownRotate(event);
            state = STATE.ROTATE;
          }
          break;
        case MOUSE.PAN:
          if (event.ctrlKey || event.metaKey || event.shiftKey) {
            if (this.enableRotate === false)
              return;
            handleMouseDownRotate(event);
            state = STATE.ROTATE;
          } else {
            if (this.enablePan === false)
              return;
            handleMouseDownPan(event);
            state = STATE.PAN;
          }
          break;
        default:
          state = STATE.NONE;
      }
      if (state !== STATE.NONE) {
        this.dispatchEvent({ type: "start" });
      }
    };
    const onMouseMove = (event) => {
      if (this.enabled === false)
        return;
      switch (state) {
        case STATE.ROTATE:
          if (this.enableRotate === false)
            return;
          handleMouseMoveRotate(event);
          break;
        case STATE.DOLLY:
          if (this.enableZoom === false)
            return;
          handleMouseMoveDolly(event);
          break;
        case STATE.PAN:
          if (this.enablePan === false)
            return;
          handleMouseMovePan(event);
          break;
      }
    };
    const onMouseUp = (event) => {
      this.dispatchEvent({ type: "end" });
      state = STATE.NONE;
    };
    this.onMouseWheel = (event) => {
      if (this.enabled === false || this.enableZoom === false || state !== STATE.NONE)
        return;
      event.preventDefault();
      this.dispatchEvent({ type: "start" });
      handleMouseWheel(event);
      this.dispatchEvent({ type: "end" });
    };
    this.onKeyDown = (event) => {
      if (this.enabled === false || this.enablePan === false)
        return;
      handleKeyDown(event);
    };
    const onTouchStart = (event) => {
      trackPointer(event);
      switch (pointers.length) {
        case 1:
          switch (this.touches.ONE) {
            case TOUCH.ROTATE:
              if (this.enableRotate === false)
                return;
              handleTouchStartRotate();
              state = STATE.TOUCH_ROTATE;
              break;
            case TOUCH.PAN:
              if (this.enablePan === false)
                return;
              handleTouchStartPan();
              state = STATE.TOUCH_PAN;
              break;
            default:
              state = STATE.NONE;
          }
          break;
        case 2:
          switch (this.touches.TWO) {
            case TOUCH.DOLLY_PAN:
              if (this.enableZoom === false && this.enablePan === false)
                return;
              handleTouchStartDollyPan();
              state = STATE.TOUCH_DOLLY_PAN;
              break;
            case TOUCH.DOLLY_ROTATE:
              if (this.enableZoom === false && this.enableRotate === false)
                return;
              handleTouchStartDollyRotate();
              state = STATE.TOUCH_DOLLY_ROTATE;
              break;
            default:
              state = STATE.NONE;
          }
          break;
        default:
          state = STATE.NONE;
      }
      if (state !== STATE.NONE) {
        this.dispatchEvent({ type: "start" });
      }
    };
    const onTouchMove = (event) => {
      trackPointer(event);
      switch (state) {
        case STATE.TOUCH_ROTATE:
          if (this.enableRotate === false)
            return;
          handleTouchMoveRotate(event);
          this.update();
          break;
        case STATE.TOUCH_PAN:
          if (this.enablePan === false)
            return;
          handleTouchMovePan(event);
          this.update();
          break;
        case STATE.TOUCH_DOLLY_PAN:
          if (this.enableZoom === false && this.enablePan === false)
            return;
          handleTouchMoveDollyPan(event);
          this.update();
          break;
        case STATE.TOUCH_DOLLY_ROTATE:
          if (this.enableZoom === false && this.enableRotate === false)
            return;
          handleTouchMoveDollyRotate(event);
          this.update();
          break;
        default:
          state = STATE.NONE;
      }
    };
    const onTouchEnd = (event) => {
      this.dispatchEvent({ type: "end" });
      state = STATE.NONE;
    };
    this.onContextMenu = (event) => {
      if (this.enabled === false)
        return;
      event.preventDefault();
    };
    function addPointer(event) {
      pointers.push(event);
    }
    const removePointer = (event) => {
      delete pointerPositions[event.pointerId];
      for (let i = 0; i < pointers.length; i++) {
        if (pointers[i].pointerId == event.pointerId) {
          pointers.splice(i, 1);
          return;
        }
      }
    };
    function trackPointer(event) {
      let position = pointerPositions[event.pointerId];
      if (position === void 0) {
        position = new Vector2();
        pointerPositions[event.pointerId] = position;
      }
      position.set(event.pageX, event.pageY);
    }
    function getSecondPointerPosition(event) {
      const pointer = event.pointerId === pointers[0].pointerId ? pointers[1] : pointers[0];
      return pointerPositions[pointer.pointerId];
    }
    this.spherical = spherical;
    this.domElement.addEventListener("contextmenu", this.onContextMenu);
    this.domElement.addEventListener("pointerdown", this.onPointerDown);
    this.domElement.addEventListener("pointercancel", this.onPointerCancel);
    this.domElement.addEventListener("wheel", this.onMouseWheel, {
      passive: false
    });
    this.reset = () => {
      this.target.copy(this.target0);
      this.object.position.copy(this.position0);
      this.object.zoom = this.zoom0;
      this.object.updateProjectionMatrix();
      this.dispatchEvent({ type: "change" });
      this.update();
      state = STATE.NONE;
    };
    this.update();
  }
  getPolarAngle() {
    return this.spherical.phi;
  }
  getAzimuthalAngle() {
    return this.spherical.theta;
  }
  getDistance() {
    return this.object.position.distanceTo(this.target);
  }
  listenToKeyEvents(domElement) {
    domElement.addEventListener("keydown", this.onKeyDown);
    this._domElementKeyEvents = domElement;
  }
  saveState() {
    this.target0.copy(this.target);
    this.position0.copy(this.object.position);
    this.zoom0 = this.object.zoom;
  }
  setCamera(camera) {
    this.object = camera;
  }
  setDom(dom) {
    this.dispose();
    this.domElement = dom;
    this.domElement.addEventListener("contextmenu", this.onContextMenu);
    this.domElement.addEventListener("pointerdown", this.onPointerDown);
    this.domElement.addEventListener("pointercancel", this.onPointerCancel);
    this.domElement.addEventListener("wheel", this.onMouseWheel, {
      passive: false
    });
  }
  dispose() {
    this.domElement.removeEventListener("contextmenu", this.onContextMenu);
    this.domElement.removeEventListener("pointerdown", this.onPointerDown);
    this.domElement.removeEventListener("pointercancel", this.onPointerCancel);
    this.domElement.removeEventListener("wheel", this.onMouseWheel);
    this.domElement.removeEventListener("pointermove", this.onPointerMove);
    this.domElement.removeEventListener("pointerup", this.onPointerUp);
    if (this._domElementKeyEvents !== null) {
      this._domElementKeyEvents.removeEventListener("keydown", this.onKeyDown);
    }
  }
}
class VisSelectionBox {
}
class VisSelectionHelper {
  constructor(selectColor = "rgb(230, 20, 240)", selectBgColor = "rgba(230, 20, 240, 0.15)") {
    __publicField(this, "element");
    __publicField(this, "startPoint");
    __publicField(this, "pointTopLeft");
    __publicField(this, "pointBottomRight");
    __publicField(this, "isDown");
    const element = document.createElement("div");
    element.style.pointerEvents = "none";
    element.style.border = `1px solid ${selectColor}`;
    element.style.position = "fixed";
    element.style.zIndex = "100";
    element.style.backgroundColor = selectBgColor;
    this.element = element;
    this.startPoint = new Vector2();
    this.pointTopLeft = new Vector2();
    this.pointBottomRight = new Vector2();
    this.isDown = false;
  }
  onSelectStart(event) {
    this.isDown = true;
    document.body.appendChild(this.element);
    this.element.style.left = event.clientX + "px";
    this.element.style.top = event.clientY + "px";
    this.element.style.width = "0px";
    this.element.style.height = "0px";
    this.startPoint.x = event.clientX;
    this.startPoint.y = event.clientY;
  }
  onSelectMove(event) {
    if (!this.isDown) {
      return;
    }
    this.pointBottomRight.x = Math.max(this.startPoint.x, event.clientX);
    this.pointBottomRight.y = Math.max(this.startPoint.y, event.clientY);
    this.pointTopLeft.x = Math.min(this.startPoint.x, event.clientX);
    this.pointTopLeft.y = Math.min(this.startPoint.y, event.clientY);
    this.element.style.left = this.pointTopLeft.x + "px";
    this.element.style.top = this.pointTopLeft.y + "px";
    this.element.style.width = this.pointBottomRight.x - this.pointTopLeft.x + "px";
    this.element.style.height = this.pointBottomRight.y - this.pointTopLeft.y + "px";
  }
  onSelectOver(event) {
    if (!this.isDown) {
      return;
    }
    this.isDown = false;
    document.body.removeChild(this.element);
  }
}
class ImageTexture extends Texture {
  constructor(image, mapping, wrapS, wrapT, magFilter, minFilter, format, type, anisotropy, encoding) {
    super(
      image,
      mapping,
      wrapS,
      wrapT,
      magFilter,
      minFilter,
      format,
      type,
      anisotropy,
      encoding
    );
  }
}
class LoadTexture extends Texture {
  constructor(texture) {
    super();
    Object.keys(texture).forEach((key) => {
      this[key] = texture[key];
    });
    this.copy(texture);
  }
}
class CSS2DPlane extends VisCSS2DObject {
  constructor(element = document.createElement("div")) {
    super(element);
    __publicField(this, "cacheBox", new Box3());
    __publicField(this, "viewWorldMatrix", new Matrix4());
    __publicField(this, "mvPosition", new Vector3());
    __publicField(this, "matrixScale", new Vector3());
    __publicField(this, "worldScale", new Vector3());
    __publicField(this, "vA", new Vector3());
    __publicField(this, "vB", new Vector3());
    __publicField(this, "vC", new Vector3());
    __publicField(this, "alignedPosition", new Vector2());
    __publicField(this, "rotatedPosition", new Vector2());
    __publicField(this, "intersectPoint", new Vector3());
    this.type = "CSS2DPlane";
    this.element.classList.add("vis-css2d", "vis-css2d-plane");
    const observer = new MutationObserver(() => {
      this.matrixScale.set(
        Math.abs(this.width / 100) * 0.1,
        Math.abs(this.height / 100) * 0.1,
        1
      );
    });
    observer.observe(this.element, {
      attributeFilter: ["style"]
    });
  }
  transformVertex(vertexPosition, mvPosition, scale) {
    const alignedPosition = this.alignedPosition;
    const rotatedPosition = this.rotatedPosition;
    const sin = 0;
    const cos = 1;
    alignedPosition.copy(vertexPosition).multiply(scale);
    {
      rotatedPosition.x = cos * alignedPosition.x - sin * alignedPosition.y;
      rotatedPosition.y = sin * alignedPosition.x + cos * alignedPosition.y;
    }
    vertexPosition.copy(mvPosition);
    vertexPosition.x += rotatedPosition.x;
    vertexPosition.y += rotatedPosition.y;
    vertexPosition.applyMatrix4(this.viewWorldMatrix);
  }
  raycast(raycaster, intersects) {
    if (raycaster.camera === null) {
      console.error(
        'THREE.Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'
      );
    }
    this.viewWorldMatrix.copy(raycaster.camera.matrixWorld);
    this.modelViewMatrix.multiplyMatrices(
      raycaster.camera.matrixWorldInverse,
      this.matrixWorld
    );
    this.mvPosition.setFromMatrixPosition(this.modelViewMatrix);
    this.worldScale.copy(this.matrixScale).multiplyScalar(-this.mvPosition.z);
    this.transformVertex(
      this.vA.set(-0.5, -0.5, 0),
      this.mvPosition,
      this.worldScale
    );
    this.transformVertex(
      this.vB.set(0.5, -0.5, 0),
      this.mvPosition,
      this.worldScale
    );
    this.transformVertex(
      this.vC.set(0.5, 0.5, 0),
      this.mvPosition,
      this.worldScale
    );
    let intersect = raycaster.ray.intersectTriangle(
      this.vA,
      this.vB,
      this.vC,
      false,
      this.intersectPoint
    );
    if (intersect === null) {
      this.transformVertex(
        this.vB.set(-0.5, 0.5, 0),
        this.mvPosition,
        this.worldScale
      );
      intersect = raycaster.ray.intersectTriangle(
        this.vA,
        this.vC,
        this.vB,
        false,
        this.intersectPoint
      );
      if (intersect === null) {
        return;
      }
    }
    const distance = raycaster.ray.origin.distanceTo(this.intersectPoint);
    if (distance < raycaster.near || distance > raycaster.far)
      return;
    intersects.push({
      distance,
      point: this.intersectPoint.clone(),
      face: null,
      object: this
    });
  }
}
class CSS3DPlane extends VisCSS3DObject {
  constructor(element = document.createElement("div")) {
    super(element);
    __publicField(this, "cacheBox", new Box3());
    this.type = "CSS3DPlane";
    this.element.classList.add("vis-css3d", "vis-css3d-plane");
  }
  raycast(raycaster, intersects) {
    const box = this.cacheBox.copy(this.geometry.boundingBox);
    box.applyMatrix4(this.matrixWorld);
    if (raycaster.ray.intersectsBox(box)) {
      intersects.push({
        distance: raycaster.ray.origin.distanceTo(this.position),
        object: this,
        point: this.position
      });
    }
  }
}
class CSS3DSprite extends VisCSS3DSprite {
  constructor(element = document.createElement("div")) {
    super(element);
    this.type = "CSS3DSprite";
    this.element.classList.add("vis-css3d", "vis-css3d-plane");
  }
}
class LoadGeometry extends BufferGeometry {
  constructor(geometry) {
    super();
    __publicField(this, "type", "LoadBufferGeometry");
    geometry && this.copy(geometry);
  }
}
class CurveGeometry extends BufferGeometry {
  constructor(path = [], divisions = 36, space = true) {
    super();
    __publicField(this, "parameters");
    this.type = "CurveGeometry";
    this.parameters = {
      path: path.map((vector3) => vector3.clone()),
      space,
      divisions
    };
  }
}
class CubicBezierCurveGeometry extends CurveGeometry {
  constructor(path = [], divisions = 36, space = true) {
    super(path, divisions, space);
    this.type = "CubicBezierCurveGeometry";
    const curvePath = new CurvePath();
    if (path.length < 4) {
      console.warn(`CubicBezierCurveGeometry path length at least 4.`);
      return;
    }
    const length = 4 + (path.length - 4) - (path.length - 4) % 3;
    for (let i = 2; i < length; i += 3) {
      curvePath.add(
        new CubicBezierCurve3(path[i - 2], path[i - 1], path[i], path[i + 1])
      );
    }
    const totalArcLengthDivisions = curvePath.curves.reduce((sum, curve) => {
      return sum += curve.arcLengthDivisions;
    }, 0);
    if (divisions > totalArcLengthDivisions) {
      const mutily = Math.ceil(
        (divisions - totalArcLengthDivisions) / curvePath.curves.length
      );
      curvePath.curves.forEach((curve) => {
        curve.arcLengthDivisions = curve.arcLengthDivisions * (mutily + 1);
        curve.updateArcLengths();
      });
    }
    this.setFromPoints(
      space ? curvePath.getSpacedPoints(divisions) : curvePath.getPoints(divisions)
    );
  }
}
class LineCurveGeometry extends CurveGeometry {
  constructor(path = [], divisions = 36, space = true) {
    super(path, divisions, space);
    this.type = "LineCurveGeometry";
    if (!path.length) {
      console.warn(`LineCurveGeometry path length at least 1.`);
      return;
    }
    const curvePath = new CurvePath();
    for (let i = 1; i < path.length; i += 1) {
      curvePath.add(new LineCurve3(path[i - 1], path[i]));
    }
    const totalArcLengthDivisions = curvePath.curves.reduce((sum, curve) => {
      return sum += curve.arcLengthDivisions;
    }, 0);
    if (divisions > totalArcLengthDivisions) {
      const mutily = Math.ceil(
        (divisions - totalArcLengthDivisions) / curvePath.curves.length
      );
      curvePath.curves.forEach((curve) => {
        curve.arcLengthDivisions = curve.arcLengthDivisions * (mutily + 1);
        curve.updateArcLengths();
      });
    }
    this.setFromPoints(
      space ? curvePath.getSpacedPoints(divisions) : curvePath.getPoints(divisions)
    );
  }
}
class QuadraticBezierCurveGeometry extends CurveGeometry {
  constructor(path = [], divisions = 36, space = true) {
    super(path, divisions, space);
    this.type = "QuadraticBezierCurveGeometry";
    const curvePath = new CurvePath();
    if (path.length < 3) {
      console.warn(`QuadraticBezierCurveGeometry path length at least 3.`);
      return;
    }
    const length = 3 + (path.length - 3) - (path.length - 3) % 2;
    for (let i = 1; i < length; i += 2) {
      curvePath.add(
        new QuadraticBezierCurve3(path[i - 1], path[i], path[i + 1])
      );
    }
    const totalArcLengthDivisions = curvePath.curves.reduce((sum, curve) => {
      return sum += curve.arcLengthDivisions;
    }, 0);
    if (divisions > totalArcLengthDivisions) {
      const mutily = Math.ceil(
        (divisions - totalArcLengthDivisions) / curvePath.curves.length
      );
      curvePath.curves.forEach((curve) => {
        curve.arcLengthDivisions = curve.arcLengthDivisions * (mutily + 1);
        curve.updateArcLengths();
      });
    }
    this.setFromPoints(
      space ? curvePath.getSpacedPoints(divisions) : curvePath.getPoints(divisions)
    );
  }
}
class SplineCurveGeometry extends CurveGeometry {
  constructor(path = [], divisions = 36, space = true) {
    super(path, divisions, space);
    this.type = "SplineCurveGeometry";
    if (!path.length) {
      console.warn(`SplineCurveGeometry path length at least 1.`);
      return;
    }
    const splineCurve = new CatmullRomCurve3(path);
    this.setFromPoints(
      space ? splineCurve.getSpacedPoints(divisions) : splineCurve.getPoints(divisions)
    );
  }
}
class LineShapeGeometry extends ShapeBufferGeometry {
  constructor(path = [new Vector2(0, 0)], curveSegments = 12) {
    const lineShape = new Shape();
    const move = path[0];
    if (move) {
      lineShape.moveTo(move.x, move.y);
      for (let i = 1; i < path.length; i += 1) {
        lineShape.lineTo(path[i].x, path[i].y);
      }
    }
    super(lineShape, curveSegments);
    this.type = "LineShapeGeometry";
  }
}
class LineTubeGeometry extends TubeGeometry {
  constructor(path = [], tubularSegments = 64, radius = 1, radialSegments = 8, closed = false) {
    if (!path.length) {
      console.warn(`LineTubeGeometry path length at least 1.`);
      return;
    }
    const curvePath = new CurvePath();
    for (let i = 1; i < path.length; i += 1) {
      curvePath.add(new LineCurve3(path[i - 1], path[i]));
    }
    super(curvePath, tubularSegments, radius, radialSegments, closed);
    this.type = "LineTubeGeometry";
  }
}
class SplineTubeGeometry extends TubeGeometry {
  constructor(path = [], tubularSegments = 64, radius = 1, radialSegments = 8, closed = false) {
    if (!path.length) {
      console.warn(`SplineTubeGeometry path length at least 1.`);
      return;
    }
    const splineCurve = new CatmullRomCurve3(path);
    super(splineCurve, tubularSegments, radius, radialSegments, closed);
    this.type = "SplineTubeGeometry";
  }
}
const defineStrategy = function(options) {
  return () => options;
};
export { CSS2DPlane, CSS3DPlane, CSS3DSprite, CubicBezierCurveGeometry, CurveGeometry, ENGINE_EVENT, Engine, EventDispatcher, ImageTexture, LineCurveGeometry, LineShapeGeometry, LineTubeGeometry, LoadGeometry, LoadTexture, QuadraticBezierCurveGeometry, SplineCurveGeometry, SplineTubeGeometry, VideoTexture, VisCSS2DObject, VisCSS3DObject, VisCSS3DSprite, VisOrbitControls, VisSelectionBox, VisSelectionHelper, defineEngine, definePlugin, defineStrategy };
