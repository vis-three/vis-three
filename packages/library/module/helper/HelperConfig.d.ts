import { BasicConfig } from "@vis-three/tdcm";
export interface HelperConfig extends BasicConfig {
}
export interface ObjectHelperConfig extends HelperConfig {
    target: string;
    shape: boolean;
    boundingBox: boolean;
    geometricOrigin: boolean;
    localAxes: boolean;
}
export declare const getHelperConfig: () => HelperConfig;
export declare const getObjectHelperConfig: () => ObjectHelperConfig;
