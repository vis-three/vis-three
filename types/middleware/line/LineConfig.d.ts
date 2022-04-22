import { SolidObjectConfig } from "../solidObject/SolidObjectConfig";
export interface LineConfig extends SolidObjectConfig {
    material: string;
    geometry: string;
}
export declare const getLineConfig: () => LineConfig;
