import { OBJECT_MODULE, generateConfig, isObjectType } from "@vis-three/tdcm";
import { EngineWidget } from "../engine";
import { Data, ElementData, VNode, isOnProp, isVNode } from "../vnode";
import { ObjectConfig } from "@vis-three/module-object";
import { isArray, isObject } from "@vis-three/utils";
import { Component, ComponentOptions } from "../component";
import { Widget } from "../widget";
import { Object3D } from "three";
import { mountEvents, unmountEvents, updateEvents } from "./events";
import { vnodePropConverter } from "./converter";

export class Renderer<E extends EngineWidget = EngineWidget> {
  engine: E;
  context: Widget<E, any, any>;

  constructor(ctx: Widget<E, any, any>) {
    this.context = ctx;
    this.engine = ctx.engine;
  }

  private log(type: string, msg?: string, object?: any) {
    if (!msg) {
      console.info(`Widget renderer: ${type}`);
    } else {
      console[type](`Widget renderer: ${msg}`, object);
    }
  }

  patch(oldVn: VNode | null, newVn: VNode | null) {
    if (!oldVn && !newVn) {
      console.error(`widget renderer: patch prarams all of null`);
      return;
    }

    if (oldVn === newVn) {
      return;
    }

    if (
      (newVn && typeof newVn.type === "string") ||
      (oldVn && typeof oldVn.type === "string")
    ) {
      this.processElement(oldVn, newVn);
    } else {
      this.processComponent(oldVn, newVn);
    }
  }

  render(vnode: VNode) {
    this.patch(null, vnode);
  }

  processElement(oldVn: VNode | null, newVn: VNode | null) {
    if (!oldVn && !newVn) {
      console.error(`widget renderer: processElement prarams all of null`);
      return;
    }

    if (oldVn === null) {
      this.mountElement(newVn!);
    } else if (newVn === null) {
      this.unmountElement(oldVn!);
    } else {
      this.patchElement(oldVn!, newVn!);
    }
  }

  unmountElement(vnode: VNode) {
    // object 根据vnode el去从父级移除
    if (isObjectType(vnode.type as string)) {
      if ((<VNode<ObjectConfig>>vnode).config!.parent) {
        const parentConfig = this.engine.getConfigFromModules<ObjectConfig>(
          OBJECT_MODULE,
          (<VNode<ObjectConfig>>vnode).config!.parent,
        );

        if (!parentConfig) {
          console.error(
            "widget renderer: can not found parent config with: ",
            vnode,
          );
          return;
        }

        parentConfig.children.splice(
          parentConfig.children.indexOf(
            (<VNode<ObjectConfig>>vnode).config!.vid,
          ),
          1,
        );
      } else if (!vnode.el) {
        const object = this.engine.getObjectBySymbol(
          (<VNode<ObjectConfig>>vnode).config!.vid,
        ) as Object3D;

        if (!object) {
          console.error(
            "widget renderer: can not found Three object with: ",
            vnode,
          );
        }

        object.removeFromParent();
      }
      const object = this.engine.getObjectBySymbol(
        vnode.config!.vid,
      )! as Object3D;

      unmountEvents(vnode, object);
    }

    this.engine.removeConfigBySymbol(vnode.config!.vid);
  }

  mountElement(vnode: VNode) {
    const { element, onProps } = this.createElement(vnode);
    this.engine.applyConfig(element);

    if (isObjectType(element.type)) {
      if (!vnode.el) {
        this.engine.scene.add(
          this.engine.getObjectFromModules(OBJECT_MODULE, element.vid)!,
        );
      } else {
        const parent = this.engine.getConfigFromModules<ObjectConfig>(
          OBJECT_MODULE,
          vnode.el!,
        );

        if (!parent) {
          console.error(
            `widget renderer: can not found parent config with: ${vnode.el!}`,
          );
          return;
        }

        parent.children.push(element.vid);
      }

      const object = this.engine.getObjectBySymbol(element.vid)! as Object3D;

      mountEvents(vnode, element, object);
    }
  }

  patchElement(oldVn: VNode, newVn: VNode) {
    if (oldVn.type !== newVn.type) {
      this.unmountElement(oldVn);
      this.mountElement(newVn);
    } else {
      // 新的vnode本身没有经过createElement,这里复制一份供下一次patch使用
      newVn.config = oldVn.config;

      const config = oldVn.config;

      if (!config) {
        console.error("widget renderer: can not found  config with: ", oldVn);
      }

      // oldProps和newProps是对应config更新所以要记得converter，不然会使config出现vnode对象
      let oldProps = {}! as ElementData;

      const newProps = vnodePropConverter(newVn.props!) as ElementData;

      // 事件更新另行进行
      let hasEvent = false;
      // 由于属性是一直存在的，所以新老props的属性都是对应的

      for (const key in oldVn.props) {
        if (isOnProp(key) && !hasEvent) {
          hasEvent = true;
          continue;
        }

        oldProps[key] = vnodePropConverter(oldVn.props[key]);
      }

      // 这里是遍历oldProps的key，对应newPros的值，更新config
      const traverse = (props1: object, props2: object, target: object) => {
        for (const key in props1) {
          if (isVNode(props1[key])) {
            if (
              isVNode(props2[key]) &&
              props2[key].config.vid !== props1[key].config.vid
            ) {
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

      traverse(oldProps, newProps, config!);

      // 更新事件
      hasEvent && updateEvents(newVn);
    }
  }

  createElement(vnode: VNode) {
    const props = vnode.props;
    const merge: Record<string, any> = {};
    const onProps: Record<string, Function> = {}; // 事件props

    for (const key in props) {
      // 内部功能key不用识别与合并
      if (["$ref", "$raw", "$key"].includes(key)) {
        continue;
      }

      // 目前的事件绑定是直接传的vnode重新识别onprop进行，这里的onProps暂时无用
      if (!isOnProp(key)) {
        // onProps[key] = props[key];
        // 这里会自动提取vnode的vid，遇到对象自动递归
        merge[key] = vnodePropConverter(props[key]);
      }
    }
    const config = generateConfig(vnode.type as string, merge, {
      strict: false,
      warn: false,
    });

    vnode.config = config;

    return { element: config, onProps };
  }

  processComponent(oldVn: VNode | null, newVn: VNode | null) {
    if (!oldVn && !newVn) {
      console.error(`widget renderer: processElement prarams all of null`);
      return;
    }

    if (oldVn === null) {
      this.mountComponent(newVn!);
    } else if (newVn === null) {
      this.unmountComponent(oldVn!);
    } else {
      this.patchComponent(oldVn, newVn);
    }
  }

  mountComponent(vnode: VNode) {
    vnode.component = new Component(vnode, this);
  }

  unmountComponent(vnode: VNode) {
    vnode.component?.distory();
    vnode.component = null;
  }

  patchComponent(oldVn: VNode, newVn: VNode) {
    const component = oldVn.component!;
    newVn.component = component;
    component.vnode = newVn;

    const oldProps = oldVn.props || {};
    const newProps = newVn.props || {};

    const updateProps: Record<string, any> = {};
    let needUpdate = false;

    for (const key in newProps) {
      if (newProps[key] !== oldProps[key]) {
        updateProps[key] = newProps[key];
        needUpdate = true;
      }
    }

    if (needUpdate) {
      component.updateProps(updateProps);
      component.update();
    }
  }
}
