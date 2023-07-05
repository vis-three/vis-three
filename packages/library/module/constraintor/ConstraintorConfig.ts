import { SymbolConfig, getSymbolConfig } from "@vis-three/middleware";

export interface ConstraintorConfig extends SymbolConfig {}

export const getConstraintorConfig = function (): ConstraintorConfig {
  return Object.assign(getSymbolConfig(), {});
};
