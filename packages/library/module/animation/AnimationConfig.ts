import { BasicConfig, getBasicConfig } from "@vis-three/tdcm";
import { BasicAniScriptConfig } from "./AniScriptGeneratorManager";

export interface AnimationConfig extends BasicConfig {
  play: boolean;
}

export interface ScriptAnimationConfig extends Omit<AnimationConfig, "target"> {
  target: string;
  script: BasicAniScriptConfig;
  attribute: string;
}

export interface MixerAnimationConfig extends AnimationConfig {
  target: string | string[];
  time: number;
  timeScale: number;
}

export type AnimationAllType = ScriptAnimationConfig | MixerAnimationConfig;

const getAnimationConfig = function (): AnimationConfig {
  return Object.assign(getBasicConfig(), {
    play: true,
  });
};

export const getMixerAnimationConfig = function (): MixerAnimationConfig {
  return Object.assign(getAnimationConfig(), {
    target: "",
    time: 0,
    timeScale: 1,
  });
};

export const getScriptAnimationConfig = function (): ScriptAnimationConfig {
  return Object.assign(getAnimationConfig(), {
    target: "",
    script: { name: "" },
    attribute: "",
  });
};
