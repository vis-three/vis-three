import { SymbolConfig } from "@vis-three/middleware";
export interface SkeletonConfig extends SymbolConfig {
    bones: string[];
    boneInverses: [number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number][];
}
export interface LoadSkeletonConfig extends SymbolConfig {
    url: string;
}
export declare const getSkeletonConfig: () => SkeletonConfig;
export declare const getLoadSkeletonConfig: () => LoadSkeletonConfig;
