import { getObjectConfig, ObjectConfig } from "@vis-three/module-object";

export interface CameraConfig extends ObjectConfig {
  adaptiveWindow: boolean; // 自适应窗口大小
}

export interface PerspectiveCameraConfig extends CameraConfig {
  fov: number;
  aspect: number;
  near: number;
  far: number;
}

export interface OrthographicCameraConfig extends CameraConfig {
  left: number;
  right: number;
  top: number;
  bottom: number;
  near: number;
  far: number;
  zoom: number;
}

export type CameraConfigAllType =
  | PerspectiveCameraConfig
  | OrthographicCameraConfig;

export const getPerspectiveCameraConfig = function (): PerspectiveCameraConfig {
  return Object.assign(getObjectConfig(), {
    adaptiveWindow: false,
    fov: 45,
    aspect: 1920 / 1080,
    near: 5,
    far: 50,
  });
};

export const getOrthographicCameraConfig =
  function (): OrthographicCameraConfig {
    return Object.assign(getObjectConfig(), {
      adaptiveWindow: false,
      left: -window.innerWidth,
      right: window.innerWidth,
      top: window.innerHeight,
      bottom: -window.innerHeight,
      near: 5,
      far: 50,
      zoom: 1,
    });
  };
