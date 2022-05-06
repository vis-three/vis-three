import { CONFIGTYPE } from "../constants/configType";
import { getObjectConfig, ObjectConfig } from "../object/ObjectConfig";

export interface CSS3DObjectConfig extends ObjectConfig {
  element: string; // 外部资源
}

export interface CSS3DSpriteConfig extends CSS3DObjectConfig {
  rotation2D: number;
}

export type CSS3DAllType = CSS3DObjectConfig | CSS3DSpriteConfig;

export const getCSS3DObjectConfig = function (): CSS3DObjectConfig {
  return Object.assign(getObjectConfig(), {
    type: CONFIGTYPE.CSS3DOBJECT,
    element: "",
  });
};

export const getCSS3DSpriteConfig = function (): CSS3DSpriteConfig {
  return Object.assign(getCSS3DObjectConfig(), {
    type: CONFIGTYPE.CSS3DSPRITE,
    rotation2D: 0,
  });
};
