import { Engine } from "../engine";

export interface PluginOptions<E extends Engine> {
  name: string;
  deps?: string | string[];
  install: (engine: E) => void;
  dispose: (engine: E) => void;
}

export type Plugin<E extends Engine, P extends object> = (
  params?: P
) => PluginOptions<E>;

export const definePlugin = function <E extends Engine>(
  options: PluginOptions<E>
): Plugin<E, any> {
  return () => options;
};
