import { getBasicConfig, BasicConfig } from "@vis-three/tdcm";

export interface ShapeConfig extends BasicConfig {
  /**路径vid标识 */
  shape: string;
  /**路径vid标识 */
  holes: string[];
}

export const getShapeConfig = function (): ShapeConfig {
  return Object.assign(getBasicConfig(), {
    shape: "",
    holes: [],
  });
};
