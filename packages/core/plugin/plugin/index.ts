import { Engine } from "../../engine";

export interface PluginOptions<E extends Engine> {
  name: string;
  deps?: string | string[];
  repeat?: boolean;
  beforeInstall?: Record<string, (engine: any) => void>;
  install: (engine: E) => void;
  installed?: Record<string, (engine: any) => void>;
  dispose: (engine: E) => void;
  finally?: (engine: any) => void;
}

export type Plugin<E extends Engine> = (params?: any) => PluginOptions<E>;

export const definePlugin = function <E extends Engine>(
  options: PluginOptions<E>
): Plugin<E> {
  return () => options;
};
