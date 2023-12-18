import {
  EffectScope,
  ReactiveEffect,
  ReactiveEffectRunner,
  proxyRefs,
} from "@vue/reactivity";
import { VNode } from "../vnode";
import { EngineWidget } from "../engine";
import { CONFIGTYPE, createSymbol, uniqueSymbol } from "@vis-three/middleware";
import { EventDispatcher } from "@vis-three/core";
import { Renderer } from "../renderer";
import { Widget } from "../widget";

export interface ComponentOptions<
  Engine extends EngineWidget = EngineWidget,
  Props = {},
  RawBindings = {}
> {
  name?: string;
  props?: Props;
  components?: Record<string, ComponentOptions>;
  engine: Engine;
  el: string;
  setup: () => RawBindings;
  render: () => VNode | VNode[];
}

export class Component<
  Engine extends EngineWidget = EngineWidget,
  Props = {},
  RawBindings = {}
> extends EventDispatcher {
  cid = createSymbol();
  name = "";
  private options: ComponentOptions<Engine, Props, RawBindings>;

  private el = "";

  private render!: () => VNode | VNode[];

  private engine: Engine;
  private renderer: Renderer<Engine>;

  private isMounted = false;
  private setupState!: RawBindings;
  private effect!: ReactiveEffect;
  private scope = new EffectScope(true);
  private update!: () => void;

  private subTree: VNode[] | null = null;
  private ctx!: Widget<Engine>;

  constructor(
    options: ComponentOptions<Engine, Props, RawBindings>,
    renderer: Renderer<Engine>
  ) {
    super();

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

  private renderTree() {
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
    this.setupState = proxyRefs<any>(setupResult);
  }

  createRender() {
    this.render = this.options.render;
  }

  createEffect() {
    const effect = new ReactiveEffect(
      () => {
        if (!this.isMounted) {
          const subTree = (this.subTree = this.renderTree());

          for (const vnode of subTree) {
            this.renderer.patch(null, vnode);
          }
          this.isMounted = true;
        } else {
          const nextTree = this.renderTree();
          const prevTree = this.subTree!;

          //TODO: tree scope diff
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

export const defineComponent = function <
  Engine extends EngineWidget = EngineWidget,
  Props = {},
  RawBindings = {}
>(
  options: ComponentOptions<Engine, Props, RawBindings>
): ComponentOptions<Engine, Props, RawBindings> {
  return options;
};
