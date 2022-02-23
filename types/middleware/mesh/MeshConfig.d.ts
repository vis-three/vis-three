import { ObjectConfig } from "../object/ObjectConfig";
export interface MeshConfig extends ObjectConfig {
    geometry: string;
    material: string;
}
export declare const getMeshConfig: () => MeshConfig;
