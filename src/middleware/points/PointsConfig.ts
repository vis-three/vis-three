import { CONFIGTYPE } from "../constants/configType";
import { getObjectConfig, ObjectConfig } from "../object/ObjectConfig";

export interface PointsConfig extends ObjectConfig {
  geometry: string
  material: string
}

export const getPointsConfig = function (): PointsConfig {
  return Object.assign(getObjectConfig(), {
    type: CONFIGTYPE.POINTS,
    geometry: '',
    material: ''
  })
}