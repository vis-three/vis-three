import { BasicConfig, Vector2Config, getBasicConfig } from "@vis-three/tdcm";
import {
  ClampToEdgeWrapping,
  CubeReflectionMapping,
  LinearFilter,
  LinearMipmapLinearFilter,
  NoColorSpace,
  RGBAFormat,
  UVMapping,
} from "three";

export interface TextureConfig extends BasicConfig {
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
  needsUpdate: boolean;
  flipY: boolean;
  colorSpace: string;
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
  return Object.assign(getBasicConfig(), {
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
    colorSpace: NoColorSpace,
    needsUpdate: false,
  });
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
