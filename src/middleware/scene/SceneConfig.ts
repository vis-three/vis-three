import { SymbolConfig } from "../common/CommonConfig";

export interface SceneFogConfig {
  type: 'Fog' | 'FogExp2'
  color: string
  near: number
  far: number
  density: number
}

export interface SceneConfig extends SymbolConfig {
  background: string | null// color or vid
  environment: string | null
  fog: SceneFogConfig | null
}

export const getSceneConfig = function (): SceneConfig {
  return {
    vid: 'Scene',
    type: 'Scene',
    background: '',
    environment: '',
    fog: null
  }
}