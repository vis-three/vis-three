import {
  OBJECTMODULE,
  generateConfig,
  isObjectType,
} from "@vis-three/middleware";
import { EngineWidget } from "../engine";
import { Data, ElementData, VNode, isVNode } from "../vnode";
import { ObjectConfig } from "@vis-three/module-object";
import { isArray, isObject } from "@vis-three/utils";
import { Component, ComponentOptions } from "../component";
import { Widget } from "../widget";

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

  patch(oldVn: VNode | null, newVn: VNode) {
    if (oldVn === newVn) {
      return;
    }

    if (typeof newVn.type === "string") {
      this.processElement(oldVn, newVn);
    } else {
      this.processComponent(oldVn, newVn);
    }
  }

  render(vnode: VNode) {
    this.patch(null, vnode);
  }

  processElement(oldVn: VNode | null, newVn: VNode) {
    if (oldVn === null) {
      this.mountElement(newVn);
    } else {
      this.patchElement(oldVn, newVn);
    }
  }

  unmountElement(vnode: VNode) {
    if (
      isObjectType(vnode.type as string) &&
      (<VNode<ObjectConfig>>vnode).props?.parent
    ) {
      const parentConfig = this.engine.getConfigfromModules<ObjectConfig>(
        OBJECTMODULE,
        (<VNode<ObjectConfig>>vnode).props!.parent
      );

      if (!parentConfig) {
        console.error(
          "widget renderer: can not found parent config with: ",
          vnode
        );
        return;
      }

      parentConfig.children.splice(
        parentConfig.children.indexOf((<VNode<ObjectConfig>>vnode).props!.vid),
        1
      );
    }
    this.engine.removeConfigBySymbol(vnode.props!.vid);
  }

  mountElement(vnode: VNode) {
    const element = this.createElement(vnode);
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
    }
  }

  patchElement(oldVn: VNode, newVn: VNode) {
    if (oldVn.type !== newVn.type) {
      this.unmountElement(oldVn);
      this.mountElement(newVn);
    } else {
      newVn.config = oldVn.config;

      const oldProps = oldVn.props! as ElementData;
      const newProps = newVn.props! as ElementData;

      const config = oldVn.config;

      if (!config) {
        console.error("widget renderer: can not found  config with: ", oldVn);
      }

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
    }
  }

  createElement(vnode: VNode) {
    const props = vnode.props;
    const merge: Record<string, any> = {};

    for (const key in props) {
      if (isVNode(props[key])) {
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

    return config;
  }

  processComponent(oldVn: VNode | null, newVn: VNode) {
    if (oldVn === null) {
      this.mountComponent(newVn);
    }
  }

  mountComponent(vnode: VNode) {
    vnode.component = new Component(vnode.type as ComponentOptions, this);
  }
}
