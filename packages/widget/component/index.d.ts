import { VNode } from "../vnode";
import { EngineWidget } from "../engine";
import { EventDispatcher } from "@vis-three/core";
import { Renderer } from "../renderer";
export interface ComponentOptions<Engine extends EngineWidget = EngineWidget, Props = {}, RawBindings = {}> {
    name?: string;
    props?: Props;
    components?: Record<string, ComponentOptions>;
    engine: Engine;
    setup: () => RawBindings;
    render: () => VNode | VNode[];
}
export declare class Component<Engine extends EngineWidget = EngineWidget, Props = {}, RawBindings = {}> extends EventDispatcher {
    cid: any;
    name: string;
    private options;
    private render;
    private engine;
    private renderer;
    private isMounted;
    private setupState;
    private effect;
    private scope;
    private update;
    private subTree;
    private ctx;
    constructor(options: ComponentOptions<Engine, Props, RawBindings>, renderer: Renderer<Engine>);
    private renderTree;
    createSetup(): void;
    createRender(): void;
    createEffect(): void;
    getState(): RawBindings;
}
export declare const defineComponent: <Engine extends EngineWidget = EngineWidget, Props = {}, RawBindings = {}>(options: ComponentOptions<Engine, Props, RawBindings>) => ComponentOptions<Engine, Props, RawBindings>;
