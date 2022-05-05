import { BasicAniScriptConfig } from "../../library/aniScript/AniScriptLibrary";
import { SymbolConfig } from "../common/CommonConfig";
export interface AnimationConfig extends SymbolConfig {
    target: string;
    attribute: string;
}
export interface ScriptAnimationConfig extends AnimationConfig {
    script: BasicAniScriptConfig;
}
export interface KeyframeAnimationConfig extends AnimationConfig {
}
export declare type AnimationAllType = ScriptAnimationConfig | KeyframeAnimationConfig;
export declare const getScriptAnimationConfig: () => ScriptAnimationConfig;
export declare const getKeyframeAnimationConfig: () => KeyframeAnimationConfig;
