import { getSymbolConfig, SymbolConfig } from "@vis-three/middleware";

export interface SegmentConfig {
  curve: string;
  params: number[];
}

export interface ShapeConfig extends SymbolConfig {
  name: string;
  shape: SegmentConfig[];
  holes: Array<SegmentConfig[]>;
}

export const getShapeConfig = function (): ShapeConfig {
  return Object.assign(getSymbolConfig(), {
    name: "",
    shape: [],
    holes: [],
  });
};
