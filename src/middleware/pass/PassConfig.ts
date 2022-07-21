import { SymbolConfig, Vector2Config } from "../common/CommonConfig";
import { CONFIGTYPE } from "../constants/configType";

/**
 * @todo width height 支持不同pass渲染不同区域
 */
export interface PassConfig extends SymbolConfig {}

export interface SMAAPassConfig extends PassConfig {}

export interface UnrealBloomPassConfig extends PassConfig {
  resolution: Vector2Config;
  strength: number;
  threshold: number;
  radius: number;
}

export interface SelectiveBloomPassConfig extends PassConfig {
  resolution: Vector2Config;
  strength: number;
  threshold: number;
  radius: number;
  renderScene: string;
  renderCamera: string;
  selectedObjects: string[];
}

export type PassConfigAllType =
  | SMAAPassConfig
  | UnrealBloomPassConfig
  | SelectiveBloomPassConfig;

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
    resolution: {
      x: window.innerWidth,
      y: window.innerHeight,
    },
    strength: 1.5,
    threshold: 0,
    radius: 0,
  });
};

export const getSelectiveBloomPassConfig =
  function (): SelectiveBloomPassConfig {
    return Object.assign(getPassConfig(), {
      type: CONFIGTYPE.SELECTIVEBLOOMPASS,
      resolution: {
        x: window.innerWidth,
        y: window.innerHeight,
      },
      strength: 1,
      threshold: 0,
      radius: 0,
      renderScene: "",
      renderCamera: "",
      selectedObjects: [],
    });
  };
