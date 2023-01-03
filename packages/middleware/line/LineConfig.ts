import { CONFIGTYPE } from "../constants/CONFIGTYPE";
import {
  getSolidObjectConfig,
  SolidObjectConfig,
} from "../solidObject/SolidObjectConfig";

export interface LineConfig extends SolidObjectConfig {
  material: string;
  geometry: string;
}

export const getLineConfig = function (): LineConfig {
  return Object.assign(getSolidObjectConfig(), {
    type: CONFIGTYPE.LINE,
    geometry: "",
    material: "",
  });
};
