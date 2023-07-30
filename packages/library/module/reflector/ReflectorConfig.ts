import { SymbolConfig, getSymbolConfig } from "@vis-three/middleware";

export interface ReflectorConfig extends SymbolConfig {}

export const getReflectorConfig = function (): ReflectorConfig {
  return Object.assign(getSymbolConfig(), {});
};
