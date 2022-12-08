import { ObjectConfig } from "../object/ObjectConfig";
export interface CSS2DObjectConfig extends ObjectConfig {
    element: string;
    width: number;
    height: number;
}
export interface CSS2DPlaneConfig extends CSS2DObjectConfig {
}
export type CSS2DAllType = CSS2DPlaneConfig;
export declare const getCSS2DObjectConfig: () => CSS2DObjectConfig;
export declare const getCSS2DPlaneConfig: () => CSS2DPlaneConfig;
