import { getObjectConfig, ObjectConfig } from "../object/ObjectConfig";

export interface ModelConfig extends ObjectConfig {
  geometry: string
  material: string
  display: string
}

export const getModelConfig = function(): ModelConfig {
  return Object.assign(getObjectConfig(), {
    type: 'Model',
    display: 'Mesh',
    geometry: '',
    material: ''
  })
}

