import { CONFIGTYPE } from "../constants/configType";
import { getObjectConfig, ObjectConfig } from "../object/ObjectConfig";

export interface LineConfig extends ObjectConfig {
  material: string
  geometry: string
}

export const getLineConfig = function(): LineConfig {
  return Object.assign(getObjectConfig(), {
    type: CONFIGTYPE.LINE,
    geometry: '',
    material: '',
  })
}