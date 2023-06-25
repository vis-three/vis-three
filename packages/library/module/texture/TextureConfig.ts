import { SymbolConfig, Vector2Config } from "@vis-three/middleware";
import {
  ClampToEdgeWrapping,
  CubeReflectionMapping,
  LinearEncoding,
  LinearFilter,
  LinearMipmapLinearFilter,
  RGBAFormat,
  UVMapping,
} from "three";

export interface TextureConfig extends SymbolConfig {
  name: string;
  mapping: number;
  wrapS: number;
  wrapT: number;
  magFilter: number;
  minFilter: number;
  anisotropy: number;
  format: number;
  offset: Vector2Config;
  repeat: Vector2Config;
  rotation: number;
  center: Vector2Config;
  matrixAutoUpdate: boolean;
  encoding: number;
  needsUpdate: boolean;
  flipY: boolean;
}

export interface ImageTextureConfig extends TextureConfig {
  /**通过resourceManager 解析的图片资源地址 */
  url: string;
}

export interface VideoTextureConfig extends TextureConfig {
  /**通过resourceManager 解析的视频资源地址 */
  url: string;
}

export interface CubeTextureConfig extends TextureConfig {
  cube: {
    /**通过resourceManager 解析的图片资源地址 */
    nx: string;
    /**通过resourceManager 解析的图片资源地址 */
    ny: string;
    /**通过resourceManager 解析的图片资源地址 */
    nz: string;
    /**通过resourceManager 解析的图片资源地址 */
    px: string;
    /**通过resourceManager 解析的图片资源地址 */
    py: string;
    /**通过resourceManager 解析的图片资源地址 */
    pz: string;
  };
}

export interface CanvasTextureConfig extends TextureConfig {
  /**通过resourceManager 解析的canvas资源地址 */
  url: string;
  /**如果canvas资源更新，你可以通过此属性为true更新 */
  needsUpdate: boolean;
}

export interface LoadTextureConfig extends TextureConfig {
  /**通过resourceManager 解析的纹理资源地址 */
  url: string;
}

export type TextureAllType =
  | ImageTextureConfig
  | CubeTextureConfig
  | CanvasTextureConfig
  | VideoTextureConfig
  | LoadTextureConfig;

export const getTextureConfig = function (): TextureConfig {
  return {
    vid: "",
    type: "Texture",
    name: "",
    mapping: UVMapping,
    wrapS: ClampToEdgeWrapping,
    wrapT: ClampToEdgeWrapping,
    magFilter: LinearFilter,
    minFilter: LinearMipmapLinearFilter,
    anisotropy: 1,
    format: RGBAFormat,
    flipY: true,
    offset: {
      x: 0,
      y: 0,
    },
    repeat: {
      x: 1,
      y: 1,
    },
    rotation: 0,
    center: {
      x: 0,
      y: 0,
    },
    matrixAutoUpdate: true,
    encoding: LinearEncoding,
    needsUpdate: false,
  };
};

export const getImageTextureConfig = function (): ImageTextureConfig {
  return Object.assign(getTextureConfig(), {
    url: "",
  });
};

export const getVideoTextureConfig = function (): ImageTextureConfig {
  return Object.assign(getTextureConfig(), {
    url: "",
    minFilter: LinearFilter,
  });
};

export const getCubeTextureConfig = function (): CubeTextureConfig {
  return Object.assign(getTextureConfig(), {
    cube: {
      nx: "",
      ny: "",
      nz: "",
      px: "",
      py: "",
      pz: "",
    },
    mapping: CubeReflectionMapping,
    flipY: false,
  });
};

export const getCanvasTextureConfig = function (): CanvasTextureConfig {
  return Object.assign(getTextureConfig(), {
    url: "",
    needsUpdate: false,
  });
};

export const getLoadTextureConfig = function (): LoadTextureConfig {
  return Object.assign(getTextureConfig(), {
    url: "",
  });
};
