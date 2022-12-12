import { Engine } from "../engine";

export interface PluginOptions<E extends Engine> {
  name: string;
  deps?: string | string[];
  install: (engine: E) => void;
  dispose: (engine: E) => void;
}

export type Plugin<E extends Engine> = (params?: any) => PluginOptions<E>;

export const definePlugin = function <E extends Engine>(
  options: PluginOptions<E>
): Plugin<E> {
  return () => options;
};
