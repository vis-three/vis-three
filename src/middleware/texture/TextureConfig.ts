import { ClampToEdgeWrapping, LinearEncoding, LinearFilter, LinearMipmapLinearFilter, RGBAFormat, Texture, UVMapping } from "three";
import { SymbolConfig, Vector2Config } from "../common/CommonConfig";

export interface TextureConfig extends SymbolConfig {
  name: string
  image: string,
  mapping: number
  wrapS: number
  wrapT: number
  magFilter: number
  minFilter: number
  anisotropy: number
  format: number
  offset: Vector2Config
  repeat: Vector2Config
  rotation: number
  center: Vector2Config
  matrixAutoUpdate: boolean
  encoding: number
  needsUpdate: boolean
}

export interface ImageTextureConfig extends TextureConfig {

}

export type TextureAllType = ImageTextureConfig

export const getTextureConfig = function(): TextureConfig {
  return {
    vid: '',
    type: 'Texture',
    name: '',
    image: '',
    mapping: UVMapping,
    wrapS: ClampToEdgeWrapping,
    wrapT: ClampToEdgeWrapping,
    magFilter: LinearFilter,
    minFilter: LinearMipmapLinearFilter,
    anisotropy: 1,
    format: RGBAFormat,
    offset: {
      x: 0,
      y: 0
    },
    repeat: {
      x: 1,
      y: 1
    },
    rotation: 0,
    center: {
      x: 0,
      y: 0
    },
    matrixAutoUpdate: true,
    encoding: LinearEncoding,
    needsUpdate: false
  }
}

export const getImageTextureConfig = function(): ImageTextureConfig {
  return Object.assign(getTextureConfig(), {
    type: 'ImageTexture'
  })
}