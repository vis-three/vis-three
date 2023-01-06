var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
import { OrthographicCamera, AmbientLight, RectAreaLight, HemisphereLight, PerspectiveCamera, Scene, Texture, RGBFormat, LinearFilter, PlaneBufferGeometry, Box3, Vector3, Quaternion, Matrix4, Vector2, BufferGeometry, CurvePath, CubicBezierCurve3, LineCurve3, QuadraticBezierCurve3, CatmullRomCurve3, ShapeBufferGeometry, Shape, TubeGeometry } from "three";
import { RectAreaLightUniformsLib } from "three/examples/jsm/lights/RectAreaLightUniformsLib.js";
import { LightShadow } from "three/src/lights/LightShadow";
import { CSS2DObject } from "three/examples/jsm/renderers/CSS2DRenderer";
import { CSS3DObject, CSS3DSprite as CSS3DSprite$1 } from "three/examples/jsm/renderers/CSS3DRenderer";
const version = "0.5.0";
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
var ENGINE_EVENT;
(function(ENGINE_EVENT2) {
  ENGINE_EVENT2["SETDOM"] = "setDom";
  ENGINE_EVENT2["SETSIZE"] = "setSize";
  ENGINE_EVENT2["SETCAMERA"] = "setCamera";
  ENGINE_EVENT2["SETSCENE"] = "setScene";
  ENGINE_EVENT2["DISPOSE"] = "dispose";
})(ENGINE_EVENT || (ENGINE_EVENT = {}));
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
    this.camera.lookAt(0, 0, 0);
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
        console.error(`${plugin.name} must install this plugin before: ${name}`);
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
        console.warn(`${strategy.name} does not meet the conditions for execution: ${plugin}`);
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
      type: ENGINE_EVENT.SETDOM,
      dom
    });
    return this;
  }
  setSize(width, height) {
    var _a, _b;
    if (width && width <= 0 || height && height <= 0) {
      console.warn(`you must be input width and height bigger then zero, width: ${width}, height: ${height}`);
      return this;
    }
    !width && (width = ((_a = this.dom) == null ? void 0 : _a.offsetWidth) || window.innerWidth);
    !height && (height = ((_b = this.dom) == null ? void 0 : _b.offsetHeight) || window.innerHeight);
    this.dispatchEvent({ type: ENGINE_EVENT.SETSIZE, width, height });
    return this;
  }
  setCamera(camera, options) {
    this.dispatchEvent({
      type: ENGINE_EVENT.SETCAMERA,
      camera,
      oldCamera: this.camera,
      options: Object.assign({
        orbitControls: true,
        transformControls: true
      }, options || {})
    });
    this.camera = camera;
    return this;
  }
  setScene(scene) {
    this.dispatchEvent({
      type: ENGINE_EVENT.SETSCENE,
      scene,
      oldScene: this.scene
    });
    this.scene = scene;
    return this;
  }
  dispose() {
    this.dispatchEvent({
      type: ENGINE_EVENT.DISPOSE
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
export { CSS2DPlane, CSS3DPlane, CSS3DSprite, CubicBezierCurveGeometry, CurveGeometry, ENGINE_EVENT, Engine, EventDispatcher, ImageTexture, LineCurveGeometry, LineShapeGeometry, LineTubeGeometry, LoadGeometry, LoadTexture, QuadraticBezierCurveGeometry, SplineCurveGeometry, SplineTubeGeometry, VideoTexture, VisCSS2DObject, VisCSS3DObject, VisCSS3DSprite, defineEngine, definePlugin, defineStrategy };
