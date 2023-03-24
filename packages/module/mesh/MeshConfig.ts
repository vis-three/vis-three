import {
  getSolidObjectConfig,
  SolidObjectConfig,
} from "@vis-three/module-solid-object";

export interface MeshConfig extends SolidObjectConfig {
  material: string | string[];
}

export const getMeshConfig = function (): MeshConfig {
  return Object.assign(getSolidObjectConfig(), {
    geometry: "",
    material: "",
  });
};
