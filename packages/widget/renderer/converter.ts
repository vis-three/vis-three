import { VNode, isVNode } from "../vnode";

export const vnodePropConverter = (object: any) => {
  if (typeof object === "object") {
    if (isVNode(object)) {
      return (<VNode>object).config!.vid;
    } else {
      for (const key in object) {
        object[key] = vnodePropConverter(object[key]);
      }
      return object;
    }
  } else {
    return object;
  }
};
