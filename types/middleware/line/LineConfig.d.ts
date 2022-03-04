import { ObjectConfig } from "../object/ObjectConfig";
export interface LineConfig extends ObjectConfig {
    material: string;
    geometry: string;
}
export declare const getLineConfig: () => LineConfig;
