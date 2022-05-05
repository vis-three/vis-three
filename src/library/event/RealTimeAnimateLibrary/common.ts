import { Easing } from "@tweenjs/tween.js";

export enum TIMEINGFUNCTION {
  ELN = "ELN",
  EQI = "EQI",
}

export const timeingFunction: {
  [key in TIMEINGFUNCTION]: (amount: number) => number;
} = {
  ELN: Easing.Linear.None,
  EQI: Easing.Quadratic.InOut,
};
