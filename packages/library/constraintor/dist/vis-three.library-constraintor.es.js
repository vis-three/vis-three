var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
import { getFinalReference, MATH } from "@vis-three/utils";
import { EventDispatcher } from "@vis-three/core";
class Constraintor extends EventDispatcher {
}
class BoundingBoxConstraintor extends Constraintor {
  constructor(target, targetAttr, ref) {
    super();
    __publicField(this, "target", { object: {}, key: "" });
    __publicField(this, "reference");
    __publicField(this, "offset", {
      position: {
        direction: "+",
        axes: "y"
      },
      operate: "+",
      value: 0
    });
    this.setTarget(target, targetAttr);
    this.reference = ref;
  }
  setTarget(object, attr) {
    const result = getFinalReference(object, attr);
    this.target = { object: result.reference, key: result.key };
  }
  constrain() {
    const offset = this.offset;
    const reference = this.reference;
    this.target.object[this.target.key] = MATH.calc(
      offset.operate,
      reference[offset.position.direction === "+" ? "max" : "min"][offset.position.axes],
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
      this.target.object[this.target.key] = this.reference.object[this.reference.key];
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
