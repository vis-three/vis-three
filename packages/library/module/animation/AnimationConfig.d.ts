import { BasicAniScriptConfig, SymbolConfig } from "@vis-three/middleware";
export interface AnimationConfig extends SymbolConfig {
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
