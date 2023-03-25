import { EngineSupport, MODULETYPE } from "@vis-three/middleware";
import { SceneCompiler } from "./SceneCompiler";

export interface SceneEngineSupport extends EngineSupport {
  setSceneBySymbol: (scene: string) => this;
}

export default function (engine: SceneEngineSupport) {
  engine.setSceneBySymbol = function (scene: string) {
    const compiler = this.compilerManager.getCompiler<SceneCompiler>(
      MODULETYPE.SCENE
    )!;
    if (compiler.map.has(scene)) {
      this.setScene(compiler.map.get(scene)!);
    } else {
      console.warn("can not found scene", scene);
    }
    return this;
  };
}
