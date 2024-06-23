import { Base } from "../base";

export interface StrategyOptions<E extends Base> {
  name: string;
  condition: string[];
  exec: (engine: E) => void;
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
