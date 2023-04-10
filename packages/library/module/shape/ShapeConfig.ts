import { getSymbolConfig, SymbolConfig } from "@vis-three/middleware";


export interface ShapeConfig extends SymbolConfig {
  shape: string;
  holes: string[];
}

export const getShapeConfig = function (): ShapeConfig {
  return Object.assign(getSymbolConfig(), {
    shape: "",
    holes: [],
  });
};
