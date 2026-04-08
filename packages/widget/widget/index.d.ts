import { Component, ComponentOptions } from "../component";
import { EngineWidget } from "../engine";
import { Renderer } from "../renderer";
export declare class Widget<Engine extends EngineWidget = EngineWidget, Props extends object = any, RawBindings extends object = any> {
    private wid;
    private version;
    components: Record<string, ComponentOptions>;
    renderer: Renderer<Engine>;
    root: ComponentOptions<Engine, Props, RawBindings>;
    instance: Component | null;
    engine: Engine;
    constructor(engine: Engine, component: ComponentOptions<Engine, Props, RawBindings>);
    /**
     * 注册布局全局组件
     * @param name 组件名
     * @param component 组件选项
     * @returns
     */
    component(name: string | ComponentOptions, component?: ComponentOptions): void;
    /**
     * 部件挂载
     * @returns this
     */
    mount(): this;
    /**
     * 获取根组件的状态对象
     * @returns any
     */
    getState(): any;
    /**
     * 解除部件绑定
     */
    unmount(): void;
    use(): void;
}
