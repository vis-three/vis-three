import { SymbolConfig, getSymbolConfig } from "@vis-three/middleware";

export interface SegmentConfig {
  curve: string;
  params: number[];
}

export interface PathConfig extends SymbolConfig {
  curves: SegmentConfig[];
  autoClose: boolean;
}

export interface Path3Config extends SymbolConfig {}

export const getPathConfig = function (): PathConfig {
  return Object.assign(getSymbolConfig(), {
    curves: [],
    autoClose: false,
  });
};

export const getPath3Config = function (): Path3Config {
  return Object.assign(getSymbolConfig(), {});
};
