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
export type ElementVNode<NodeProps extends ElementData = ElementData> = VNode<NodeProps>;
export declare const createVNode: <NodeProps = Data>(type: VNodeTypes, props?: NodeProps | null) => VNode<NodeProps>;
export declare const isVNode: (object: any) => boolean;
