import { BasicConfig } from "@vis-three/tdcm";
export interface AnimationActionConfig extends BasicConfig {
    mixer: string;
    clip: string;
    clampWhenFinished: boolean;
    enabled: boolean;
    loop: number;
    paused: boolean;
    repetitions: number;
    timeScale: number;
    weight: number;
    zeroSlopeAtEnd: boolean;
    zeroSlopeAtStart: boolean;
}
export declare const getAnimationActionConfig: () => AnimationActionConfig;
