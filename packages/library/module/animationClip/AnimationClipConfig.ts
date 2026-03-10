import { BasicConfig, getBasicConfig } from "@vis-three/tdcm";
import {
  AnimationBlendMode,
  InterpolationModes,
  NormalAnimationBlendMode,
} from "three";

export interface BooleanKeyframeTrackConfig {
  type: "Boolean";
  name: string;
  times: number[];
  values: boolean[];
}

export interface ColorKeyframeTrackConfig {
  type: "Color";
  name: string;
  times: number[];
  values: string[];
  interpolation: InterpolationModes | undefined;
}

export interface NumberKeyframeTrackConfig {
  type: "Number";
  name: string;
  times: number[];
  values: number[];
  interpolation: InterpolationModes | undefined;
}

export interface QuaternionKeyframeTrackConfig {
  type: "Quaternion";
  name: string;
  times: number[];
  values: ArrayLike<number>;
  interpolation: InterpolationModes | undefined;
}

export interface StringKeyframeTrackConfig {
  type: "String";
  name: string;
  times: number[];
  values: string[];
}

export interface VectorKeyframeTrackConfig {
  type: "Vector";
  name: string;
  times: number[];
  values: ArrayLike<number>;
  interpolation: InterpolationModes | undefined;
}

export type KeyframeTracks =
  | BooleanKeyframeTrackConfig
  | ColorKeyframeTrackConfig
  | NumberKeyframeTrackConfig
  | QuaternionKeyframeTrackConfig
  | StringKeyframeTrackConfig
  | VectorKeyframeTrackConfig;

export interface AnimationClipConfig extends BasicConfig {
  duration: number;
  blendMode: AnimationBlendMode;
  tracks: KeyframeTracks[];
}

export interface LoadAnimationClipConfig extends BasicConfig {
  url: string;
}

export const getAnimationClipConfig = function (): AnimationClipConfig {
  return Object.assign(getBasicConfig(), {
    duration: -1,
    tracks: [],
    blendMode: NormalAnimationBlendMode,
  });
};

export const getLoadAnimationClipConfig = function (): LoadAnimationClipConfig {
  return Object.assign(getBasicConfig(), {
    url: "",
  });
};
