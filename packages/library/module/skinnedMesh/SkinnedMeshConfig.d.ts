import { SolidObjectConfig } from "@vis-three/module-solid-object";
export interface SkinnedMeshConfig extends SolidObjectConfig {
    skeleton: string;
    bindMode: string;
    bindMatrix: number[];
}
export declare const getSkinnedMeshConfig: () => SkinnedMeshConfig;
