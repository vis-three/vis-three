var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
import { EffectScope, proxyRefs, ReactiveEffect } from "@vue/reactivity";
export * from "@vue/reactivity";
import { createSymbol, isObjectType, OBJECTMODULE, generateConfig, EngineSupport } from "@vis-three/middleware";
import { isObject } from "@vis-three/utils";
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
var RENDER_SCOPE = /* @__PURE__ */ ((RENDER_SCOPE2) => {
  RENDER_SCOPE2["STATIC"] = "static";
  RENDER_SCOPE2["VIF"] = "vif";
  RENDER_SCOPE2["VFOR"] = "vfor";
  return RENDER_SCOPE2;
})(RENDER_SCOPE || {});
const _h = function(type, props = null) {
  const vnode = createVNode(type, props);
  _h.add(vnode);
  return vnode;
};
_h.reset = function() {
  _h.el = null;
  _h.scope = "static";
  _h.vnodes = [];
};
_h.add = function(vnode) {
  vnode.el = _h.el;
  if (_h.scope !== "static") {
    const scope = _h.vnodes[_h.vnodes.length - 1];
    if (_h.scope === "vfor") {
      if (!vnode.key) {
        vnode.key = scope.vnodes.length;
      }
      scope.keyMap.set(vnode.key, vnode);
    }
    scope.vnodes.push(vnode);
  } else {
    _h.vnodes.push(vnode);
  }
  return _h.vnodes;
};
const h = function(type, props = null) {
  return _h(type, props);
};
const vif = function(fun) {
  _h.scope = "vif";
  _h.vnodes.push({
    scope: _h.scope,
    vnodes: [],
    keyMap: /* @__PURE__ */ new Map()
  });
  fun();
  _h.scope = "static";
};
const vfor = function(fun) {
  _h.scope = "vfor";
  _h.vnodes.push({
    scope: _h.scope,
    vnodes: [],
    keyMap: /* @__PURE__ */ new Map()
  });
  fun();
  _h.scope = "static";
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
    __publicField(this, "rawSetupState");
    __publicField(this, "effect");
    __publicField(this, "effectScope", new EffectScope(true));
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
    _h.reset();
    _h.el = this.el;
    this.render.call(this.setupState);
    let tree = _h.vnodes;
    return tree;
  }
  createSetup() {
    const setupResult = this.options.setup();
    this.setupState = proxyRefs(setupResult);
    this.rawSetupState = setupResult;
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
            if (isVNode(vnode)) {
              this.renderer.patch(null, vnode);
            } else {
              for (const vn of vnode.vnodes) {
                this.renderer.patch(null, vn);
              }
            }
          }
          this.isMounted = true;
        } else {
          const nextTree = this.renderTree();
          const prevTree = this.subTree;
          if (prevTree.length !== nextTree.length) {
            console.error(`widget component render: tree render error`, {
              nextTree,
              prevTree
            });
            return;
          }
          for (let i = 0; i < nextTree.length; i += 1) {
            if (isVNode(prevTree[i]) && isVNode(nextTree[i])) {
              this.renderer.patch(prevTree[i], nextTree[i]);
            } else {
              const next = nextTree[i];
              const prev = prevTree[i];
              if (next.scope !== prev.scope) {
                console.error(`widget component render: tree render error`, {
                  nextTree,
                  prevTree
                });
                return;
              }
              if (next.scope === RENDER_SCOPE.VIF) {
                for (const vnode of prev.vnodes) {
                  this.renderer.unmountElement(vnode);
                }
                for (const vnode of next.vnodes) {
                  this.renderer.mountElement(vnode);
                }
              } else if (next.scope === RENDER_SCOPE.VFOR) {
                for (const key of next.keyMap.keys()) {
                  if (prev.keyMap.has(key)) {
                    this.renderer.patch(
                      prev.keyMap.get(key),
                      next.keyMap.get(key)
                    );
                    prev.keyMap.delete(key);
                  } else {
                    this.renderer.mountElement(next.keyMap.get(key));
                  }
                }
                for (const vnode of prev.keyMap.values()) {
                  this.renderer.unmountElement(vnode);
                }
              } else {
                console.warn(
                  `widget component render: unknow scope type: ${next.scope}`
                );
              }
            }
          }
          this.subTree = nextTree;
        }
      },
      null,
      this.effectScope
    );
    const update = () => effect.run();
    update();
    this.effect = effect;
    this.update = update;
  }
  getState(raw = false) {
    return raw ? this.rawSetupState : this.setupState;
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
    if (!oldVn && !newVn) {
      console.error(`widget renderer: patch prarams all of null`);
      return;
    }
    if (oldVn === newVn) {
      return;
    }
    if (newVn && typeof newVn.type === "string" || oldVn && typeof oldVn.type === "string") {
      this.processElement(oldVn, newVn);
    } else {
      this.processComponent(oldVn, newVn);
    }
  }
  render(vnode) {
    this.patch(null, vnode);
  }
  processElement(oldVn, newVn) {
    if (!oldVn && !newVn) {
      console.error(`widget renderer: processElement prarams all of null`);
      return;
    }
    if (oldVn === null) {
      this.mountElement(newVn);
    } else if (newVn === null) {
      this.unmountElement(oldVn);
    } else {
      this.patchElement(oldVn, newVn);
    }
  }
  unmountElement(vnode) {
    if (isObjectType(vnode.type)) {
      if (vnode.config.parent) {
        const parentConfig = this.engine.getConfigfromModules(
          OBJECTMODULE,
          vnode.config.parent
        );
        if (!parentConfig) {
          console.error(
            "widget renderer: can not found parent config with: ",
            vnode
          );
          return;
        }
        parentConfig.children.splice(
          parentConfig.children.indexOf(
            vnode.config.vid
          ),
          1
        );
      } else if (!vnode.el) {
        const object = this.engine.getObjectBySymbol(
          vnode.config.vid
        );
        if (!object) {
          console.error(
            "widget renderer: can not found Three object with: ",
            vnode
          );
        }
        object.removeFromParent();
      }
    }
    this.engine.removeConfigBySymbol(vnode.config.vid);
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
      newVn.config = oldVn.config;
      const oldProps = oldVn.props;
      const newProps = newVn.props;
      const config = oldVn.config;
      if (!config) {
        console.error("widget renderer: can not found  config with: ", oldVn);
      }
      const traverse = (props1, props2, target) => {
        for (const key in props1) {
          if (isVNode(props1[key])) {
            if (isVNode(props2[key]) && props2[key].config.vid !== props1[key].config.vid) {
              target[key] = props2[key].config.vid;
            } else if (!isVNode(props2[key])) {
              target[key] = props2[key];
            }
          } else if (isObject(props1[key])) {
            traverse(props1[key], props2[key], target[key]);
          } else {
            if (props2[key] !== props1[key]) {
              target[key] = props2[key];
            }
          }
        }
      };
      traverse(oldProps, newProps, config);
    }
  }
  createElement(vnode) {
    const props = vnode.props;
    const merge = {};
    for (const key in props) {
      if (isVNode(props[key])) {
        merge[key] = props[key].config.vid;
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
    if (!oldVn && !newVn) {
      console.error(`widget renderer: processElement prarams all of null`);
      return;
    }
    if (oldVn === null) {
      this.mountComponent(newVn);
    } else if (newVn === null) {
      this.unmountComponent(oldVn);
    } else {
      this.patchComponent(oldVn, newVn);
    }
  }
  mountComponent(vnode) {
    vnode.component = new Component(vnode.type, this);
  }
  unmountComponent(vnode) {
  }
  patchComponent(oldVn, newVn) {
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
    this.instance = vnode.component;
    return this;
  }
  getState() {
    var _a;
    return (_a = this.instance) == null ? void 0 : _a.getState(true);
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
export { EngineWidget, defineComponent, defineEngineWidget, h, vfor, vif };
