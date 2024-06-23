import { Base } from "../base";

export interface PluginOptions<E extends Base> {
  name: string;
  deps?: string | string[];
  install: (Base: E) => void;
  dispose: (Base: E) => void;
}

export type Plugin<E extends Base, P extends object = {}> = (
  params?: P
) => PluginOptions<E>;

export const definePlugin = function <E extends Base>(
  options: PluginOptions<E>
): Plugin<E, any> {
  return () => options;
};
