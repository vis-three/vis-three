import { SolidObjectConfig } from "@vis-three/module-solid-object";
export interface LineConfig extends SolidObjectConfig {
    material: string;
    geometry: string;
}
export declare const getLineConfig: () => LineConfig;
