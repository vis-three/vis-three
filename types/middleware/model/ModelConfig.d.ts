import { ObjectConfig } from "../object/ObjectConfig";
export interface ModelConfig extends ObjectConfig {
    geometry: string;
    material: string;
    display: string;
}
export declare const getModelConfig: () => ModelConfig;
