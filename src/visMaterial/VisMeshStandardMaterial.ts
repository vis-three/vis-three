import { MeshStandardMaterial, MeshStandardMaterialParameters, TangentSpaceNormalMap, Texture } from "three";
import { VisVector2Config } from "../common";
import { getVisMaterialConfig, VisMaterialAttribute, VisMaterialDataConfig } from "./VisMaterial";

export interface VisMeshStandardMaterialParameters extends MeshStandardMaterialParameters {

}

export class VisMeshStandardMaterial extends MeshStandardMaterial implements VisMaterialAttribute {
  vid: string = ''

  constructor (parameters?: VisMeshStandardMaterialParameters) {
    super(parameters)
  }
}

export interface VisMeshStandardMaterialDataConfig extends VisMaterialDataConfig {
  aoMapIntensity: number
  bumpScale: number
  color: string
  displaceMentScale: number
  displacementBias: number
  emissive: string
  emissiveIntensity: number
  envMapIntensity: number
  lightMapIntensity: number
  metalness: number
  normalMapType: number
  normalScale: VisVector2Config
  refractionRatio: number
  roughness: number
  wrieframe: boolean
  wrieframeLinecap: string
  wrieframeLinejoin: string

  roughnessMap: string
  normalMap: string
  metalnessMap: string
  map: string
  lightMap: string
  envMap: string
  emissiveMap: string
  displacementMap: string
  bumpMap: string
  alphaMap: string
  aoMap: string
}

export const getVisMeshStandardMaterialConfig = function (): VisMeshStandardMaterialDataConfig {
  return Object.assign(getVisMaterialConfig() ,{
    aoMapIntensity: 1,
    bumpScale: 1,
    color: 'rgb(255, 255, 255)',
    displaceMentScale: 1,
    displacementBias: 0,
    emissive: 'rgb(0, 0, 0)',
    emissiveIntensity: 1,
    envMapIntensity: 1,
    lightMapIntensity: 1,
    metalness: 0,
    normalMapType: TangentSpaceNormalMap,
    normalScale: {
      x: 1,
      y: 1
    },
    refractionRatio: 0.98,
    roughness: 1,
    wrieframe: false,
    wrieframeLinecap: 'round',
    wrieframeLinejoin: 'round',

    roughnessMap: '',
    normalMap: '',
    metalnessMap: '',
    map: '',
    lightMap: '',
    envMap: '',
    emissiveMap: '',
    displacementMap: '',
    bumpMap: '',
    alphaMap: '',
    aoMap: ''
  })
}