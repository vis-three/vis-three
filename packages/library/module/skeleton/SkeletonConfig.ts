import { BasicConfig, getBasicConfig } from "@vis-three/tdcm";

export interface SkeletonConfig extends BasicConfig {
  bones: string[];
  boneInverses: [
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number
  ][];
}

export interface LoadSkeletonConfig extends BasicConfig {
  url: string;
}

export const getSkeletonConfig = function (): SkeletonConfig {
  return Object.assign(getBasicConfig(), {
    bones: [],
    boneInverses: [],
  });
};

export const getLoadSkeletonConfig = function (): LoadSkeletonConfig {
  return Object.assign(getBasicConfig(), {
    url: "",
  });
};
