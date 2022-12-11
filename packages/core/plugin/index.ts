import { Engine } from "../engine";

export interface PluginOptions<E extends Engine> {
  name: string;
  deps?: string | string[];
  order?: boolean;
  install: (engine: E) => void;
  installDeps?: Record<string, (engine: any) => void>;
  dispose: (engine: E) => void;
  disposeDeps?: Record<string, (engine: any) => void>;
}

export type Plugin<E extends Engine> = (params?: any) => PluginOptions<E>;

export const definePlugin = function <E extends Engine>(
  options: PluginOptions<E>
): Plugin<E> {
  return () => options;
};
