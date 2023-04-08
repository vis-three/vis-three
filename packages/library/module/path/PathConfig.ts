import { SymbolConfig, getSymbolConfig } from "@vis-three/middleware";

export interface PathConfig extends SymbolConfig {}

export const getPathConfig = function (): PathConfig {
  return Object.assign(getSymbolConfig(), {});
};
