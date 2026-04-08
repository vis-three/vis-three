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
/**
 * 模板元素生成函数
 * @param type 元素类型
 * @param props 元素的属性
 * @returns VNode
 */
export declare const h: (type: VNodeTypes, props?: Data | null) => VNode<Data>;
/**
 * 模板渲染下的条件渲染空间
 * @param fun 条件渲染方法
 */
export declare const vif: (fun: () => void) => void;
/**
 * 模板渲染下的列表渲染空间
 * @param fun 列表渲染方法
 */
export declare const vfor: (fun: () => void) => void;
