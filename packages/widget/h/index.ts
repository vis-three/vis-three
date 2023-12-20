import { Data, VNode, VNodeTypes, createVNode } from "../vnode";

export enum RENDER_SCOPE {
  STATIC = "static",
  VIF = "vif",
  VFOR = "vfor",
}

export type VforKeyTypes = string | number | symbol;

export type VNodeScpoe = {
  scope: RENDER_SCOPE;
  vnodes: VNode[];
  keyMap: Map<VforKeyTypes, VNode>;
};

export interface H {
  (type: VNodeTypes, props?: Data | null): VNode<Data>;
  el: string | null;
  scope: RENDER_SCOPE;
  vnodes: Array<VNode | VNodeScpoe>;
  reset: () => void;
  add: (vnode: VNode) => Array<VNode | VNodeScpoe>;
}

export const _h = <H>function (type: VNodeTypes, props: Data | null = null) {
  const vnode = createVNode(type, props);
  _h.add(vnode);
  return vnode;
};

_h.reset = function () {
  _h.el = null;
  _h.scope = RENDER_SCOPE.STATIC;
  _h.vnodes = [];
};

_h.add = function (vnode: VNode) {
  vnode.el = _h.el;
  if (_h.scope !== RENDER_SCOPE.STATIC) {
    const scope = _h.vnodes[_h.vnodes.length - 1] as VNodeScpoe;
    if (_h.scope === RENDER_SCOPE.VFOR) {
      if (!vnode.key) {
        vnode.key = scope.vnodes.length;
      }
      scope.keyMap.set(vnode.key, vnode);
    }
    scope.vnodes.push(vnode);
  } else {
    _h.vnodes.push(vnode);
  }

  return _h.vnodes;
};

export const h = function (type: VNodeTypes, props: Data | null = null) {
  return _h(type, props);
};

export const vif = function (fun: () => void) {
  _h.scope = RENDER_SCOPE.VIF;
  _h.vnodes.push({
    scope: _h.scope,
    vnodes: [],
    keyMap: new Map(),
  });
  fun();
  _h.scope = RENDER_SCOPE.STATIC;
};

export const vfor = function (fun: () => void) {
  _h.scope = RENDER_SCOPE.VFOR;
  _h.vnodes.push({
    scope: _h.scope,
    vnodes: [],
    keyMap: new Map(),
  });
  fun();
  _h.scope = RENDER_SCOPE.STATIC;
};
