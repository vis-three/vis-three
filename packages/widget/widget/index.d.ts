import { Component, ComponentOptions } from "../component";
import { EngineWidget } from "../engine";
import { Renderer } from "../renderer";
export declare class Widget<
  Engine extends EngineWidget = EngineWidget,
  Props extends object = any,
  RawBindings extends object = any
> {
  private wid;
  private version;
  components: Record<string, ComponentOptions>;
  renderer: Renderer<Engine>;
  root: ComponentOptions<Engine, Props, RawBindings>;
  instance: Component | null;
  engine: Engine;
  constructor(
    engine: Engine,
    component: ComponentOptions<Engine, Props, RawBindings>
  );
  component(
    name: string | ComponentOptions,
    component?: ComponentOptions
  ): void;
  mount(): this;
  getState(): {} | undefined;
  unmount(): void;
  use(): void;
}
