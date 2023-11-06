import { getFinalReference, Math } from "@vis-three/utils";
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
    refAttr: string
  ) {
    super();
    this.setTarget(target, targetAttr);
    this.setReference(ref, refAttr);
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
      this.target.object[this.target.key] = Math.calc(
        this.offset.operate,
        this.reference.object[this.reference.key],
        this.offset.value
      );
    }
  }
}
