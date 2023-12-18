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
    _isVNode: true,
    type,
    props,
    config: null,
    component: null,
    el: null,
    key: null,
    ref: null,
    children: null
  };
};
const isVNode = function(object) {
  if (typeof object === "object") {
    return Boolean(object["_isVNode"]);
  } else {
    return false;
  }
};
class Component extends EventDispatcher {
  constructor(options, renderer) {
    super();
    __publicField(this, "cid", createSymbol());
    __publicField(this, "name", "");
    __publicField(this, "options");
    __publicField(this, "el", "");
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
    this.el = options.el;
    this.options = options;
    this.renderer = renderer;
    this.engine = renderer.engine;
    this.ctx = renderer.context;
    this.createSetup();
    this.createRender();
    this.createEffect();
  }
  renderTree() {
    let tree = this.render.call(this.setupState);
    if (!Array.isArray(tree)) {
      tree = [tree];
    }
    for (const vnode of tree) {
      vnode.el = this.el;
    }
    return tree;
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
    if (isObjectType(element.type)) {
      if (!vnode.el) {
        this.engine.scene.add(
          this.engine.getObjectfromModules(OBJECTMODULE, element.vid)
        );
      } else {
        const parent = this.engine.getConfigfromModules(
          OBJECTMODULE,
          vnode.el
        );
        if (!parent) {
          console.error(
            `widget renderer: can not found parent config with: ${vnode.el}`
          );
          return;
        }
        parent.children.push(element.vid);
      }
    }
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
    var _a;
    const props = vnode.props;
    const merge = {};
    for (const key in props) {
      if (isVNode(props[key])) {
        merge[key] = (_a = props[key].config) == null ? void 0 : _a.vid;
      } else {
        merge[key] = props[key];
      }
    }
    const config = generateConfig(vnode.type, merge, {
      strict: false,
      warn: false
    });
    vnode.config = config;
    return config;
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
  mount() {
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
const defineEngineWidget = function(options, params = {}) {
  const engine = new EngineWidget();
  if (options.modules) {
    options.modules.forEach((module) => {
      engine.registModule(module);
    });
  }
  if (options.plugins) {
    options.plugins.forEach((plugin) => {
      engine.install(plugin);
    });
  }
  if (options.strategy) {
    options.strategy.forEach((strategy) => {
      engine.exec(strategy);
    });
  }
  if (options.wdigets) {
    options.wdigets.forEach((widget) => {
      engine.createWidget(widget);
    });
  }
  return engine;
};
const h = function(type, props = null) {
  return createVNode(type, props);
};
export { EngineWidget, defineComponent, defineEngineWidget, h };
