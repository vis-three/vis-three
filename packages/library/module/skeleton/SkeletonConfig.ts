import { SymbolConfig, getSymbolConfig } from "@vis-three/middleware";

export interface SkeletonConfig extends SymbolConfig {
  bones: string[];
}

export const getSkeletonConfig = function (): SkeletonConfig {
  return Object.assign(getSymbolConfig(), {
    bones: [],
  });
};
