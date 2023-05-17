import { SymbolConfig } from "@vis-three/middleware";
export interface HelperConfig extends SymbolConfig {
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
