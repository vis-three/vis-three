import { SolidObjectConfig } from "../solidObject/SolidObjectConfig";
export interface PointsConfig extends SolidObjectConfig {
    geometry: string;
    material: string;
}
export declare const getPointsConfig: () => PointsConfig;
