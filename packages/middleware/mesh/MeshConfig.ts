import { CONFIGTYPE } from "../constants/configType";
import {
  getSolidObjectConfig,
  SolidObjectConfig,
} from "../solidObject/SolidObjectConfig";

export interface MeshConfig extends SolidObjectConfig {
  material: string | string[];
}

export const getMeshConfig = function (): MeshConfig {
  return Object.assign(getSolidObjectConfig(), {
    type: CONFIGTYPE.MESH,
    geometry: "",
    material: "",
  });
};
