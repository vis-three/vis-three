import {
  SymbolConfig,
  createSymbol,
  generateConfig,
  uniqueSymbol,
} from "@vis-three/middleware";
import { DeepPartial } from "@vis-three/utils";
import { Component, ComponentInstance } from "../component";

export interface VNode<NodeProps = Record<string, any>> {
  type: string | Component;
  props: NodeProps | null;
  component: ComponentInstance | null;
  el: string | null;
  key: string | number | symbol | null;
  ref: string | null;
  children: VNode[] | null;
}

// export const createVNode = function <
//   NodeConfig extends SymbolConfig = SymbolConfig
// >(
//   type: string,
//   props: Exclude<NodeConfig, "type" | "vid">,
//   options?: Partial<{ ref: string; unique: boolean; meta: Record<string, any> }>
// ): VNode<NodeConfig> {
//   const vnode = generateConfig<NodeConfig>(
//     type,
//     Object.assign(props, {
//       alias: options ? options.ref : "",
//       vid: options?.unique ? uniqueSymbol(type) : createSymbol(),
//       meta: options ? options.meta : {},
//     }) as unknown as DeepPartial<NodeConfig>
//   );

//   return vnode;
// };
