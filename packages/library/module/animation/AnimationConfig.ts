import { BasicConfig, getBasicConfig } from "@vis-three/tdcm";
import { BasicAniScriptConfig } from "./AniScriptGeneratorManager";

export interface AnimationConfig extends BasicConfig {
  /**播放 */
  play: boolean;
}

export interface ScriptAnimationConfig extends Omit<AnimationConfig, "target"> {
  /**动画目标 */
  target: string;
  /**脚本配置 */
  script: BasicAniScriptConfig;
  /**动画的属性 */
  attribute: string;
}

export interface MixerAnimationConfig extends AnimationConfig {
  /**动画目标 */
  target: string | string[];
  /**动画时间*/
  time: number;
  /**动画时间缩放*/
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
