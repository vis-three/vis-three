import { Component, ComponentOptions } from "../component";
import { EngineWidget } from "../engine";
import { Renderer } from "../renderer";
export declare class Widget<E extends EngineWidget = EngineWidget> {
    private wid;
    private version;
    components: Record<string, ComponentOptions>;
    renderer: Renderer<E>;
    root: ComponentOptions;
    instance: Component | null;
    engine: E;
    constructor(engine: E, component: ComponentOptions);
    component(name: string | ComponentOptions, component?: ComponentOptions): void;
    mount(el?: string): this;
    unmount(): void;
    use(): void;
}
