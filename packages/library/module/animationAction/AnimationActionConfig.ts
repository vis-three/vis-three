import { SymbolConfig, getSymbolConfig } from "@vis-three/middleware";
import { LoopRepeat } from "three";

export interface AnimationActionConfig extends SymbolConfig {
  mixer: string;
  clip: string; // vid | url
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

export const getAnimationActionConfig = function (): AnimationActionConfig {
  return Object.assign(getSymbolConfig(), {
    mixer: "",
    clip: "",
    clampWhenFinished: true,
    enabled: true,
    loop: LoopRepeat,
    paused: false,
    repetitions: Infinity,
    timeScale: 1,
    weight: 1,
    zeroSlopeAtEnd: true,
    zeroSlopeAtStart: true,
  });
};
