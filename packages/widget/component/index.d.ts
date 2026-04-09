import { EffectScope } from "@vue/reactivity";
import { VNode } from "../vnode";
import { EngineWidget } from "../engine";
import { EventDispatcher } from "@vis-three/core";
import { Renderer } from "../renderer";
import { PropsOptions } from "./props";
import { KeyEnum } from "@vis-three/utils";
export interface RenderParams<Props extends object = any, RawBindings extends object = any, Resources extends object = any> {
    props: Props;
    setup: RawBindings;
    components: Record<string, ComponentOptions>;
    resources: KeyEnum<Resources>;
}
export interface SetupParams<Engine extends EngineWidget = any, Props extends object = any, Emit extends object = any> {
    engine: Engine;
    props: Props;
    emit: (type: keyof Emit, params: any) => void;
}
export interface ComponentOptions<Engine extends EngineWidget = any, Emit extends object = any, Props extends object = any, RawBindings extends object = any, Resources extends object = any> {
    /**组件名 */
    name?: string;
    /**组件的事件列表 */
    emits?: Emit;
    /**父组件的传入 */
    props?: PropsOptions<Props>;
    /**注册的子组件 */
    components?: Record<string, ComponentOptions>;
    /**组件使用的engine，当前默认同步使用renderer的engine */
    /**组件挂载的位置vid, 不传会默认挂载到当前场景下 */
    el?: string;
    /**组件需要加载的外部资源， 当前这个load字段和resources存在重复，看后面的实现需求 */
    /**组件可以使用的资源 */
    resources?: (params: {
        setup: RawBindings;
    }) => Resources | Promise<Resources>;
    /**组件的响应式对象和业务逻辑的位置 */
    setup?: (params: SetupParams<Engine, Props>) => RawBindings;
    /**组件渲染的目标，目前可以支持不需要返回值，通过h函数自动处理 */
    render: (params: RenderParams<Props, RawBindings, Resources>) => VNode | VNode[] | void;
}
export declare class Component<Engine extends EngineWidget = any, Emit extends object = any, Props extends object = any, RawBindings extends object = any, Resources extends object = any> extends EventDispatcher {
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
    isLoaded: boolean;
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
    private resourcesKeyEnum;
    private cacheEvent;
    constructor(vnode: VNode<Props>, renderer: Renderer<Engine>);
    private createProps;
    private createSetup;
    private createResources;
    private createRender;
    private createEffect;
    private renderTree;
    distory(): void;
    updateProps(newProps: Partial<Props>): void;
    getState(raw?: boolean): RawBindings;
}
export declare const defineComponent: <Engine extends EngineWidget = any, Emit extends object = any, Props extends object = any, RawBindings extends object = any, Resources extends object = any>(options: ComponentOptions<Engine, Emit, Props, RawBindings, Resources>) => ComponentOptions<Engine, Emit, Props, RawBindings, Resources>;
