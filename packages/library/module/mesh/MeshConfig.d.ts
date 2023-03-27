import { SolidObjectConfig } from "@vis-three/module-solid-object";
export interface MeshConfig extends SolidObjectConfig {
    material: string | string[];
}
export declare const getMeshConfig: () => MeshConfig;
