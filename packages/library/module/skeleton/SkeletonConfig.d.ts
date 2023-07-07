import { SymbolConfig } from "@vis-three/middleware";
export interface SkeletonConfig extends SymbolConfig {
    bones: string[];
}
export declare const getSkeletonConfig: () => SkeletonConfig;
