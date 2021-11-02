import { FrontSide, Material } from "three";
import { VisCommonAttribute } from "../common";

export interface VisMaterialAttribute extends VisCommonAttribute {
  
}

export type VisMaterial = Material & VisMaterialAttribute

export interface VisMaterialDataConfig {
  type: string
  alphaTest: number
  colorWrite: boolean
  depthTest: boolean
  depthWrite: boolean
  fog: boolean
  opacity: number
  shadowSide: number | null
  side: number
  toneMapped: boolean
  transparent: boolean
  vertexColors: boolean
}

export const getVisMaterialConfig = function (): VisMaterialDataConfig {
  return {
    type: 'VisMaterial',
    alphaTest: 0,
    colorWrite: true,
    depthTest: true,
    depthWrite: true,
    fog: true,
    opacity: 1,
    shadowSide: null,
    side: FrontSide,
    toneMapped: true,
    transparent: false,
    vertexColors: false
  }
}