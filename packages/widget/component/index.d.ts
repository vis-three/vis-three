import { EffectScope } from "@vue/reactivity";
import { VNode } from "../vnode";
import { EngineWidget } from "../engine";
import { EventDispatcher } from "@vis-three/core";
import { Renderer } from "../renderer";
import { PropsOptions } from "./props";
export interface RenderParams {
    components: Record<string, ComponentOptions>;
    resources: Record<string, string>;
}
export interface ComponentOptions<Engine extends EngineWidget = EngineWidget, Props extends object = any, RawBindings extends object = any> {
    name?: string;
    props?: PropsOptions<Props>;
    components?: Record<string, ComponentOptions>;
    engine: Engine;
    el: string;
    load: Record<string, string>;
    resources?: Record<string, any>;
    setup: (props: Props) => RawBindings;
    render: (params: RenderParams) => VNode | VNode[];
}
export declare class Component<Engine extends EngineWidget = EngineWidget, Props extends object = any, RawBindings extends object = any> extends EventDispatcher {
    static currentComponent: Component | null;
    static setCurrentComponent(component: Component): void;
    static unsetCurrentComponent(): void;
    cid: any;
    name: string;
    vnode: VNode<Props>;
    private options;
    private el;
    private render;
    private engine;
    private renderer;
    isMounted: boolean;
    private props;
    private setupState;
    private rawSetupState;
    private effect;
    scope: EffectScope;
    update: () => void;
    private subTree;
    private ctx;
    private cacheResources;
    constructor(vnode: VNode<Props>, renderer: Renderer<Engine>);
    private renderTree;
    private createResources;
    private createProps;
    private createSetup;
    private createRender;
    private createEffect;
    updateProps(newProps: Partial<Props>): void;
    getState(raw?: boolean): RawBindings;
}
export declare const defineComponent: <Engine extends EngineWidget = EngineWidget, Props extends object = any, RawBindings extends object = any>(options: ComponentOptions<Engine, Props, RawBindings>) => ComponentOptions<Engine, Props, RawBindings>;
