import { SolidObjectConfig } from "@vis-three/module-solid-object";
export interface MeshConfig extends SolidObjectConfig {
    material: string | string[];
    morphTargetInfluences: number[];
    morphTargetDictionary: Record<string, number>;
}
export declare const getMeshConfig: () => MeshConfig;
