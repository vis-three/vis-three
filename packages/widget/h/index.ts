import { Data, VNode, VNodeTypes, createVNode } from "../vnode";

export interface H {
  (type: VNodeTypes, props?: Data | null): VNode<Data>;
  index: number;
  el: string | null;
  vnodes: VNode[];
  reset: () => void;
  increase: () => number;
  add: (vnode: VNode) => VNode[];
}

export const h = <H>function (type: VNodeTypes, props: Data | null = null) {
  const vnode = createVNode(type, props);
  vnode.index = h.increase();
  h.add(vnode);
  return vnode;
};

h.index = -1;

h.reset = function () {
  h.index = -1;
  h.el = null;
  h.vnodes = [];
};

h.increase = function () {
  h.index += 1;
  return h.index;
};

h.add = function (vnode: VNode) {
  vnode.el = h.el;
  h.vnodes.push(vnode);
  return h.vnodes;
};
