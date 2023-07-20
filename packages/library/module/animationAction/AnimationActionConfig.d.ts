import { SymbolConfig } from "@vis-three/middleware";
export interface AnimationActionConfig extends SymbolConfig {
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
