import { Data, VNode, VNodeTypes } from "../vnode";
export interface H {
    (type: VNodeTypes, props?: Data | null): VNode<Data>;
    index: number;
    el: string | null;
    vnodes: VNode[];
    reset: () => void;
    increase: () => number;
    add: (vnode: VNode) => VNode[];
}
export declare const h: H;
