import { SymbolConfig, getSymbolConfig } from "@vis-three/middleware";

export interface HelperConfig extends SymbolConfig {}

export const getHelperConfig = function (): HelperConfig {
  return Object.assign(getSymbolConfig(), {});
};
