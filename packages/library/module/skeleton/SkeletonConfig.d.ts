import { BasicConfig } from "@vis-three/tdcm";
export interface SkeletonConfig extends BasicConfig {
    bones: string[];
    boneInverses: [
        number,
        number,
        number,
        number,
        number,
        number,
        number,
        number,
        number,
        number,
        number,
        number,
        number,
        number,
        number,
        number
    ][];
}
export interface LoadSkeletonConfig extends BasicConfig {
    url: string;
}
export declare const getSkeletonConfig: () => SkeletonConfig;
export declare const getLoadSkeletonConfig: () => LoadSkeletonConfig;
