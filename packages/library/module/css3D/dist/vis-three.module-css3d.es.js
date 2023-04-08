var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
import { ObjectCompiler, ObjectRule, getObjectConfig, objectCommands, objectCreate, objectDispose } from "@vis-three/module-object";
import { defineProcessor, SUPPORT_LIFE_CYCLE } from "@vis-three/middleware";
import { PlaneBufferGeometry, Box3, Vector3, Quaternion, Matrix4 } from "three";
import { CSS3DObject, CSS3DSprite as CSS3DSprite$1 } from "three/examples/jsm/renderers/CSS3DRenderer";
class CSS3DCompiler extends ObjectCompiler {
  constructor() {
    super();
  }
}
const CSS3DRule = function(notice, compiler) {
  ObjectRule(notice, compiler);
};
const getCSS3DObjectConfig = function() {
  return Object.assign(getObjectConfig(), {
    element: "",
    width: 50,
    height: 50
  });
};
const getCSS3DPlaneConfig = function() {
  return Object.assign(getCSS3DObjectConfig(), {});
};
const getCSS3DSpriteConfig = function() {
  return Object.assign(getCSS3DObjectConfig(), {
    rotation2D: 0
  });
};
const getElement = function(element, engine) {
  const resourceMap = engine.resourceManager.resourceMap;
  if (!resourceMap.has(element)) {
    console.warn(`css3D compiler: can not found resource element: ${element}`);
    return document.createElement("div");
  }
  const resource = resourceMap.get(element);
  if (resource instanceof HTMLElement) {
    return resource;
  } else {
    console.warn(
      `css3D compiler can not suport render this resource type.`,
      resource.constructor,
      element
    );
    return document.createElement("div");
  }
};
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
var CSS3DPlaneProcessor = defineProcessor({
  type: "CSS3DPlane",
  config: getCSS3DPlaneConfig,
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
      new CSS3DPlane(getElement(config.element, engine)),
      config,
      {
        element: true
      },
      engine
    );
  },
  dispose: objectDispose
});
var CSS3DObjectProcessor = defineProcessor({
  type: "CSS3DObject",
  config: getCSS3DObjectConfig,
  commands: {
    add: objectCommands.add,
    set: {
      element({ target, value, engine }) {
        target.element = getElement(value, engine);
      },
      ...objectCommands.set
    },
    delete: objectCommands.delete
  },
  create(config, engine) {
    return objectCreate(
      new CSS3DObject(getElement(config.element, engine)),
      config,
      {
        element: true
      },
      engine
    );
  },
  dispose: objectDispose
});
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
class CSS3DSprite extends VisCSS3DSprite {
  constructor(element = document.createElement("div")) {
    super(element);
    this.type = "CSS3DSprite";
    this.element.classList.add("vis-css3d", "vis-css3d-plane");
  }
}
var CSS3DSpriteProcessor = defineProcessor({
  type: "CSS3DSprite",
  config: getCSS3DSpriteConfig,
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
      new CSS3DSprite(getElement(config.element, engine)),
      config,
      {
        element: true
      },
      engine
    );
  },
  dispose: objectDispose
});
var index = {
  type: "css3D",
  object: true,
  compiler: CSS3DCompiler,
  rule: CSS3DRule,
  processors: [CSS3DPlaneProcessor, CSS3DObjectProcessor, CSS3DSpriteProcessor],
  lifeOrder: SUPPORT_LIFE_CYCLE.THREE
};
export { index as default };
