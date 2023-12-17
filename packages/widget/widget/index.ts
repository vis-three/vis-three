import { OBJECTMODULE, createSymbol } from "@vis-three/middleware";
import { Component, ComponentOptions } from "../component";
import { version } from "../package.json";
import { EngineWidget } from "../engine";
import { ObjectConfig } from "@vis-three/module-object";
import { Scene } from "three";
import { createVNode } from "../vnode";
import { Renderer } from "../renderer";

export class Widget<E extends EngineWidget = EngineWidget> {
  private wid = createSymbol();
  private version = version;
  components: Record<string, ComponentOptions> = {};
  renderer: Renderer<E>;

  root: ComponentOptions;
  instance: Component | null = null;
  engine: E;

  constructor(engine: E, component: ComponentOptions) {
    this.engine = engine;
    this.root = component;
    this.renderer = new Renderer(engine);
  }

  component(name: string | ComponentOptions, component?: ComponentOptions) {
    if (typeof name === "object") {
      component = name;
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

    if (this.components[name]) {
      console.warn(`A component with this name already exists: ${name}`);
      return;
    }

    this.components[name] = component;
  }

  mount(el?: string) {
    let hostConfig: ObjectConfig;

    if (el) {
      const config = this.engine.getConfigfromModules(OBJECTMODULE, el);
      if (!config) {
        console.warn(`widget mount can not found object config with el:${el}`);
        return this;
      }

      hostConfig = config;
    } else {
      const config = this.engine.getObjectConfig<Scene, ObjectConfig>(
        this.engine.scene
      );

      if (!config) {
        console.warn(
          `widget mount can not found object config with object:`,
          this.engine.scene
        );
        return this;
      }

      hostConfig = config;
    }
    const vnode = createVNode(this.root);

    this.renderer.render(vnode);
    return this;
  }

  unmount() {}

  use() {}
}
