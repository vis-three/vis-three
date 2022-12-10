import { BasicAniScriptConfig } from "@vis-three/core/library/AniScriptLibrary";
import { SymbolConfig } from "../common";
import { CONFIGTYPE } from "../constants/configType";

export interface AnimationConfig extends SymbolConfig {
  name: string;
  target: string;
  attribute: string;
  play: boolean;
}

export interface ScriptAnimationConfig extends AnimationConfig {
  script: BasicAniScriptConfig;
}

export interface KeyframeAnimationConfig extends AnimationConfig {}

export type AnimationAllType = ScriptAnimationConfig | KeyframeAnimationConfig;

const getAnimationConfig = function (): AnimationConfig {
  return {
    vid: "",
    type: "",
    name: "",
    target: "",
    attribute: "",
    play: true,
  };
};

export const getScriptAnimationConfig = function (): ScriptAnimationConfig {
  return Object.assign(getAnimationConfig(), {
    type: CONFIGTYPE.SCRIPTANIMATION,
    script: {
      name: "",
    },
  });
};

export const getKeyframeAnimationConfig = function (): KeyframeAnimationConfig {
  return Object.assign(getAnimationConfig(), {
    type: CONFIGTYPE.KEYFRAMEANIMATION,
    script: {
      name: "",
    },
  });
};
