import { EngineSupport, MODULE_TYPE } from "@vis-three/tdcm";
import { PerspectiveCamera } from "three";

/**
 * 相机模块提供的引擎拓展支持
 */
export interface CameraEngineSupport extends EngineSupport {
  /**通过vid设置engine的当前相机 */
  setCameraBySymbol: (camera: string) => this;
}

export default function (engine: CameraEngineSupport) {
  engine.setCameraBySymbol = function (vid: string) {
    const camera = this.getObjectFromModule<PerspectiveCamera>(
      MODULE_TYPE.CAMERA,
      vid
    );
    if (camera) {
      this.setCamera(camera);
    } else {
      console.warn("can not found camera", vid);
    }
    return this;
  };
}