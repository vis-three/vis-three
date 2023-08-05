import { ObjectConfig } from "@vis-three/module-object";
/**
 * 相机基类
 */
export interface CameraConfig extends ObjectConfig {
    /**自适应窗口大小 */
    adaptiveWindow: boolean;
}
/**
 * 透视相机
 */
export interface PerspectiveCameraConfig extends CameraConfig {
    /**摄像机视锥体垂直视野角度 */
    fov: number;
    /**摄像机视锥体长宽比 */
    aspect: number;
    /**摄像机视锥体近端面 */
    near: number;
    /**摄像机视锥体远端面 */
    far: number;
}
/**
 * 正交相机
 */
export interface OrthographicCameraConfig extends CameraConfig {
    /**摄像机视锥体左侧面 */
    left: number;
    /**摄像机视锥体右侧面 */
    right: number;
    /**摄像机视锥体上侧面 */
    top: number;
    /**摄像机视锥体下侧面 */
    bottom: number;
    /**摄像机视锥体近端面 */
    near: number;
    /**摄像机视锥体远端面 */
    far: number;
    /**摄像机的缩放倍数 */
    zoom: number;
}
/**相机所有类型 */
export type CameraConfigAllType = PerspectiveCameraConfig | OrthographicCameraConfig;
/**
 * 获取透视相机配置 - 会与`getObjectConfig`合并。
 * @returns
 * @default
 * {
    adaptiveWindow: false,
    fov: 45,
    aspect: 1920 / 1080,
    near: 5,
    far: 50,
  }
 */
export declare const getPerspectiveCameraConfig: () => PerspectiveCameraConfig;
/**
 * 获取正交相机配置 - 会与`getObjectConfig`合并。
 * @returns
 * @default
 * {
      adaptiveWindow: false,
      left: -window.innerWidth,
      right: window.innerWidth,
      top: window.innerHeight,
      bottom: -window.innerHeight,
      near: 5,
      far: 50,
      zoom: 1,
    }
 */
export declare const getOrthographicCameraConfig: () => OrthographicCameraConfig;
