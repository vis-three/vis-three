import { PointLight, SpotLight } from "three";
import { Object3DConfig, getObject3DConfig } from "../common/ObjectConfig";

export interface LightConifg extends Object3DConfig {
  color: string,
  intensity: number
}


export interface PointLightConfig extends LightConifg {
  distance: number
  decay: number
}

export interface SpotLightConfig extends LightConifg {
  distance: number
  angle: number
  penumbra: number
  decay: number
}

export const getLightConfig = function (): LightConifg {
  return Object.assign(getObject3DConfig(), {
    type: 'Light',
    color: 'rgb(255, 255, 255)',
    intensity: 1
  })
}

export const getPointLightConfig = function (): PointLightConfig {
  return Object.assign(getLightConfig(), {
    type: 'PointLight',
    distance: 150,
    decay: 0.01
  })
}

export const getSpotLightConfig = function (): SpotLightConfig {
  return Object.assign(getLightConfig(), {
    type: 'SpotLight',
    distance: 150,
    angle: Math.PI / 180 * 45,
    penumbra: 0.01,
    decay: 0.01
  })
}