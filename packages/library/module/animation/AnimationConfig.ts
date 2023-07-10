import {
  BasicAniScriptConfig,
  getSymbolConfig,
  SymbolConfig,
} from "@vis-three/middleware";

export interface AnimationConfig extends SymbolConfig {
  target: string | string[];
  play: boolean;
}

export interface ScriptAnimationConfig extends Omit<AnimationConfig, "target"> {
  target: string;
  script: BasicAniScriptConfig;
  attribute: string;
}

export interface MixerAnimationConfig extends AnimationConfig {
  time: number;
  timeScale: number;
}

export type AnimationAllType = ScriptAnimationConfig | MixerAnimationConfig;

const getAnimationConfig = function (): AnimationConfig {
  return Object.assign(getSymbolConfig(), {
    target: "",
    play: true,
  });
};

export const getMixerAnimationConfig = function (): MixerAnimationConfig {
  return Object.assign(getAnimationConfig(), {
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
