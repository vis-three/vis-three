import { SymbolConfig } from "../common/CommonConfig";
export interface AnimationConfig extends SymbolConfig {
    target: string;
}
export interface ScriptAnimationConfig extends AnimationConfig {
}
export interface KeyframeAnimationConfig extends AnimationConfig {
}
