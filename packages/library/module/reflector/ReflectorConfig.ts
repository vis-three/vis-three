import { ObjectConfig, getObjectConfig } from "@vis-three/module-object";
export interface ReflectorConfig extends ObjectConfig {
  geometry: string;
  color: string;
  textureWidth: number;
  textureHeight: number;

  clipBias: number;
  multisample: number;
}

export interface AdvReflectorConfig extends ObjectConfig {
  geometry: string;
  color: string;
  textureWidth: number;
  textureHeight: number;
  opacity: number;
  transparent: boolean;
  clipBias: number;
  multisample: number;
}

export const getReflectorConfig = function (): ReflectorConfig {
  return Object.assign(getObjectConfig(), {
    geometry: "",
    color: "rgb(127, 127, 127)",
    textureWidth: 0,
    textureHeight: 0,

    clipBias: 0,
    multisample: 4,
  });
};

export const getAdvReflectorConfig = function (): AdvReflectorConfig {
  return Object.assign(getObjectConfig(), {
    geometry: "",
    color: "rgb(127, 127, 127)",
    textureWidth: 0,
    textureHeight: 0,
    opacity: 1,
    transparent: false,

    clipBias: 0,
    multisample: 4,
  });
};
