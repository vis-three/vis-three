import { Vector3Config } from "@vis-three/tdcm";
import { ObjectConfig, getObjectConfig } from "@vis-three/module-object";

export interface DeepWaterConfig extends ObjectConfig {
  geometry: string;
  textureWidth: number;
  textureHeight: number;
  waterNormals: string;
  waterColor: string;
  sunColor: string;
  sunDirection: Vector3Config;
  size: number;
  alpha: number;
  time: number;
  distortionScale: number;
  eye: Vector3Config;
  fog: boolean;
}

export const getDeepWaterConfig = function (): DeepWaterConfig {
  return Object.assign(getObjectConfig(), {
    geometry: "",
    textureWidth: 512,
    textureHeight: 512,
    waterNormals: "",
    waterColor: "rgb(127, 127, 127)",
    sunColor: "rgb(255, 255, 255)",
    sunDirection: { x: 0.70707, y: 0.70707, z: 0.0 },
    size: 1,
    alpha: 1,
    time: 0,
    distortionScale: 20,
    eye: {
      x: 0,
      y: 0,
      z: 0,
    },
    fog: false,
  });
};
