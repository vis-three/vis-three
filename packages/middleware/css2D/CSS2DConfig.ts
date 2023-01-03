import { CONFIGTYPE } from "../constants/CONFIGTYPE";
import { getObjectConfig, ObjectConfig } from "../object/ObjectConfig";

export interface CSS2DObjectConfig extends ObjectConfig {
  element: string;
  width: number;
  height: number;
}

export interface CSS2DPlaneConfig extends CSS2DObjectConfig {}

export type CSS2DAllType = CSS2DPlaneConfig;

export const getCSS2DObjectConfig = function (): CSS2DObjectConfig {
  return Object.assign(getObjectConfig(), {
    type: CONFIGTYPE.CSS3DOBJECT,
    element: "",
    width: 50,
    height: 50,
  });
};

export const getCSS2DPlaneConfig = function (): CSS2DPlaneConfig {
  return Object.assign(getCSS2DObjectConfig(), {
    type: CONFIGTYPE.CSS2DPLANE,
  });
};
