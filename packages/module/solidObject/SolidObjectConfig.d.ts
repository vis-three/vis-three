import { ObjectConfig } from "@vis-three/module-object";
export interface SolidObjectConfig extends ObjectConfig {
    material: string | string[];
    geometry: string;
}
export declare const getSolidObjectConfig: () => SolidObjectConfig;
