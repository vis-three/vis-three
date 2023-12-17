import { VNode } from "../vnode";

export interface ComponentOptions<Props = {}, RawBindings = {}> {
  name?: string;
  props?: Props;
  components?: Record<string, ComponentOptions>;
  setup: () => RawBindings;
  render: () => VNode | VNode[];
}

export class Component<Props = {}, RawBindings = {}> {
  name = "";
  private options: ComponentOptions<Props, RawBindings>;
  private setupState!: RawBindings;

  constructor(options: ComponentOptions<Props, RawBindings>) {
    options.name && (this.name = options.name);
    this.options = options;
  }
}

export const defineComponent = function <Props = {}, RawBindings = {}>(
  options: ComponentOptions<Props, RawBindings>
): Component<Props, RawBindings> {
  return new Component<Props, RawBindings>(options);
};
