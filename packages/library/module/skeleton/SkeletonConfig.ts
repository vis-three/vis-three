import { SymbolConfig, getSymbolConfig } from "@vis-three/middleware";

export interface SkeletonConfig extends SymbolConfig {
  bones: string[];
  boneInverses: [number, number,number,number,number,number,number,number,number,number,number,number,number,number,number,number][];
}

export interface LoadSkeletonConfig extends SymbolConfig {
  url: string;
}

export const getSkeletonConfig = function (): SkeletonConfig {
  return Object.assign(getSymbolConfig(), {
    bones: [],
    boneInverses: [],
  });
};

export const getLoadSkeletonConfig = function (): LoadSkeletonConfig {
  return Object.assign(getSymbolConfig(), {
    url: "",
  });
};
