import { Base } from "../base";

export interface PluginOptions<E extends Base> {
  /**插件的名字 */
  name: string;
  /**插件的依赖，依赖值为插件名字 */
  deps?: string | string[];
  /**插件的安装方法 */
  install: (Base: E) => void;
  /**插件的销毁方法 */
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
