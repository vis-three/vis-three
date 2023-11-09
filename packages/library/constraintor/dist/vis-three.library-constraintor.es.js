var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) =>
  key in obj
    ? __defProp(obj, key, {
        enumerable: true,
        configurable: true,
        writable: true,
        value,
      })
    : (obj[key] = value);
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
import { getFinalReference, MATH } from "@vis-three/utils";
import { EventDispatcher } from "@vis-three/core";
import { Object3D, Box3 } from "three";
class Constraintor extends EventDispatcher {}
class BoundingBoxConstraintor extends Constraintor {
  constructor(target, targetAttr, space = "world", ref, offset) {
    super();
    __publicField(this, "target", { object: {}, key: "" });
    __publicField(this, "reference", new Object3D());
    __publicField(this, "offset", {
      position: {
        direction: "+",
        axes: "y",
      },
      operate: "+",
      value: 0,
    });
    __publicField(this, "cacheBox", new Box3());
    __publicField(this, "_space", "world");
    this._space = space;
    this.setTarget(target, targetAttr);
    ref && this.setReference(ref);
    offset && (this.offset = offset);
  }
  get space() {
    return this._space;
  }
  set space(value) {
    this._space = value;
    this.updateBox();
  }
  setTarget(object, attr) {
    const result = getFinalReference(object, attr);
    this.target = { object: result.reference, key: result.key };
  }
  updateBox() {
    const reference = this.reference;
    this.cacheBox.setFromObject(reference);
    if (this.space === "local") {
      this.cacheBox.applyMatrix4(reference.matrixWorld.invert());
    }
  }
  setReference(object) {
    this.reference = object;
    this.updateBox();
  }
  constrain() {
    this.updateBox();
    const offset = this.offset;
    const box = this.cacheBox;

    this.target.object[this.target.key] = MATH.calc(
      offset.operate,
      box[offset.position.direction === "+" ? "max" : "min"][
        offset.position.axes
      ],
      offset.value
    );
  }
}
class NumberConstraintor extends Constraintor {
  constructor(target, targetAttr, ref, refAttr, offset) {
    super();
    __publicField(this, "target", { object: {}, key: "" });
    __publicField(this, "reference", { object: {}, key: "" });
    __publicField(this, "offset", null);
    if (target && targetAttr) {
      this.setTarget(target, targetAttr);
    }
    if (ref && refAttr) {
      this.setReference(ref, refAttr);
    }
    this.offset = offset;
  }
  setTarget(object, attr) {
    const result = getFinalReference(object, attr);
    this.target = { object: result.reference, key: result.key };
  }
  setReference(object, attr) {
    const result = getFinalReference(object, attr);
    this.reference = { object: result.reference, key: result.key };
  }
  constrain() {
    if (!this.offset) {
      this.target.object[this.target.key] =
        this.reference.object[this.reference.key];
    } else {
      this.target.object[this.target.key] = MATH.calc(
        this.offset.operate,
        this.reference.object[this.reference.key],
        this.offset.value
      );
    }
  }
}
export { BoundingBoxConstraintor, NumberConstraintor };
