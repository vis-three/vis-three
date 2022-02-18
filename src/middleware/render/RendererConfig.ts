import { LinearEncoding, NoToneMapping, PCFShadowMap } from "three";
import { SymbolConfig, Vector2Config } from "../common/CommonConfig";

export interface RenderConfig extends SymbolConfig {

}

export interface ShadowMapConfig {
  enabled: boolean
  autoUpdate: boolean
  type: number
}

export interface WebGLRendererViewPort {
  x: number
  y: number
  width: number
  height: number
}

export interface WebGLRendererScissor extends WebGLRendererViewPort {}

export interface WebGLRendererConfig extends RenderConfig {
  readonly vid: string
  clearColor: string
  pixelRatio: number
  outputEncoding: number
  physicallyCorrectLights: boolean
  shadowMap: ShadowMapConfig
  toneMapping: number
  toneMappingExposure: number
  adaptiveCamera: boolean // 适应相机
  viewport: WebGLRendererViewPort | null // 为null 默认跟随canves
  scissor: WebGLRendererScissor | null // 为null 默认跟随canves
  size: Vector2Config | null // 为null 默认跟随canves
}

export type RendererAllType = WebGLRendererConfig | CSS3DRendererConfig
export interface CSS3DRendererConfig extends RenderConfig {
  vid: 'CSS3DRenderer', // unique
  type: 'CSS3DRenderer',
  size: null,
}

export const getWebGLRendererConfig = function (): WebGLRendererConfig {
  return {
    vid: 'WebGLRenderer', // unique
    type: 'WebGLRenderer',
    clearColor: 'rgba(0, 0, 0, 0)',
    outputEncoding: LinearEncoding,
    physicallyCorrectLights: false,
    shadowMap: {
      enabled: false,
      autoUpdate: true,
      type: PCFShadowMap
    },
    toneMapping: NoToneMapping,
    toneMappingExposure: 1,
    pixelRatio: window.devicePixelRatio,
    adaptiveCamera: false,
    viewport: null,
    scissor: null,
    size: null,
  }
}