import { Engine } from "../engine";

export interface StrategyOptions<E extends Engine> {
  name: string;
  condition: string[];
  exec: (engine: E) => void;
  rollback: (engine: E) => void;
}

export type Strategy<E extends Engine, P extends object> = (
  params?: P
) => StrategyOptions<E>;

export const defineStrategy = function <E extends Engine>(
  options: StrategyOptions<E>
): Strategy<E, any> {
  return () => options;
};
