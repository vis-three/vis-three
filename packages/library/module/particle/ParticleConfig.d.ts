import { ObjectConfig } from "@vis-three/module-object";
export interface FloatParticleConfig extends ObjectConfig {
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
    floatRange: number;
    refColor: string;
    colorRange: number;
}
export declare const getFloatParticleConfig: () => FloatParticleConfig;
