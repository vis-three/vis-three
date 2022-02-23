import { CONFIGTYPE } from "../constants/configType";
import { getObjectConfig, ObjectConfig } from "../object/ObjectConfig";

export interface MeshConfig extends ObjectConfig {
  geometry: string
  material: string
}

export const getMeshConfig = function(): MeshConfig {
  return Object.assign(getObjectConfig(), {
    type: CONFIGTYPE.MESH,
    geometry: '',
    material: '',
  })
}