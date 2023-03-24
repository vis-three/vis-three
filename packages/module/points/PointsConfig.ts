import {
  getSolidObjectConfig,
  SolidObjectConfig,
} from "@vis-three/module-solid-object";

export interface PointsConfig extends SolidObjectConfig {
  geometry: string;
  material: string;
}

export const getPointsConfig = function (): PointsConfig {
  return Object.assign(getSolidObjectConfig(), {
    geometry: "",
    material: "",
  });
};
