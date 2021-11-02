import { ColorRepresentation, SpotLight } from "three";
import { VisLightDataConfig } from "../VisLight";
import { getDataConfig as getVisObjectDataConfig, VisObject3DAttribute } from "../VisObject";

export interface VisSpotLightParameters {
  color?: ColorRepresentation,
  intensity?: number,
  distance?: number,
  angle?: number,
  penumbra?: number,
  decay?: number
}

export class VisSpotLight extends SpotLight implements VisObject3DAttribute {
  vid: string = ''

  constructor (parameters?: VisSpotLightParameters) {
    super(
      parameters?.color,
      parameters?.intensity,
      parameters?.distance,
      parameters?.decay,
      parameters?.penumbra,
      parameters?.angle
    )
  }
}

export interface VisSpotLightDataConfig extends VisLightDataConfig {
  color: string
  intensity: number
  distance: number
  decay: number
  angle: number
  penumbra: number
}

export const getDataConfig = (): VisSpotLightDataConfig => {
  return Object.assign(getVisObjectDataConfig(), {
    type: 'VisSpotLight',
    color: 'rgb(255, 255, 255)',
    intensity: 1,
    distance: 100,
    decay: 0.1,
    angle: Math.PI / 180 * 45,
    penumbra: 0.1,
  })
}