import { BasicConfig } from "@vis-three/tdcm";
export interface ModifierConfig extends BasicConfig {
    name: string;
    visible: boolean;
    source: string;
}
export interface BooleanModifierConfig extends ModifierConfig {
    target: string;
    mode: string;
}
export type ModifierAllType = BooleanModifierConfig;
export declare const getModifierConfig: () => ModifierConfig;
export declare const getBooleanModifierConfig: () => BooleanModifierConfig;
