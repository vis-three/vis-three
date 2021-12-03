import { getObjectConfig, ObjectConfig } from "../object/ObjectConfig";

export interface ModelConfig extends ObjectConfig {
  geometry: string
  material: string
}

export interface MeshConfig extends ModelConfig {
}

export interface LineConfig extends ModelConfig {
}

export interface PointsConfig extends ModelConfig {
}

export const getModelConfig = function(): ModelConfig {
  return Object.assign(getObjectConfig(), {
    type: 'Mesh',
    geometry: '',
    material: ''
  })
}

export const getMeshConfig = function(): MeshConfig {
  return Object.assign(getObjectConfig(), {
    type: 'Mesh',
    geometry: '',
    material: ''
  })
}

export const getLineConfig = function(): LineConfig {
  return Object.assign(getObjectConfig(), {
    type: 'Line',
    geometry: '',
    material: ''
  })
}

export const getPointsConfig = function(): PointsConfig {
  return Object.assign(getObjectConfig(), {
    type: 'Points',
    geometry: '',
    material: ''
  })
}

