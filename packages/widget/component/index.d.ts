import { VNode } from "../vnode";
import { EngineWidget } from "../engine";
import { EventDispatcher } from "@vis-three/core";
import { Renderer } from "../renderer";
import { PropsOptions } from "./props";
export interface ComponentOptions<Engine extends EngineWidget = EngineWidget, Props extends object = any, RawBindings extends object = any> {
    name?: string;
    props?: PropsOptions<Props>;
    components?: Record<string, ComponentOptions>;
    engine: Engine;
    el: string;
    setup: (props: Props) => RawBindings;
    render: () => VNode | VNode[];
}
export declare class Component<Engine extends EngineWidget = EngineWidget, Props extends object = any, RawBindings extends object = any> extends EventDispatcher {
    cid: any;
    name: string;
    private options;
    private vnode;
    private el;
    private render;
    private engine;
    private renderer;
    private isMounted;
    private props;
    private setupState;
    private rawSetupState;
    private effect;
    private effectScope;
    private update;
    private subTree;
    private ctx;
    constructor(vnode: VNode<Props>, renderer: Renderer<Engine>);
    private renderTree;
    private createProps;
    private createSetup;
    private createRender;
    private createEffect;
    getState(raw?: boolean): RawBindings;
}
export declare const defineComponent: <Engine extends EngineWidget = EngineWidget, Props extends object = any, RawBindings extends object = any>(options: ComponentOptions<Engine, Props, RawBindings>) => ComponentOptions<Engine, Props, RawBindings>;
