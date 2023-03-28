import { SolidObjectConfig } from "@vis-three/module-solid-object";
export interface PointsConfig extends SolidObjectConfig {
    geometry: string;
    material: string;
}
export declare const getPointsConfig: () => PointsConfig;
