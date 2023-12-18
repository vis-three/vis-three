import { EngineWidget } from "../engine";
import { VNode } from "../vnode";
import { Widget } from "../widget";
export declare class Renderer<E extends EngineWidget = EngineWidget> {
    engine: E;
    context: Widget<E>;
    constructor(ctx: Widget<E>);
    private log;
    patch(oldVn: VNode | null, newVn: VNode): void;
    render(vnode: VNode): void;
    processElement(oldVn: VNode | null, newVn: VNode): void;
    unmountElement(vnode: VNode): void;
    mountElement(vnode: VNode): void;
    patchElement(oldVn: VNode, newVn: VNode): void;
    createElement(vnode: VNode): import("@vis-three/middleware").SymbolConfig;
    processComponent(oldVn: VNode | null, newVn: VNode): void;
    mountComponent(vnode: VNode): void;
}
