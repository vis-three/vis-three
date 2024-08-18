import { BasicConfig, getBasicConfig } from "@vis-three/tdcm";

export interface ControlsConfig extends BasicConfig {}

export const getControlsConfig = function (): ControlsConfig {
  return Object.assign(getBasicConfig(), {});
};
