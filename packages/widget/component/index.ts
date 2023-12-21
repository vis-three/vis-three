import {
  EffectScope,
  ReactiveEffect,
  ReactiveEffectRunner,
  proxyRefs,
} from "@vue/reactivity";
import { Data, VNode, isVNode } from "../vnode";
import { EngineWidget } from "../engine";
import { createSymbol } from "@vis-three/middleware";
import { EventDispatcher } from "@vis-three/core";
import { Renderer } from "../renderer";
import { Widget } from "../widget";
import { RENDER_SCOPE, VNodeScpoe, _h } from "../h";
import { PropsOptions } from "./props";

export interface ComponentOptions<
  Engine extends EngineWidget = EngineWidget,
  Props extends object = any,
  RawBindings extends object = any
> {
  name?: string;
  props?: PropsOptions<Props>;
  components?: Record<string, ComponentOptions>;
  engine: Engine;
  el: string;
  setup: (props: Props) => RawBindings;
  render: () => VNode | VNode[];
}

export class Component<
  Engine extends EngineWidget = EngineWidget,
  Props extends object = any,
  RawBindings extends object = any
> extends EventDispatcher {
  cid = createSymbol();
  name = "";
  private options: ComponentOptions<Engine, Props, RawBindings>;
  private vnode!: VNode<Props>;

  private el = "";

  private render!: () => VNode | VNode[];

  private engine: Engine;
  private renderer: Renderer<Engine>;

  private isMounted = false;

  private props: Props = Object.create(Object.prototype);
  private setupState!: RawBindings;
  private rawSetupState!: RawBindings;

  private effect!: ReactiveEffect;
  private effectScope = new EffectScope(true);
  private update!: () => void;

  private subTree: Array<VNode | VNodeScpoe> | null = null;
  private ctx!: Widget<Engine>;

  constructor(vnode: VNode<Props>, renderer: Renderer<Engine>) {
    super();
    this.vnode = vnode;

    const options = vnode.type as ComponentOptions<Engine, Props, RawBindings>;

    options.name && (this.name = options.name);
    this.el = options.el;

    this.options = options;
    this.renderer = renderer;
    this.engine = renderer.engine;
    this.ctx = renderer.context;
    this.createProps();
    this.createSetup();
    this.createRender();
    this.createEffect();
  }

  private renderTree() {
    _h.reset();
    _h.el = this.el;

    this.render.call({ ...this.setupState, ...this.props });

    let tree = _h.vnodes;

    return tree;
  }

  private createProps() {
    const propsOptions = this.options.props || {};
    const props = this.props;
    const inputProps = this.vnode.props || {};

    for (const key in propsOptions) {
      const options = propsOptions[key];
      if (options.required && typeof inputProps[key] === "undefined") {
        console.error(`widget component: component prop is required.`, {
          component: this,
          props: inputProps,
          key,
        });
        return;
      }

      let value: any;

      if (typeof inputProps[key] !== "undefined") {
        value = inputProps[key];
      } else if (options.default) {
        value =
          typeof options.default === "function"
            ? options.default()
            : options.default;
      }

      if (value.constructor !== options.type) {
        console.error(
          `widget component: component prop is not instance of type.`,
          {
            component: this,
            props: inputProps,
            key,
            value,
            type: options.type,
          }
        );
        return;
      }

      props[key] = value;
    }
  }

  private createSetup() {
    const setupResult = this.options.setup(this.props);
    this.setupState = proxyRefs<any>(setupResult);
    this.rawSetupState = setupResult;
  }

  private createRender() {
    this.render = this.options.render;
  }

  private createEffect() {
    const effect = new ReactiveEffect(
      () => {
        if (!this.isMounted) {
          const subTree = (this.subTree = this.renderTree());

          for (const vnode of subTree) {
            if (isVNode(vnode)) {
              this.renderer.patch(null, vnode as VNode);
            } else {
              for (const vn of (<VNodeScpoe>vnode).vnodes) {
                this.renderer.patch(null, vn);
              }
            }
          }

          this.isMounted = true;
        } else {
          const nextTree = this.renderTree();
          const prevTree = this.subTree!;

          if (prevTree.length !== nextTree.length) {
            console.error(`widget component render: tree render error`, {
              nextTree,
              prevTree,
            });
            return;
          }

          // 由于通过vif, vfor进行结构划分，所以nextTree和prevTree的结构是相同且固定的
          // 所以i下面的结构是固定的，只用比较每个scope的vnode即可
          for (let i = 0; i < nextTree.length; i += 1) {
            if (isVNode(prevTree[i]) && isVNode(nextTree[i])) {
              this.renderer.patch(prevTree[i] as VNode, nextTree[i] as VNode);
            } else {
              // scope
              const next = nextTree[i] as VNodeScpoe;
              const prev = prevTree[i] as VNodeScpoe;
              if (next.scope !== prev.scope) {
                console.error(`widget component render: tree render error`, {
                  nextTree,
                  prevTree,
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
                      prev.keyMap.get(key)!,
                      next.keyMap.get(key)!
                    );
                    // prevTree是一次性的所有可以修改
                    prev.keyMap.delete(key);
                  } else {
                    this.renderer.mountElement(next.keyMap.get(key)!);
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

export const defineComponent = function <
  Engine extends EngineWidget = EngineWidget,
  Props extends object = any,
  RawBindings extends object = any
>(
  options: ComponentOptions<Engine, Props, RawBindings>
): ComponentOptions<Engine, Props, RawBindings> {
  return options;
};
