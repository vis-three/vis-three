import { ObjectConfig } from "@vis-three/module-object";
export interface LoadModelConfig extends ObjectConfig {
    url: string;
    raw: boolean;
}
export declare const getLoadModelConfig: () => LoadModelConfig;
