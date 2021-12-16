import { getObjectConfig, ObjectConfig } from "../object/ObjectConfig";

export interface CameraConfig extends ObjectConfig {

}

export interface PerspectiveCameraConfig extends CameraConfig {
  fov: number
  aspect: number
  near: number
  far: number
}

export interface OrthographicCameraConfig extends CameraConfig {
  left: number
  right: number
  top: number
  bottom: number
  near: number
  far: number
}

export type CameraAllType = PerspectiveCameraConfig | OrthographicCameraConfig

export const getPerspectiveCameraConfig = function(): PerspectiveCameraConfig {
  return Object.assign(getObjectConfig(), {
    type: 'PerspectiveCamera',
    fov: 45,
    aspect: 1920 / 1080,
    near: 5,
    far: 50
  })
}

export const getOrthographicCameraConfig = function(): OrthographicCameraConfig {
  return Object.assign(getObjectConfig(), {
    type: 'OrthographicCamera',
    left: 1920 / 16,
    right: 1920 / 16,
    top: 1080 / 16,
    bottom: 1080 / 16,
    near: 5,
    far: 50
  })
}