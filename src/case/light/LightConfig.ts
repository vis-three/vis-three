import { PointLight, SpotLight } from "three";
import { ObjectConfig, getObjectConfig } from "../object/ObjectConfig";

export interface LightConifg extends ObjectConfig {
  color: string,
  intensity: number
}

export interface AmbientLightConfig extends LightConifg {

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
  return Object.assign(getObjectConfig(), {
    type: 'Light',
    color: 'rgb(255, 255, 255)',
    intensity: 1
  })
}

export const getAmbientLightConfig = function (): AmbientLightConfig {
  return Object.assign(getObjectConfig(), {
    type: 'AmbientLight',
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