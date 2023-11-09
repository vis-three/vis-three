import { SymbolConfig, getSymbolConfig } from "@vis-three/middleware";

export interface ControlsConfig extends SymbolConfig {}

export const getControlsConfig = function (): ControlsConfig {
  return Object.assign(getSymbolConfig(), {});
};
