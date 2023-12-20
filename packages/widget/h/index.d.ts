import { Data, VNode, VNodeTypes } from "../vnode";
export declare enum RENDER_SCOPE {
    STATIC = "static",
    VIF = "vif",
    VFOR = "vfor"
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
export declare const _h: H;
export declare const h: (type: VNodeTypes, props?: Data | null) => VNode<Data>;
export declare const vif: (fun: () => void) => void;
export declare const vfor: (fun: () => void) => void;
