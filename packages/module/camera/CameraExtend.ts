import { EngineSupport, MODULETYPE } from "@vis-three/middleware";
import { CameraCompiler } from "./CameraCompiler";

export interface CameraEngineSupport extends EngineSupport {
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
