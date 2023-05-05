var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
import { ENGINE_EVENT } from "@vis-three/core";
import { PLUGINS, POINTER_MANAGER_PLUGIN } from "@vis-three/middleware";
import { transPkgName } from "@vis-three/utils";
import { CanvasGenerator } from "@vis-three/convenient";
import { CanvasTexture, Points, PointsMaterial, AlwaysDepth, Raycaster, Plane, Vector3, Quaternion, BufferAttribute } from "three";
const name = "@vis-three/plugin-path-support-controls";
const anchorTexture = new CanvasTexture(
  new CanvasGenerator({ width: 32, height: 32 }).draw((ctx) => {
    ctx.beginPath();
    ctx.fillStyle = "rgba(0, 0, 0, 0)";
    ctx.fillRect(0, 0, 32, 32);
    ctx.closePath();
    ctx.beginPath();
    ctx.fillStyle = "rgb(0, 255, 238)";
    ctx.strokeStyle = "black";
    ctx.lineWidth = 1;
    ctx.arc(16, 16, 15, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.fill();
    ctx.closePath();
  }).getDom()
);
const _PathSupportControls = class extends Points {
  constructor(camera, dom, object, config) {
    super();
    __publicField(this, "dragging", false);
    __publicField(this, "raycaster", new Raycaster());
    __publicField(this, "plane", new Plane());
    __publicField(this, "pointerManager");
    __publicField(this, "cachePlaneVector3", new Vector3());
    __publicField(this, "cacheQuaternion", new Quaternion());
    __publicField(this, "cacheNormal", new Vector3());
    __publicField(this, "cachePosition", new Vector3());
    __publicField(this, "index", 0);
    __publicField(this, "domElement");
    __publicField(this, "camera");
    __publicField(this, "config");
    __publicField(this, "object");
    __publicField(this, "_pointerHover", this.pointerHover.bind(this));
    __publicField(this, "_pointerMove", this.pointerMove.bind(this));
    __publicField(this, "_pointerDown", this.pointerDown.bind(this));
    __publicField(this, "_pointerUp", this.pointerUp.bind(this));
    this.material = _PathSupportControls.commonMaterial;
    this.renderOrder = Infinity;
    this.matrixAutoUpdate = false;
    config && this.setConfig(config);
    object && this.setObject(object);
    this.setDom(dom).setCamera(camera).connect();
  }
  setDom(dom) {
    if (this.domElement) {
      this.disconnect();
    }
    this.domElement = dom;
    this.connect();
    return this;
  }
  setCamera(camera) {
    this.camera = camera;
    return this;
  }
  setObject(object) {
    this.object = object;
    this.matrix = object.matrix;
    this.matrixWorld = object.matrixWorld;
    return this;
  }
  setConfig(config) {
    this.config = config;
    const position = [];
    this.config.curves.forEach((segment, i, arr) => {
      if (i === arr.length - 1) {
        position.push(
          segment.params[0],
          segment.params[1],
          0,
          segment.params[segment.params.length - 2],
          segment.params[segment.params.length - 1],
          0
        );
      } else {
        position.push(segment.params[0], segment.params[1], 0);
      }
    });
    this.geometry.setAttribute(
      "position",
      new BufferAttribute(new Float32Array(position), 3)
    );
    this.geometry.getAttribute("position").needsUpdate = true;
    return this;
  }
  update() {
    this.setConfig(this.config);
  }
  use(pointerManager) {
    this.pointerManager = pointerManager;
  }
  connect() {
    if (this.object && this.config) {
      this.domElement.addEventListener("pointermove", this._pointerHover);
      this.domElement.addEventListener("mousedown", this._pointerDown);
    }
    return this;
  }
  disconnect() {
    this.domElement.removeEventListener("pointermove", this._pointerHover);
    this.domElement.removeEventListener("mousedown", this._pointerDown);
    return this;
  }
  dispose() {
    this.geometry.dispose();
    if (Array.isArray(this.material)) {
      this.material.forEach((m) => {
        m.dispose();
      });
    } else {
      this.material.dispose();
    }
  }
  intersectPoint(event) {
    this.raycaster.setFromCamera(this.pointerManager.mouse, this.camera);
    const intersect = this.raycaster.intersectObject(this);
    if (intersect.length) {
      return intersect[0].index;
    }
    return null;
  }
  intersectPlane(event) {
    this.raycaster.setFromCamera(this.pointerManager.mouse, this.camera);
    return this.raycaster.ray.intersectPlane(
      this.plane,
      this.cachePlaneVector3
    );
  }
  pointerHover(event) {
    if (this.dragging || !this.visible) {
      return;
    }
    const intersectPoint = this.intersectPoint(event);
    if (Number.isInteger(intersectPoint)) {
      this.domElement.style.cursor = "move";
    } else {
      this.domElement.style.cursor = "";
    }
  }
  pointerDown(event) {
    if (!this.visible) {
      return;
    }
    this.cacheQuaternion.setFromRotationMatrix(this.object.matrixWorld);
    this.cacheNormal.set(0, 0, 1).applyQuaternion(this.cacheQuaternion);
    this.cachePosition.setFromMatrixPosition(this.object.matrixWorld);
    this.plane.set(this.cacheNormal, this.cachePosition.length());
    const intersectPoint = this.intersectPoint(event);
    if (typeof intersectPoint === "number") {
      this.index = intersectPoint;
      this.dragging = true;
      this.domElement.addEventListener("mousemove", this._pointerMove);
      this.domElement.addEventListener("mouseup", this._pointerUp);
    }
  }
  pointerMove(event) {
    if (!this.visible && !this.dragging) {
      return;
    }
    const vect = this.intersectPlane(event);
    if (!vect) {
      return;
    }
    vect.sub(this.cachePosition);
    const length = this.config.curves.length;
    if (this.index !== this.config.curves.length) {
      const segment = this.config.curves[this.index];
      segment.params[0] = vect.x;
      segment.params[1] = vect.y;
    } else {
      const segment = this.config.curves[length - 1];
      segment.params[segment.params.length - 2] = vect.x;
      segment.params[segment.params.length - 1] = vect.y;
    }
    const position = this.geometry.getAttribute("position");
    const array = position.array;
    array[this.index * 3] = vect.x;
    array[this.index * 3 + 1] = vect.y;
    position.needsUpdate = true;
  }
  pointerUp(event) {
    this.dragging = false;
    this.domElement.removeEventListener("mousemove", this._pointerMove);
    this.domElement.removeEventListener("mouseup", this._pointerUp);
    this.geometry.computeBoundingSphere();
    this.geometry.computeBoundingBox();
  }
};
let PathSupportControls = _PathSupportControls;
__publicField(PathSupportControls, "commonMaterial", new PointsMaterial({
  map: anchorTexture,
  transparent: true,
  depthFunc: AlwaysDepth,
  alphaTest: 0.01,
  sizeAttenuation: false,
  size: 15
}));
const PATH_SUPPORT_CONTROLS_PLUGIN = transPkgName(name);
const PathSupportControlsPlugin = function() {
  let setCameraFun;
  let setDomFun;
  return {
    name: PATH_SUPPORT_CONTROLS_PLUGIN,
    deps: [...PLUGINS, POINTER_MANAGER_PLUGIN],
    install(engine) {
      const controls = new PathSupportControls(
        engine.camera,
        engine.dom
      );
      setDomFun = (event) => {
        controls.setDom(event.dom);
      };
      setCameraFun = (event) => {
        controls.setCamera(engine.camera);
      };
      engine.addEventListener(ENGINE_EVENT.SETDOM, setDomFun);
      engine.addEventListener(ENGINE_EVENT.SETCAMERA, setCameraFun);
    },
    dispose(engine) {
      engine.removeEventListener(ENGINE_EVENT.SETDOM, setDomFun);
      engine.removeEventListener(ENGINE_EVENT.SETCAMERA, setCameraFun);
      engine.pathSupportControls.disconnect().dispose();
      delete engine.pathSupportControls;
    }
  };
};
export { PATH_SUPPORT_CONTROLS_PLUGIN, PathSupportControlsPlugin };
