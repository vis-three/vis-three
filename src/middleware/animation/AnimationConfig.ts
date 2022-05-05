import { BasicAniScriptConfig } from "../../library/aniScript/AniScriptLibrary";
import { SymbolConfig } from "../common/CommonConfig";
import { CONFIGTYPE } from "../constants/configType";

export interface AnimationConfig extends SymbolConfig {
  target: string;
  attribute: string;
}

export interface ScriptAnimationConfig extends AnimationConfig {
  script: BasicAniScriptConfig;
}

export interface KeyframeAnimationConfig extends AnimationConfig {}

export type AnimationAllType = ScriptAnimationConfig | KeyframeAnimationConfig;

export const getScriptAnimationConfig = function (): ScriptAnimationConfig {
  return {
    vid: "",
    type: CONFIGTYPE.SCRIPTANIMATION,
    target: "",
    attribute: "",
    script: {
      name: "",
    },
  };
};

export const getKeyframeAnimationConfig = function (): KeyframeAnimationConfig {
  return {
    vid: "",
    type: CONFIGTYPE.KEYFRAMEANIMATION,
    target: "",
    attribute: "",
  };
};
