import { BasicConfig } from "@vis-three/tdcm";
import { Component, ComponentOptions } from "../component";
export type VNodeTypes = string | ComponentOptions;
export type Data = Record<string, any>;
export type ElementData = BasicConfig;
export interface VNode<NodeProps = Data> {
    _isVNode: true;
    type: VNodeTypes;
    props: NodeProps | null;
    config: NodeProps | null;
    component: Component | null;
    el: string | null;
    key: string | number | symbol | null;
    ref: string | null;
    raw: any | null;
    children: VNode[] | null;
}
export type ElementVNode<NodeProps extends ElementData = ElementData> = VNode<NodeProps>;
export declare const createVNode: <NodeProps = Data>(type: VNodeTypes, props?: NodeProps | null, options?: {
    key?: VNode["key"];
    ref?: VNode["ref"];
    raw?: VNode["raw"];
}) => VNode<NodeProps>;
export declare const isVNode: (object: any) => boolean;
export declare const isOnProp: (key: string) => boolean;
export declare const getOnProps: (vnode: VNode) => Record<string, Function>;
