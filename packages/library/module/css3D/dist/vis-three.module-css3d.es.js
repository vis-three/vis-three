import { defineModule as p, SUPPORT_LIFE_CYCLE as m } from "@vis-three/tdcm";
import { getObjectConfig as u, defineObjectModel as h, ObjectRule as l } from "@vis-three/module-object";
import { PlaneGeometry as n, Box3 as a, Vector3 as r, Quaternion as g, Matrix4 as c } from "three";
import { CSS3DObject as S, CSS3DSprite as x } from "three/examples/jsm/renderers/CSS3DRenderer.js";
const d = function() {
  return Object.assign(u(), {
    element: "",
    width: 50,
    height: 50
  });
}, y = function() {
  return Object.assign(d(), {});
}, w = function() {
  return Object.assign(d(), {
    rotation2D: 0
  });
};
class f extends S {
  constructor(e = document.createElement("div")) {
    const t = document.createElement("div"), s = 50, i = 50;
    t.style.width = `${s}px`, t.style.height = `${i}px`, t.appendChild(e), super(t), this.geometry = new n(s, i), this.geometry.computeBoundingBox(), this._width = s, this._height = i;
  }
  get width() {
    return this._width;
  }
  set width(e) {
    this.geometry.dispose(), this.geometry = new n(e, this._height), this.geometry.computeBoundingBox(), this.element.style.width = `${e}px`, this._width = e;
  }
  get height() {
    return this._height;
  }
  set height(e) {
    this.geometry.dispose(), this.geometry = new n(this._width, e), this.geometry.computeBoundingBox(), this.element.style.height = `${e}px`, this._height = e;
  }
}
class C extends f {
  constructor(e = document.createElement("div")) {
    super(e), this.cacheBox = new a(), this.type = "CSS3DPlane", this.element.classList.add("vis-css3d", "vis-css3d-plane");
  }
  raycast(e, t) {
    const s = this.cacheBox.copy(this.geometry.boundingBox);
    s.applyMatrix4(this.matrixWorld), e.ray.intersectsBox(s) && t.push({
      distance: e.ray.origin.distanceTo(this.position),
      object: this,
      point: this.position
    });
  }
}
const D = h((o) => ({
  type: "CSS3DPlane",
  config: y,
  shared: {
    getElement(e, t) {
      const s = t.resourceManager.resourceMap;
      if (!s.has(e))
        return console.warn(
          `css3D compiler: can not found resource element: ${e}`
        ), document.createElement("div");
      const i = s.get(e);
      return i instanceof HTMLElement ? i : (console.warn(
        "css3D compiler can not suport render this resource type.",
        i.constructor,
        e
      ), document.createElement("div"));
    }
  },
  commands: {
    set: {
      element({ model: e, target: t, value: s, engine: i }) {
        t.element.innerHTML = "", t.element.appendChild(e.getElement(s, i));
      }
    }
  },
  create({ model: e, config: t, engine: s }) {
    const i = new C(e.getElement(t.element, s));
    return o.create({
      model: e,
      target: i,
      config: t,
      filter: {
        element: !0
      },
      engine: s
    }), i;
  },
  dispose({ target: e }) {
    o.dispose({ target: e });
  }
}));
class E extends x {
  constructor(e = document.createElement("div")) {
    const t = document.createElement("div"), s = 50, i = 50;
    t.style.width = `${s}px`, t.style.height = `${i}px`, t.appendChild(e), e.classList.add("vis-css3d", "vis-css3d-sprite"), super(t), this.cacheBox = new a(), this.cachePosition = new r(), this.cacheQuaternion = new g(), this.cacheScale = new r(), this.cacheMatrix4 = new c(), this.rotateMatrix4 = new c(), this.geometry = new n(s, i), this.geometry.computeBoundingBox(), this._width = s, this._height = i, this.type = "CSS3DSprite";
  }
  get width() {
    return this._width;
  }
  set width(e) {
    this.geometry.dispose(), this.geometry = new n(e, this._height), this.geometry.computeBoundingBox(), this.element.style.width = `${e}px`, this._width = e;
  }
  get height() {
    return this._height;
  }
  set height(e) {
    this.geometry.dispose(), this.geometry = new n(this._width, e), this.geometry.computeBoundingBox(), this.element.style.height = `${e}px`, this._height = e;
  }
  raycast(e, t) {
    const s = this.cacheBox.copy(this.geometry.boundingBox);
    this.matrixWorld.decompose(
      this.cachePosition,
      this.cacheQuaternion,
      this.cacheScale
    );
    const i = this.rotateMatrix4.lookAt(
      this.position,
      e.camera.position,
      this.up
    );
    this.cacheQuaternion.setFromRotationMatrix(i), this.cacheMatrix4.compose(
      this.cachePosition,
      this.cacheQuaternion,
      this.cacheScale
    ), s.applyMatrix4(this.cacheMatrix4), e.ray.intersectsBox(s) && t.push({
      distance: e.ray.origin.distanceTo(this.position),
      object: this,
      point: this.position
    });
  }
}
class M extends E {
  constructor(e = document.createElement("div")) {
    super(e), this.type = "CSS3DSprite", this.element.classList.add("vis-css3d", "vis-css3d-plane");
  }
}
const B = h((o) => ({
  type: "CSS3DSprite",
  config: w,
  shared: {
    getElement(e, t) {
      const s = t.resourceManager.resourceMap;
      if (!s.has(e))
        return console.warn(
          `css3D compiler: can not found resource element: ${e}`
        ), document.createElement("div");
      const i = s.get(e);
      return i instanceof HTMLElement ? i : (console.warn(
        "css3D compiler can not suport render this resource type.",
        i.constructor,
        e
      ), document.createElement("div"));
    }
  },
  commands: {
    set: {
      element({ model: e, target: t, value: s, engine: i }) {
        t.element.innerHTML = "", t.element.appendChild(e.getElement(s, i));
      }
    }
  },
  create({ model: e, config: t, engine: s }) {
    const i = new M(e.getElement(t.element, s));
    return o.create({
      model: e,
      target: i,
      config: t,
      filter: {
        element: !0
      },
      engine: s
    }), i;
  },
  dispose({ target: e }) {
    o.dispose({ target: e });
  }
})), $ = p({
  type: "css3D",
  object: !0,
  rule: l,
  models: [D, B],
  lifeOrder: m.THREE
});
export {
  $ as default,
  d as getCSS3DObjectConfig,
  y as getCSS3DPlaneConfig,
  w as getCSS3DSpriteConfig
};
