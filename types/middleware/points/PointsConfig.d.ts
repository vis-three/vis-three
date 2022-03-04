import { ObjectConfig } from "../object/ObjectConfig";
export interface PointsConfig extends ObjectConfig {
    geometry: string;
    material: string;
}
export declare const getPointsConfig: () => PointsConfig;
