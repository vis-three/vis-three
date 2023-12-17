import { SymbolConfig } from "@vis-three/middleware";
import { Component, ComponentOptions } from "../component";

export type VNodeTypes = string | ComponentOptions;

export type Data = Record<string, any>;

export type ElementData = SymbolConfig;

export interface VNode<NodeProps = Data> {
  type: VNodeTypes;
  props: NodeProps | null;
  component: Component | null;
  el: string | null;
  key: string | number | symbol | null;
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
    type,
    props,
    component: null,
    el: null,
    key: null,
    ref: null,
    children: null,
  };
};
