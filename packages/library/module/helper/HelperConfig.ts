import { SymbolConfig, getSymbolConfig } from "@vis-three/middleware";

export interface HelperConfig extends SymbolConfig {}

export interface ObjectHelperConfig extends HelperConfig {
  target: string;
  shape: boolean;
  boundingBox: boolean;
  geometricOrigin: boolean;
  localAxes: boolean;
}

export const getHelperConfig = function (): HelperConfig {
  return Object.assign(getSymbolConfig(), {});
};

export const getObjectHelperConfig = function (): ObjectHelperConfig {
  return Object.assign(getHelperConfig(), {
    target: "",
    shape: true,
    boundingBox: false,
    geometricOrigin: false,
    localAxes: false,
  });
};
