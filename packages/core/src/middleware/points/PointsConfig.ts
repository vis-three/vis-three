import { CONFIGTYPE } from "../constants/configType";
import {
  getSolidObjectConfig,
  SolidObjectConfig,
} from "../solidObject/SolidObjectConfig";

export interface PointsConfig extends SolidObjectConfig {
  geometry: string;
  material: string;
}

export const getPointsConfig = function (): PointsConfig {
  return Object.assign(getSolidObjectConfig(), {
    type: CONFIGTYPE.POINTS,
    geometry: "",
    material: "",
  });
};
