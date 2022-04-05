import {
  ClampToEdgeWrapping,
  CubeReflectionMapping,
  LinearEncoding,
  LinearFilter,
  LinearMipmapLinearFilter,
  RGBAFormat,
  Texture,
  UVMapping,
} from "three";
import { SymbolConfig, Vector2Config } from "../common/CommonConfig";
import { CONFIGTYPE } from "../constants/configType";

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
}

export interface ImageTextureConfig extends TextureConfig {
  url: string;
}

export interface VideoTextureConfig extends TextureConfig {
  url: string;
}

export interface CubeTextureConfig extends TextureConfig {
  cube: {
    nx: string;
    ny: string;
    nz: string;
    px: string;
    py: string;
    pz: string;
  };
}

export interface CanvasTextureConfig extends TextureConfig {
  url: string;
  needsUpdate: boolean;
}

export type TextureAllType =
  | ImageTextureConfig
  | CubeTextureConfig
  | CanvasTextureConfig
  | VideoTextureConfig;

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
    type: CONFIGTYPE.IMAGETEXTURE,
    url: "",
  });
};

export const getVideoTextureConfig = function (): ImageTextureConfig {
  return Object.assign(getTextureConfig(), {
    type: CONFIGTYPE.VIDEOTEXTURE,
    url: "",
    minFilter: LinearFilter,
  });
};

export const getCubeTextureConfig = function (): CubeTextureConfig {
  return Object.assign(getTextureConfig(), {
    type: CONFIGTYPE.CUBETEXTURE,
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
    type: CONFIGTYPE.CANVASTEXTURE,
    url: "",
    needsUpdate: false,
  });
};
