import { ObjectConfig } from "../object/ObjectConfig";
export interface ModelConfig extends ObjectConfig {
    geometry: string;
    material: string;
}
export interface MeshConfig extends ModelConfig {
}
export interface LineConfig extends ModelConfig {
}
export interface PointsConfig extends ModelConfig {
}
export declare const getModelConfig: () => ModelConfig;
export declare const getMeshConfig: () => MeshConfig;
export declare const getLineConfig: () => LineConfig;
export declare const getPointsConfig: () => PointsConfig;
