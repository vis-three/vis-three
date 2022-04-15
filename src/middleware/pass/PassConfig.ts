import { SymbolConfig } from "../common/CommonConfig";
import { CONFIGTYPE } from "../constants/configType";

/**
 * @todo width height 支持不同pass渲染不同区域
 */
export interface PassConfig extends SymbolConfig {}

export interface SMAAPassConfig extends PassConfig {}

export interface UnrealBloomPassConfig extends PassConfig {
  strength: number;
  threshold: number;
  radius: number;
}

export type PassConfigAllType = SMAAPassConfig | UnrealBloomPassConfig;

export const getPassConfig = function (): PassConfig {
  return {
    vid: "",
    type: "Pass",
  };
};

export const getSMAAPassConfig = function (): SMAAPassConfig {
  return Object.assign(getPassConfig(), {
    type: CONFIGTYPE.SMAAPASS,
  });
};

export const getUnrealBloomPassConfig = function (): UnrealBloomPassConfig {
  return Object.assign(getPassConfig(), {
    type: CONFIGTYPE.UNREALBLOOMPASS,
    strength: 1.5,
    threshold: 0,
    radius: 0,
  });
};
