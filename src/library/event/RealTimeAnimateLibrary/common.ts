import { Easing } from "@tweenjs/tween.js";

export enum TIMINGFUNCTION {
  ELN = "ELN",
  EQI = "EQI",
}

export const timingFunction: {
  [key in TIMINGFUNCTION]: (amount: number) => number;
} = {
  ELN: Easing.Linear.None,
  EQI: Easing.Quadratic.InOut,
};
