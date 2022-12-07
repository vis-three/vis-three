import { getObjectConfig, ObjectConfig } from "../object/ObjectConfig";

export interface SolidObjectConfig extends ObjectConfig {
  material: string | string[];
  geometry: string;
}

export const getSolidObjectConfig = function (): SolidObjectConfig {
  return Object.assign(getObjectConfig(), {
    material: "",
    geometry: "",
  });
};
