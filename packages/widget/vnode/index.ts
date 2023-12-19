import { SymbolConfig } from "@vis-three/middleware";
import { Component, ComponentOptions } from "../component";

export type VNodeTypes = string | ComponentOptions;

export type Data = Record<string, any>;

export type ElementData = SymbolConfig;

export interface VNode<NodeProps = Data> {
  _isVNode: true;
  type: VNodeTypes;
  props: NodeProps | null;
  config: SymbolConfig | null;
  component: Component | null;
  el: string | null;
  key: string | number | symbol | null;
  index: string | number | symbol | null;
  ref: string | null;
  children: VNode[] | null;
}

export type ElementVNode<NodeProps extends ElementData = ElementData> =
  VNode<NodeProps>;

export const createVNode = function <NodeProps = Data>(
  type: VNodeTypes,
  props: NodeProps | null = null
): VNode<NodeProps> {
  return {
    _isVNode: true,
    type,
    props,
    config: null,
    component: null,
    el: null,
    key: null,
    index: null,
    ref: null,
    children: null,
  };
};

export const isVNode = function (object: any) {
  if (typeof object === "object") {
    return Boolean(object["_isVNode"]);
  } else {
    return false;
  }
};
