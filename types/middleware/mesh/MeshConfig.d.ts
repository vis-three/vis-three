import { SolidObjectConfig } from "../solidObject/SolidObjectConfig";
export interface MeshConfig extends SolidObjectConfig {
    material: string | string[];
}
export declare const getMeshConfig: () => MeshConfig;
