import { getFinalReference, MATH } from "@vis-three/utils";
import { Constraintor } from "../constraintor";

export class NumberConstraintor extends Constraintor {
  target: {
    object: Record<string, any>;
    key: string;
  } = { object: {}, key: "" };

  reference: {
    object: Record<string, any>;
    key: string;
  } = { object: {}, key: "" };

  offset: { operate: "+" | "-" | "*" | "/"; value: number } | null = null;

  constructor(
    target: object,
    targetAttr: string,
    ref: object,
    refAttr: string,
    offset: { operate: "+" | "-" | "*" | "/"; value: number } | null
  ) {
    super();
    if (target && targetAttr) {
      this.setTarget(target, targetAttr);
    }

    if (ref && refAttr) {
      this.setReference(ref, refAttr);
    }
    this.offset = offset;
  }

  setTarget(object: object, attr: string) {
    const result = getFinalReference(object, attr);
    this.target = { object: result!.reference, key: result!.key } || {
      object: {},
      key: "",
    };
  }

  setReference(object: object, attr: string) {
    const result = getFinalReference(object, attr);
    this.reference = { object: result!.reference, key: result!.key } || {
      object: {},
      key: "",
    };
  }

  constrain(): void {
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
