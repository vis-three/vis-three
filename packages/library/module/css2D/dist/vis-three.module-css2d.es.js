import { defineModule as m, SUPPORT_LIFE_CYCLE as d } from "@vis-three/tdcm";
import { getObjectConfig as u, ObjectRule as p, defineObjectModel as g } from "@vis-three/module-object";
import { PlaneGeometry as h, Box3 as w, Matrix4 as x, Vector3 as n, Vector2 as l } from "three";
import { CSS2DObject as f } from "three/examples/jsm/renderers/CSS2DRenderer.js";
const y = function() {
  return Object.assign(u(), {
    element: "",
    width: 50,
    height: 50
  });
}, v = function() {
  return Object.assign(y(), {});
};
class S extends f {
  constructor(t = document.createElement("div")) {
    const i = document.createElement("div"), s = 50, e = 50;
    i.style.width = `${s}px`, i.style.height = `${e}px`, i.appendChild(t), super(i), this.geometry = new h(s, e), this.geometry.computeBoundingBox(), this._width = s, this._height = e;
  }
  get width() {
    return this._width;
  }
  set width(t) {
    this.geometry.dispose(), this.geometry = new h(t, this._height), this.geometry.computeBoundingBox(), this.element.style.width = `${t}px`, this._width = t;
  }
  get height() {
    return this._height;
  }
  set height(t) {
    this.geometry.dispose(), this.geometry = new h(this._width, t), this.geometry.computeBoundingBox(), this.element.style.height = `${t}px`, this._height = t;
  }
}
class P extends S {
  constructor(t = document.createElement("div")) {
    super(t), this.cacheBox = new w(), this.viewWorldMatrix = new x(), this.mvPosition = new n(), this.matrixScale = new n(), this.worldScale = new n(), this.vA = new n(), this.vB = new n(), this.vC = new n(), this.alignedPosition = new l(), this.rotatedPosition = new l(), this.intersectPoint = new n(), this.type = "CSS2DPlane", this.element.classList.add("vis-css2d", "vis-css2d-plane"), new MutationObserver(() => {
      this.matrixScale.set(
        Math.abs(this.width / 100) * 0.1,
        Math.abs(this.height / 100) * 0.1,
        1
      );
    }).observe(this.element, {
      attributeFilter: ["style"]
    });
  }
  transformVertex(t, i, s) {
    const e = this.alignedPosition, r = this.rotatedPosition, c = 0, a = 1;
    e.copy(t).multiply(s), r.x = a * e.x - c * e.y, r.y = c * e.x + a * e.y, t.copy(i), t.x += r.x, t.y += r.y, t.applyMatrix4(this.viewWorldMatrix);
  }
  raycast(t, i) {
    t.camera === null && console.error(
      'THREE.Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'
    ), this.viewWorldMatrix.copy(t.camera.matrixWorld), this.modelViewMatrix.multiplyMatrices(
      t.camera.matrixWorldInverse,
      this.matrixWorld
    ), this.mvPosition.setFromMatrixPosition(this.modelViewMatrix), this.worldScale.copy(this.matrixScale).multiplyScalar(-this.mvPosition.z), this.transformVertex(
      this.vA.set(-0.5, -0.5, 0),
      this.mvPosition,
      this.worldScale
    ), this.transformVertex(
      this.vB.set(0.5, -0.5, 0),
      this.mvPosition,
      this.worldScale
    ), this.transformVertex(
      this.vC.set(0.5, 0.5, 0),
      this.mvPosition,
      this.worldScale
    );
    let s = t.ray.intersectTriangle(
      this.vA,
      this.vB,
      this.vC,
      !1,
      this.intersectPoint
    );
    if (s === null && (this.transformVertex(
      this.vB.set(-0.5, 0.5, 0),
      this.mvPosition,
      this.worldScale
    ), s = t.ray.intersectTriangle(
      this.vA,
      this.vC,
      this.vB,
      !1,
      this.intersectPoint
    ), s === null))
      return;
    const e = t.ray.origin.distanceTo(this.intersectPoint);
    e < t.near || e > t.far || i.push({
      distance: e,
      point: this.intersectPoint.clone(),
      face: null,
      object: this
    });
  }
}
const B = m({
  type: "css2D",
  object: !0,
  rule: p,
  models: [
    g((o) => ({
      type: "CSS2DPlane",
      config: v,
      shared: {
        getElement(t, i) {
          const s = i.resourceManager.resourceMap;
          if (!s.has(t))
            return console.warn(
              `css2D compiler: can not found resource element: ${t}`
            ), document.createElement("div");
          const e = s.get(t);
          return e instanceof HTMLElement ? e : (console.warn(
            "css2D compiler can not suport render this resource type.",
            e.constructor,
            t
          ), document.createElement("div"));
        }
      },
      commands: {
        set: {
          element({ model: t, target: i, value: s, engine: e }) {
            i.element.innerHTML = "", i.element.appendChild(t.getElement(s, e));
          }
        }
      },
      create({ model: t, config: i, engine: s }) {
        const e = new P(t.getElement(i.element, s));
        return o.create({
          model: t,
          target: e,
          config: i,
          filter: {
            element: !0
          },
          engine: s
        }), e;
      },
      dispose({ target: t }) {
        o.dispose({ target: t });
      }
    }))
  ],
  lifeOrder: d.THREE
});
export {
  B as default,
  y as getCSS2DObjectConfig,
  v as getCSS2DPlaneConfig
};
