import { createSymbol } from "@vis-three/tdcm";
import { Component, ComponentOptions } from "../component";
import { version } from "../package.json";
import { EngineWidget } from "../engine";
import { Data, createVNode } from "../vnode";
import { Renderer } from "../renderer";

export class Widget<
  Engine extends EngineWidget = EngineWidget,
  Props extends object = any,
  RawBindings extends object = any
> {
  private wid = createSymbol();
  private version = version;
  components: Record<string, ComponentOptions> = {};
  renderer: Renderer<Engine>;

  root: ComponentOptions<Engine, Props, RawBindings>;
  instance: Component | null = null;
  engine: Engine;

  constructor(
    engine: Engine,
    component: ComponentOptions<Engine, Props, RawBindings>
  ) {
    this.engine = engine;
    this.root = component;
    this.renderer = new Renderer(this);
  }

  /**
   * 注册布局全局组件
   * @param name 组件名
   * @param component 组件选项
   * @returns
   */
  component(name: string | ComponentOptions, component?: ComponentOptions) {
    if (typeof name === "object") {
      component = name as ComponentOptions;
      if (!component.name) {
        console.error(
          `widget register component must be provide a name`,
          component
        );
        return;
      }

      name = component.name;
    }

    if (!component) {
      console.error(
        `widget register component must be provide a component not a null`,
        name
      );
      return;
    }

    if (this.components[name as string]) {
      console.warn(`A component with this name already exists: ${name}`);
      return;
    }

    this.components[name as string] = component;
  }

  /**
   * 部件挂载
   * @returns this
   */
  mount() {
    const vnode = createVNode(this.root as ComponentOptions);

    this.renderer.render(vnode);

    this.instance = vnode.component;

    return this;
  }

  /**
   * 获取根组件的状态对象
   * @returns any
   */
  getState() {
    return this.instance?.getState(true);
  }

  /**
   * 解除部件绑定
   */
  unmount() {
    this.instance?.distory();
  }

  use() {}
}
