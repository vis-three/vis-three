import {
  OBJECTMODULE,
  generateConfig,
  isObjectType,
} from "@vis-three/middleware";
import { EngineWidget } from "../engine";
import { Data, ElementData, VNode, isOnProp, isVNode } from "../vnode";
import { ObjectConfig } from "@vis-three/module-object";
import { isArray, isObject } from "@vis-three/utils";
import { Component, ComponentOptions } from "../component";
import { Widget } from "../widget";
import { Object3D } from "three";
import { mountEvents, unmountEvents, updateEvents } from "./events";

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
        const parentConfig = this.engine.getConfigfromModules<ObjectConfig>(
          OBJECTMODULE,
          (<VNode<ObjectConfig>>vnode).config!.parent
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
            (<VNode<ObjectConfig>>vnode).config!.vid
          ),
          1
        );
      } else if (!vnode.el) {
        const object = this.engine.getObjectBySymbol(
          (<VNode<ObjectConfig>>vnode).config!.vid
        ) as Object3D;

        if (!object) {
          console.error(
            "widget renderer: can not found Three object with: ",
            vnode
          );
        }

        object.removeFromParent();
      }
      const object = this.engine.getObjectBySymbol(
        vnode.config!.vid
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
          this.engine.getObjectfromModules(OBJECTMODULE, element.vid)!
        );
      } else {
        const parent = this.engine.getConfigfromModules<ObjectConfig>(
          OBJECTMODULE,
          vnode.el!
        );

        if (!parent) {
          console.error(
            `widget renderer: can not found parent config with: ${vnode.el!}`
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
      newVn.config = oldVn.config;

      const config = oldVn.config;

      if (!config) {
        console.error("widget renderer: can not found  config with: ", oldVn);
      }

      let oldProps = {}! as ElementData;
      const newProps = newVn.props! as ElementData;

      let hasEvent = false;
      // 由于属性是一直存在的，所以新老props的属性都是对应的
      for (const key in oldVn.props) {
        if (isOnProp(key)) {
          hasEvent = true;
          continue;
        }

        oldProps[key] = oldVn.props[key];
      }

      // 这里是遍历props1的key，所以上面就只用清洗oldProps的属性就行
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

      hasEvent && updateEvents(newVn);
    }
  }

  createElement(vnode: VNode) {
    const props = vnode.props;
    const merge: Record<string, any> = {};
    const onProps: Record<string, Function> = {};
    for (const key in props) {
      if (["ref", "index"].includes(key)) {
        continue;
      }

      if (isOnProp(key)) {
        onProps[key] = props[key];
      } else if (isVNode(props[key])) {
        merge[key] = (<VNode>props[key]).config!.vid;
      } else {
        merge[key] = props[key];
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

  unmountComponent(vnode: VNode) {}

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
