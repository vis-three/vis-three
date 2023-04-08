var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
import { defineProcessor, SUPPORT_LIFE_CYCLE } from "@vis-three/middleware";
import { ObjectCompiler, getObjectConfig, objectCommands, objectCreate, objectDispose, ObjectRule } from "@vis-three/module-object";
import { PlaneBufferGeometry, Box3, Matrix4, Vector3, Vector2 } from "three";
import { CSS2DObject } from "three/examples/jsm/renderers/CSS2DRenderer";
class CSS2DCompiler extends ObjectCompiler {
  constructor() {
    super();
  }
}
const getCSS2DObjectConfig = function() {
  return Object.assign(getObjectConfig(), {
    element: "",
    width: 50,
    height: 50
  });
};
const getCSS2DPlaneConfig = function() {
  return Object.assign(getCSS2DObjectConfig(), {});
};
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
const getElement = function(element, engine) {
  const resourceMap = engine.resourceManager.resourceMap;
  if (!resourceMap.has(element)) {
    console.warn(`css2D compiler: can not found resource element: ${element}`);
    return document.createElement("div");
  }
  const resource = resourceMap.get(element);
  if (resource instanceof HTMLElement) {
    return resource;
  } else {
    console.warn(
      `css2D compiler can not suport render this resource type.`,
      resource.constructor,
      element
    );
    return document.createElement("div");
  }
};
var CSS2DPlaneProcessor = defineProcessor({
  type: "CSS2DPlane",
  config: getCSS2DPlaneConfig,
  commands: {
    add: objectCommands.add,
    set: {
      element({ target, value, engine }) {
        target.element.innerHTML = "";
        target.element.appendChild(getElement(value, engine));
      },
      ...objectCommands.set
    },
    delete: objectCommands.delete
  },
  create(config, engine) {
    return objectCreate(
      new CSS2DPlane(getElement(config.element, engine)),
      config,
      {
        element: true
      },
      engine
    );
  },
  dispose: objectDispose
});
const CSS2DRule = function(notice, compiler) {
  ObjectRule(notice, compiler);
};
var index = {
  type: "css2D",
  object: true,
  compiler: CSS2DCompiler,
  rule: CSS2DRule,
  processors: [CSS2DPlaneProcessor],
  lifeOrder: SUPPORT_LIFE_CYCLE.THREE
};
export { index as default };
