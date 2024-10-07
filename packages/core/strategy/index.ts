import { Base } from "../base";

export interface StrategyOptions<E extends Base> {
  /**策略名字 */
  name: string;
  /**策略的条件，条件为插件名字 */
  condition: string[];
  /**执行策略的方法 */
  exec: (engine: E) => void;
  /**回滚策略的方法 */
  rollback: (engine: E) => void;
}

export type Strategy<E extends Base, P extends object = {}> = (
  params?: P
) => StrategyOptions<E>;

export const defineStrategy = function <E extends Base>(
  options: StrategyOptions<E>
): Strategy<E, any> {
  return () => options;
};
