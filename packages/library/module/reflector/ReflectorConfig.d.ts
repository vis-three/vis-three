import { ObjectConfig } from "@vis-three/module-object";
export interface ReflectorConfig extends ObjectConfig {
    geometry: string;
    color: string;
    textureWidth: number;
    textureHeight: number;
    clipBias: number;
    multisample: number;
}
export interface AdvReflectorConfig extends ObjectConfig {
    geometry: string;
    color: string;
    textureWidth: number;
    textureHeight: number;
    opacity: number;
    transparent: boolean;
    clipBias: number;
    multisample: number;
}
export declare const getReflectorConfig: () => ReflectorConfig;
export declare const getAdvReflectorConfig: () => AdvReflectorConfig;
