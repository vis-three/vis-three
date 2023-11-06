import { getFinalReference, Math } from "@vis-three/utils";
import { Constraintor } from "../constraintor";
import { Box3 } from "three";

export class BoundingBoxConstraintor extends Constraintor {
  target: {
    object: Record<string, any>;
    key: string;
  } = { object: {}, key: "" };

  reference: Box3;

  offset: {
    position: {
      direction: "+" | "-";
      axes: "x" | "y" | "z";
    };
    operate: "+" | "-" | "*" | "/";
    value: number;
  } = {
    position: {
      direction: "+",
      axes: "y",
    },
    operate: "+",
    value: 0,
  };

  constructor(target: object, targetAttr: string, ref: Box3) {
    super();
    this.setTarget(target, targetAttr);
    this.reference = ref;
  }

  setTarget(object: object, attr: string) {
    const result = getFinalReference(object, attr);
    this.target = { object: result!.reference, key: result!.key } || {
      object: {},
      key: "",
    };
  }

  constrain(): void {
    const offset = this.offset;
    const reference = this.reference;

    this.target.object[this.target.key] = Math.calc(
      offset.operate,
      reference[offset.position.direction === "+" ? "max" : "min"][
        offset.position.axes
      ],
      offset.value
    );
  }
}
