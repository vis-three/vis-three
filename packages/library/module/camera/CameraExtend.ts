import { EngineSupport, MODULETYPE } from "@vis-three/middleware";
import { CameraCompiler } from "./CameraCompiler";

/**
 * 相机模块提供的引擎拓展支持
 */
export interface CameraEngineSupport extends EngineSupport {
  /**通过vid设置engine的当前相机 */
  setCameraBySymbol: (camera: string) => this;
}

export default function (engine: CameraEngineSupport) {
  engine.setCameraBySymbol = function (camera: string) {
    const compiler = this.compilerManager.getCompiler<CameraCompiler>(
      MODULETYPE.CAMERA
    )!;
    if (compiler.map.has(camera)) {
      this.setCamera(compiler.map.get(camera)!);
    } else {
      console.warn("can not found camera", camera);
    }
    return this;
  };
}
