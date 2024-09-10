import { EngineWidget } from "../engine";
import { VNode } from "../vnode";
import { Widget } from "../widget";
export declare class Renderer<E extends EngineWidget = EngineWidget> {
    engine: E;
    context: Widget<E, any, any>;
    constructor(ctx: Widget<E, any, any>);
    private log;
    patch(oldVn: VNode | null, newVn: VNode | null): void;
    render(vnode: VNode): void;
    processElement(oldVn: VNode | null, newVn: VNode | null): void;
    unmountElement(vnode: VNode): void;
    mountElement(vnode: VNode): void;
    patchElement(oldVn: VNode, newVn: VNode): void;
    createElement(vnode: VNode): {
        element: import("@vis-three/tdcm").BasicConfig;
        onProps: Record<string, Function>;
    };
    processComponent(oldVn: VNode | null, newVn: VNode | null): void;
    mountComponent(vnode: VNode): void;
    unmountComponent(vnode: VNode): void;
    patchComponent(oldVn: VNode, newVn: VNode): void;
}
