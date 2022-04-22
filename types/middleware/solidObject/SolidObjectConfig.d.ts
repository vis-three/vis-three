import { ObjectConfig } from "../object/ObjectConfig";
export interface SolidObjectConfig extends ObjectConfig {
    material: string | string[];
    geometry: string;
}
export declare const getSolidObjectConfig: () => SolidObjectConfig;
