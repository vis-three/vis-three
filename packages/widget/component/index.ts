import { VNode } from "../vnode";

export interface Component {
  name?: string;
  components?: Record<string, Component>;
  setup: () => Record<string, any>;
  render: () => VNode | VNode[];
}

export interface ComponentInstance {}

export const defineComponent = function (options: Component): Component {
  return options;
};
