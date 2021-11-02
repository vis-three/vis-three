import { ColorRepresentation, PointLight } from "three";
import { VisLightDataConfig } from "../VisLight";
import { getDataConfig as getVisObjectConfig, VisObject3DAttribute } from "../VisObject";
export interface VisPointLightParameters {
  color?: ColorRepresentation
  intensity?: number
  distance?: number
  decay?: number
}

export class VisPointLight extends PointLight implements VisObject3DAttribute {
  vid: string = ''

  constructor (parameters?: VisPointLightParameters) {
    super(parameters?.color, parameters?.intensity, parameters?.distance, parameters?.decay)
  }
}

export interface VisPointLightDataConfig extends VisLightDataConfig {
  color: string
  intensity: number
  distance: number
  decay: number
}

export const getDataConfig = (): VisPointLightDataConfig => {
  return Object.assign(getVisObjectConfig(), {
    type: 'VisPointLight',
    color: 'rgb(255, 255, 255)',
    intensity: 1,
    distance: 100,
    decay: 0.1
  })
}