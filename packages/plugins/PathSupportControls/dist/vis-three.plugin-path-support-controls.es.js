var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
import { ENGINE_EVENT } from "@vis-three/core";
import { PLUGINS, POINTER_MANAGER_PLUGIN } from "@vis-three/middleware";
import { getArcDetail, transPkgName } from "@vis-three/utils";
import { CanvasTexture, Object3D, PointsMaterial, AlwaysDepth, Raycaster, Points, BufferGeometry, Plane, Vector3, Quaternion, BufferAttribute } from "three";
import { CanvasGenerator } from "@vis-three/convenient";
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
const moveTexture = new CanvasTexture(
  new CanvasGenerator({ width: 32, height: 32 }).draw((ctx) => {
    ctx.beginPath();
    ctx.fillStyle = "rgba(0, 0, 0, 0)";
    ctx.fillRect(0, 0, 32, 32);
    ctx.closePath();
    ctx.beginPath();
    ctx.fillStyle = "rgb(255, 248, 0)";
    ctx.strokeStyle = "black";
    ctx.lineWidth = 1;
    ctx.arc(16, 16, 15, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.fill();
    ctx.closePath();
  }).getDom()
);
const switchTexture = new CanvasTexture(
  new CanvasGenerator({ width: 32, height: 32 }).draw((ctx) => {
    ctx.beginPath();
    ctx.fillStyle = "rgba(0, 0, 0, 0)";
    ctx.fillRect(0, 0, 32, 32);
    ctx.closePath();
    ctx.beginPath();
    ctx.fillStyle = "rgb(255, 0, 0)";
    ctx.strokeStyle = "black";
    ctx.lineWidth = 1;
    ctx.moveTo(1, 0);
    ctx.lineTo(31, 16);
    ctx.lineTo(0, 31);
    ctx.lineTo(1, 0);
    ctx.stroke();
    ctx.fill();
    ctx.closePath();
  }).getDom()
);
const _PathSupportControls = class extends Object3D {
  constructor(camera, dom, object, config) {
    super();
    __publicField(this, "dragging", false);
    __publicField(this, "raycaster", new Raycaster());
    __publicField(this, "anchorGizmo", new Points(
      new BufferGeometry(),
      _PathSupportControls.anchorMaterial
    ));
    __publicField(this, "moveGizmo", new Points(
      new BufferGeometry(),
      _PathSupportControls.moveMaterial
    ));
    __publicField(this, "switchGizmo", new Points(
      new BufferGeometry(),
      _PathSupportControls.switchMaterial
    ));
    __publicField(this, "plane", new Plane());
    __publicField(this, "pointerManager");
    __publicField(this, "cachePlaneVector3", new Vector3());
    __publicField(this, "cacheQuaternion", new Quaternion());
    __publicField(this, "cacheNormal", new Vector3());
    __publicField(this, "cachePosition", new Vector3());
    __publicField(this, "cacheVertical", 0);
    __publicField(this, "cacheMouseDownPoistion", new Vector3());
    __publicField(this, "cacheMouseMoveDirection", new Vector3());
    __publicField(this, "geometryIndexFunMap", {
      arcVertical: [],
      arcClockwise: [],
      bezierCP1: [],
      bezierCP2: [],
      quadraticCP1: []
    });
    __publicField(this, "anchorArcUpdateIndexs", []);
    __publicField(this, "arcVecticalDirectionsMap", {});
    __publicField(this, "cacheConfigIndex", 0);
    __publicField(this, "currentGuizmo");
    __publicField(this, "currentIndex", 0);
    __publicField(this, "domElement");
    __publicField(this, "camera");
    __publicField(this, "config");
    __publicField(this, "object");
    __publicField(this, "_pointerHover", this.pointerHover.bind(this));
    __publicField(this, "_pointerMove", this.pointerMove.bind(this));
    __publicField(this, "_pointerDown", this.pointerDown.bind(this));
    __publicField(this, "_pointerUp", this.pointerUp.bind(this));
    this.anchorGizmo.type = "PathSupportControlsAnchorGizmo";
    this.moveGizmo.type = "PathSupportControlsMoveGizmo";
    this.switchGizmo.type = "PathSupportControlsSwitchGizmo";
    this.add(this.anchorGizmo, this.moveGizmo, this.switchGizmo);
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
    this.geometryIndexFunMap = {
      arcVertical: [],
      arcClockwise: [],
      bezierCP1: [],
      bezierCP2: [],
      quadraticCP1: []
    };
    this.arcVecticalDirectionsMap = {};
    this.anchorArcUpdateIndexs = [];
    this.config = config;
    const anchor = [];
    const switchs = [];
    const move = [];
    const geometryIndexFunMap = this.geometryIndexFunMap;
    const arcVecticalDirectionsMap = this.arcVecticalDirectionsMap;
    this.config.curves.forEach((segment, i, arr) => {
      if (i === arr.length - 1) {
        anchor.push(
          segment.params[0],
          segment.params[1],
          0,
          segment.params[segment.params.length - 2],
          segment.params[segment.params.length - 1],
          0
        );
      } else {
        anchor.push(segment.params[0], segment.params[1], 0);
      }
      if (segment.curve === "arc") {
        this.anchorArcUpdateIndexs.push(i, i + 1);
        const arcDetail = getArcDetail(
          ...segment.params
        );
        move.push(arcDetail.center.x, arcDetail.center.y, 0);
        geometryIndexFunMap.arcVertical.push(move.length / 3 - 1);
        arcVecticalDirectionsMap[move.length / 3 - 1] = {
          segment: i,
          direction: new Vector3(
            arcDetail.verticalDirection.x,
            arcDetail.verticalDirection.y,
            0
          )
        };
        const harf = arcDetail.mid.clone().sub(arcDetail.start).multiplyScalar(0.5);
        const clockwisePosition = arcDetail.start.clone().add(harf);
        switchs.push(clockwisePosition.x, clockwisePosition.y, 0);
        geometryIndexFunMap.arcClockwise.push(i);
      }
    });
    const updateGizmoGeometry = function(gizmo, position) {
      const geometry = gizmo.geometry;
      geometry.setAttribute(
        "position",
        new BufferAttribute(new Float32Array(position), 3)
      );
      geometry.getAttribute("position").needsUpdate = true;
      geometry.computeBoundingBox();
      geometry.computeBoundingSphere();
    };
    updateGizmoGeometry(this.anchorGizmo, anchor);
    updateGizmoGeometry(this.moveGizmo, move);
    updateGizmoGeometry(this.switchGizmo, switchs);
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
    const dispose = (object) => {
      object.geometry.dispose();
      if (Array.isArray(object.material)) {
        object.material.forEach((m) => {
          m.dispose();
        });
      } else {
        object.material.dispose();
      }
    };
    dispose(this.anchorGizmo);
    dispose(this.moveGizmo);
    dispose(this.switchGizmo);
  }
  intersectPoint(event) {
    this.raycaster.setFromCamera(this.pointerManager.mouse, this.camera);
    const intersect = this.raycaster.intersectObject(this, true);
    if (intersect.length) {
      this.currentGuizmo = intersect[0].object;
      this.currentIndex = intersect[0].index;
      return {
        guizmo: this.currentGuizmo,
        index: this.currentIndex
      };
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
    if (Number.isInteger(intersectPoint == null ? void 0 : intersectPoint.index)) {
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
    if (intersectPoint) {
      this.dragging = true;
      if (this.currentGuizmo === this.switchGizmo) {
        const configIndex = this.geometryIndexFunMap.arcClockwise[this.currentIndex];
        const currentSegment = this.config.curves[configIndex];
        this.dispatchEvent({
          type: "mousedown",
          index: configIndex,
          config: this.config,
          operate: "switch"
        });
        currentSegment.params[3] = !currentSegment.params[3];
        this.dispatchEvent({
          type: "changing",
          index: configIndex,
          config: this.config,
          operate: "switch"
        });
        this.cacheConfigIndex = configIndex;
        this.domElement.addEventListener("mouseup", this._pointerUp);
        return;
      }
      this.cacheMouseDownPoistion.copy(this.intersectPlane(event)).sub(this.cachePosition);
      if (this.currentGuizmo === this.moveGizmo) {
        if (this.geometryIndexFunMap.arcVertical.includes(this.currentIndex)) {
          const message = this.arcVecticalDirectionsMap[this.currentIndex];
          this.cacheVertical = this.config.curves[message.segment].params[2];
          this.dispatchEvent({
            type: "mousedown",
            index: message.segment,
            config: this.config,
            operate: "move"
          });
          this.cacheConfigIndex = message.segment;
        }
      }
      const cacheConfigIndex = this.currentIndex === this.config.curves.length ? this.currentIndex - 1 : this.currentIndex;
      this.dispatchEvent({
        type: "mousedown",
        index: cacheConfigIndex,
        config: this.config,
        operate: "anchor"
      });
      this.cacheConfigIndex = cacheConfigIndex;
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
    this.cacheMouseMoveDirection.copy(vect).sub(this.cacheMouseDownPoistion).normalize();
    const currentGuizmo = this.currentGuizmo;
    const currentIndex = this.currentIndex;
    const config = this.config;
    const cacheConfigIndex = this.cacheConfigIndex;
    const geometryIndexFunMap = this.geometryIndexFunMap;
    if (currentGuizmo === this.anchorGizmo) {
      const length = config.curves.length;
      if (currentIndex !== config.curves.length) {
        const segment = config.curves[currentIndex];
        segment.params[0] = vect.x;
        segment.params[1] = vect.y;
      } else {
        const segment = config.curves[length - 1];
        segment.params[segment.params.length - 2] = vect.x;
        segment.params[segment.params.length - 1] = vect.y;
      }
      const position = this.anchorGizmo.geometry.getAttribute("position");
      const array = position.array;
      array[currentIndex * 3] = vect.x;
      array[currentIndex * 3 + 1] = vect.y;
      position.needsUpdate = true;
      if (this.anchorArcUpdateIndexs.includes(this.currentIndex)) {
        this.update();
      }
      this.dispatchEvent({
        type: "changing",
        index: cacheConfigIndex,
        config: this.config,
        operate: "anchor"
      });
    } else if (currentGuizmo === this.moveGizmo) {
      if (geometryIndexFunMap.arcVertical.includes(currentIndex)) {
        const message = this.arcVecticalDirectionsMap[currentIndex];
        const angle = this.cacheMouseMoveDirection.angleTo(message.direction);
        config.curves[message.segment].params[2] = this.cacheVertical + vect.sub(this.cacheMouseDownPoistion).length() * Math.cos(angle);
        const arcDetail = getArcDetail(
          ...config.curves[message.segment].params
        );
        const position = this.moveGizmo.geometry.getAttribute("position");
        const array = position.array;
        array[currentIndex * 3] = arcDetail.center.x;
        array[currentIndex * 3 + 1] = arcDetail.center.y;
        position.needsUpdate = true;
        this.dispatchEvent({
          type: "changing",
          index: message.segment,
          config: this.config,
          operate: "move"
        });
      }
    }
  }
  pointerUp(event) {
    this.dragging = false;
    this.domElement.removeEventListener("mousemove", this._pointerMove);
    this.domElement.removeEventListener("mouseup", this._pointerUp);
    if (this.currentGuizmo) {
      this.currentGuizmo.geometry.computeBoundingSphere();
      this.currentGuizmo.geometry.computeBoundingBox();
    }
    this.dispatchEvent({
      type: "mouseup",
      index: this.cacheConfigIndex,
      config: this.config,
      operate: this.currentGuizmo === this.anchorGizmo ? "anchor" : this.currentGuizmo === this.moveGizmo ? "move" : "switch"
    });
  }
};
let PathSupportControls = _PathSupportControls;
__publicField(PathSupportControls, "anchorMaterial", new PointsMaterial({
  map: anchorTexture,
  transparent: true,
  depthFunc: AlwaysDepth,
  alphaTest: 0.01,
  sizeAttenuation: false,
  size: 15
}));
__publicField(PathSupportControls, "moveMaterial", new PointsMaterial({
  map: moveTexture,
  transparent: true,
  depthFunc: AlwaysDepth,
  alphaTest: 0.01,
  sizeAttenuation: false,
  size: 15
}));
__publicField(PathSupportControls, "switchMaterial", new PointsMaterial({
  map: switchTexture,
  transparent: true,
  depthFunc: AlwaysDepth,
  alphaTest: 0.01,
  sizeAttenuation: false,
  size: 15
}));
const PATH_SUPPORT_CONTROLS_PLUGIN = transPkgName(name);
const PathSupportControlsPlugin = function(params = {}) {
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
      if (params.raycaster && params.raycaster.params) {
        Object.assign(controls.raycaster.params, params.raycaster.params);
      }
      controls.use(engine.pointerManager);
      engine.pathSupportControls = controls;
      setDomFun = (event) => {
        controls.setDom(event.dom);
      };
      setCameraFun = (event) => {
        controls.setCamera(event.camera);
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
