import { getObjectConfig, ObjectConfig } from "../object/ObjectConfig";

export interface ModelConfig extends ObjectConfig {
  geometry: string
  material: string
}

export const getModelConfig = function(): ModelConfig {
  return Object.assign(getObjectConfig(), {
    type: 'Mesh',
    geometry: '',
    material: ''
  })
}

