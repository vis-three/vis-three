import { BasicConfig } from "@vis-three/tdcm";
import { BasicAniScriptConfig } from "./AniScriptManager";
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
export declare const getMixerAnimationConfig: () => MixerAnimationConfig;
export declare const getScriptAnimationConfig: () => ScriptAnimationConfig;
