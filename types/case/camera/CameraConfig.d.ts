import { ObjectConfig } from "../object/ObjectConfig";
export interface CameraConfig extends ObjectConfig {
    adaptiveWindow: boolean;
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
}
export declare type CameraConfigAllType = PerspectiveCameraConfig | OrthographicCameraConfig;
export declare const getPerspectiveCameraConfig: () => PerspectiveCameraConfig;
export declare const getOrthographicCameraConfig: () => OrthographicCameraConfig;
