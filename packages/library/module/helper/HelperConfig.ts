import { BasicConfig, getBasicConfig } from "@vis-three/tdcm";

export interface HelperConfig extends BasicConfig {}

export interface ObjectHelperConfig extends HelperConfig {
  target: string;
  shape: boolean;
  boundingBox: boolean;
  geometricOrigin: boolean;
  localAxes: boolean;
}

export const getHelperConfig = function (): HelperConfig {
  return Object.assign(getBasicConfig(), {});
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
