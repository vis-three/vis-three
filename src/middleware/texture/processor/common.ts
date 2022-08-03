import { ProcessParams } from "../../../core/Processor";

export const needUpdateRegCommand = {
  reg: new RegExp(
    "wrapS|wrapT|format|encoding|anisotropy|magFilter|minFilter|mapping"
  ),
  handler({ target, key, value }: ProcessParams<any, any>) {
    target[key] = value;
    target.needsUpdate = true;
  },
};
