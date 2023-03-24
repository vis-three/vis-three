import { ObjectConfig } from "@vis-three/module-object";
export interface CSS3DObjectConfig extends ObjectConfig {
    element: string;
    width: number;
    height: number;
}
export interface CSS3DPlaneConfig extends CSS3DObjectConfig {
}
export interface CSS3DSpriteConfig extends CSS3DObjectConfig {
    rotation2D: number;
}
export type CSS3DAllType = CSS3DObjectConfig | CSS3DSpriteConfig | CSS3DPlaneConfig;
export declare const getCSS3DObjectConfig: () => CSS3DObjectConfig;
export declare const getCSS3DPlaneConfig: () => CSS3DPlaneConfig;
export declare const getCSS3DSpriteConfig: () => CSS3DSpriteConfig;
