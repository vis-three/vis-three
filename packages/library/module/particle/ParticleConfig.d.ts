import { ObjectConfig } from "@vis-three/module-object";
export interface RangeParticleConfig extends ObjectConfig {
    range: {
        top: number;
        bottom: number;
        left: number;
        right: number;
        front: number;
        back: number;
    };
    amount: number;
    size: number;
    alphaMap: string;
    opacity: number;
    flicker: boolean;
    time: number;
}
export declare const getRangeParticleConfig: () => RangeParticleConfig;
