import { Data, VNodeTypes, createVNode } from "../vnode";

export const h = function (type: VNodeTypes, props: Data | null = null) {
  return createVNode(type, props);
};
