import { SymbolConfig } from "@vis-three/middleware";
export interface ModifierConfig extends SymbolConfig {
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
