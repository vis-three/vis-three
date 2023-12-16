import { SymbolConfig } from "@vis-three/middleware";
import { Component, ComponentInstance } from "../component";

export type VNodeTypes = string | Component;

export type Data = Record<string, any>;

export type ElementData = SymbolConfig;

export interface VNode<NodeProps = Data> {
  type: VNodeTypes;
  props: NodeProps | null;
  component: ComponentInstance | null;
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
