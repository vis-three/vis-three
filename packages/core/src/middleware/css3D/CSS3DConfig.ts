import { CONFIGTYPE } from "../constants/configType";
import { getObjectConfig, ObjectConfig } from "../object/ObjectConfig";

export interface CSS3DObjectConfig extends ObjectConfig {
  element: string; // 外部资源
  width: number;
  height: number;
}

export interface CSS3DPlaneConfig extends CSS3DObjectConfig {}

export interface CSS3DSpriteConfig extends CSS3DObjectConfig {
  rotation2D: number;
}

export type CSS3DAllType =
  | CSS3DObjectConfig
  | CSS3DSpriteConfig
  | CSS3DPlaneConfig;

export const getCSS3DObjectConfig = function (): CSS3DObjectConfig {
  return Object.assign(getObjectConfig(), {
    type: CONFIGTYPE.CSS3DOBJECT,
    element: "",
    width: 50,
    height: 50,
  });
};

export const getCSS3DPlaneConfig = function (): CSS3DPlaneConfig {
  return Object.assign(getCSS3DObjectConfig(), {
    type: CONFIGTYPE.CSS3DPLANE,
  });
};

export const getCSS3DSpriteConfig = function (): CSS3DSpriteConfig {
  return Object.assign(getCSS3DObjectConfig(), {
    type: CONFIGTYPE.CSS3DSPRITE,
    rotation2D: 0,
  });
};
