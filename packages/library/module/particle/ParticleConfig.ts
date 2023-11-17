import { ObjectConfig, getObjectConfig } from "@vis-three/module-object";

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

export const getRangeParticleConfig = function (): RangeParticleConfig {
  return Object.assign(getObjectConfig(), {
    range: {
      top: 100,
      bottom: -100,
      left: -100,
      right: 100,
      front: 100,
      back: -100,
    },
    amount: 200,
    size: 1,
    alphaMap: "",
    opacity: 1,
    flicker: true,
    time: 0,
  });
};
