import { getFinalReference, MATH } from "@vis-three/utils";
import { Constraintor } from "../constraintor";
import { Box3, BufferGeometry, Object3D } from "three";

export interface Offset {
  position: {
    direction: "+" | "-";
    axes: "x" | "y" | "z";
  };
  operate: "+" | "-" | "*" | "/";
  value: number;
}

export class BoundingBoxConstraintor extends Constraintor {
  target: {
    object: Record<string, any>;
    key: string;
  } = { object: {}, key: "" };

  reference = new Object3D();

  offset: Offset = {
    position: {
      direction: "+",
      axes: "y",
    },
    operate: "+",
    value: 0,
  };

  private cacheBox = new Box3();
  private _space: string = "world";

  constructor(
    target: object,
    targetAttr: string,
    space = "world",
    ref?: Object3D,
    offset?: Offset
  ) {
    super();
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

  setTarget(object: object, attr: string) {
    const result = getFinalReference(object, attr);
    this.target = { object: result!.reference, key: result!.key } || {
      object: {},
      key: "",
    };
  }

  updateBox() {
    const reference = this.reference;

    this.cacheBox.setFromObject(reference);

    if (this.space === "local") {
      this.cacheBox.applyMatrix4(reference.matrixWorld.invert());
    }
  }

  setReference(object: Object3D) {
    this.reference = object;
    this.updateBox();
  }

  constrain(): void {
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
