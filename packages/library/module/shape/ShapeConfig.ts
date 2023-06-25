import { getSymbolConfig, SymbolConfig } from "@vis-three/middleware";

export interface ShapeConfig extends SymbolConfig {
  /**路径vid标识 */
  shape: string;
  /**路径vid标识 */
  holes: string[];
}

export const getShapeConfig = function (): ShapeConfig {
  return Object.assign(getSymbolConfig(), {
    shape: "",
    holes: [],
  });
};
