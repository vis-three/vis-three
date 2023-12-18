var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
import { EffectScope, proxyRefs, ReactiveEffect } from "@vue/reactivity";
export * from "@vue/reactivity";
import { createSymbol, isObjectType, OBJECTMODULE, generateConfig, EngineSupport } from "@vis-three/middleware";
import { isObject, isArray } from "@vis-three/utils";
import { EventDispatcher } from "@vis-three/core";
const version = "0.6.0";
const createVNode = function(type, props = null) {
  return {
    type,
    props,
    component: null,
    el: null,
    key: null,
    ref: null,
    children: null
  };
};
class Component extends EventDispatcher {
  constructor(options, renderer) {
    super();
    __publicField(this, "cid", createSymbol());
    __publicField(this, "name", "");
    __publicField(this, "options");
    __publicField(this, "render");
    __publicField(this, "engine");
    __publicField(this, "renderer");
    __publicField(this, "isMounted", false);
    __publicField(this, "setupState");
    __publicField(this, "effect");
    __publicField(this, "scope", new EffectScope(true));
    __publicField(this, "update");
    __publicField(this, "subTree", null);
    __publicField(this, "ctx");
    options.name && (this.name = options.name);
    this.options = options;
    this.renderer = renderer;
    this.engine = renderer.engine;
    this.ctx = renderer.context;
  }
  renderTree() {
    const tree = this.render.call(this.setupState);
    return Array.isArray(tree) ? tree : [tree];
  }
  createSetup() {
    const setupResult = this.options.setup();
    this.setupState = proxyRefs(setupResult);
  }
  createRender() {
    this.render = this.options.render;
  }
  createEffect() {
    const effect = new ReactiveEffect(
      () => {
        if (!this.isMounted) {
          const subTree = this.subTree = this.renderTree();
          for (const vnode of subTree) {
            this.renderer.patch(null, vnode);
          }
          this.isMounted = true;
        } else {
          const nextTree = this.renderTree();
          const prevTree = this.subTree;
          for (let i = 0; i < nextTree.length; i += 1) {
            this.renderer.patch(prevTree[i], nextTree[i]);
          }
        }
      },
      null,
      this.scope
    );
    const update = () => effect.run();
    update();
    this.effect = effect;
    this.update = update;
  }
  getState() {
    return this.setupState;
  }
}
const defineComponent = function(options) {
  return options;
};
class Renderer {
  constructor(ctx) {
    __publicField(this, "engine");
    __publicField(this, "context");
    this.context = ctx;
    this.engine = ctx.engine;
  }
  log(type, msg, object) {
    if (!msg) {
      console.info(`Widget renderer: ${type}`);
    } else {
      console[type](`Widget renderer: ${msg}`, object);
    }
  }
  patch(oldVn, newVn) {
    if (oldVn === newVn) {
      return;
    }
    if (typeof newVn.type === "string") {
      this.processElement(oldVn, newVn);
    } else {
      this.processComponent(oldVn, newVn);
    }
  }
  render(vnode) {
    this.patch(null, vnode);
  }
  processElement(oldVn, newVn) {
    if (oldVn === null) {
      this.mountElement(newVn);
    }
  }
  unmountElement(vnode) {
    var _a;
    if (isObjectType(vnode.type) && ((_a = vnode.props) == null ? void 0 : _a.parent)) {
      const parentConfig = this.engine.getConfigfromModules(
        OBJECTMODULE,
        vnode.props.parent
      );
      if (!parentConfig) {
        console.error(
          "widget renderer: can not found parent config with: ",
          vnode
        );
        return;
      }
      parentConfig.children.splice(
        parentConfig.children.indexOf(vnode.props.vid),
        1
      );
    }
    this.engine.removeConfigBySymbol(vnode.props.vid);
  }
  mountElement(vnode) {
    const element = this.createElement(vnode);
    this.engine.applyConfig(element);
    return this;
  }
  patchElement(oldVn, newVn) {
    if (oldVn.type !== newVn.type) {
      this.unmountElement(oldVn);
      this.mountElement(newVn);
    } else {
      const oldProps = oldVn.props;
      const newProps = newVn.props;
      const config = this.engine.getConfigBySymbol(oldProps.vid);
      if (!config) {
        console.error("widget renderer: can not found  config with: ", oldVn);
      }
      const traverse = (props, config2) => {
        for (const key in props) {
          if (typeof config2[key] === "undefined") {
            console.warn(
              `widget renderer: config has not found this key: ${key}`,
              { config: config2, vnode: newVn }
            );
            continue;
          }
          if (isObject(props[key])) {
            if (isObject(config2[key])) {
              if (isArray(props[key])) {
                config2[key].splice(0, config2[key].length);
                config2[key].push(...props[key]);
              } else {
                traverse(props[key], config2[key]);
              }
            } else {
              config2[key] = props[key];
            }
          } else {
            if (config2[key] !== props[key]) {
              config2[key] = props[key];
            }
          }
        }
      };
      traverse(newProps, config);
    }
  }
  createElement(vnode) {
    return generateConfig(vnode.type, vnode.props, {
      strict: false,
      warn: false
    });
  }
  processComponent(oldVn, newVn) {
    if (oldVn === null) {
      this.mountComponent(newVn);
    }
  }
  mountComponent(vnode) {
    vnode.component = new Component(vnode.type, this);
  }
}
class Widget {
  constructor(engine, component) {
    __publicField(this, "wid", createSymbol());
    __publicField(this, "version", version);
    __publicField(this, "components", {});
    __publicField(this, "renderer");
    __publicField(this, "root");
    __publicField(this, "instance", null);
    __publicField(this, "engine");
    this.engine = engine;
    this.root = component;
    this.renderer = new Renderer(this);
  }
  component(name, component) {
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
  mount(el) {
    if (el) {
      const config = this.engine.getConfigfromModules(OBJECTMODULE, el);
      if (!config) {
        console.warn(`widget mount can not found object config with el:${el}`);
        return this;
      }
    } else {
      const config = this.engine.getObjectConfig(
        this.engine.scene
      );
      if (!config) {
        console.warn(
          `widget mount can not found object config with object:`,
          this.engine.scene
        );
        return this;
      }
    }
    const vnode = createVNode(this.root);
    this.renderer.render(vnode);
    return this;
  }
  unmount() {
  }
  use() {
  }
}
class EngineWidget extends EngineSupport {
  constructor(params = {}) {
    super(params);
  }
  createWidget(component) {
    return new Widget(this, component);
  }
}
const h = function(type, props = null) {
  return createVNode(type, props);
};
export { EngineWidget, defineComponent, h };
