import { EngineSupport, MODULE_TYPE } from "@vis-three/tdcm";
export interface SceneEngineSupport extends EngineSupport {
  setSceneBySymbol: (scene: string) => this;
}

export default function (engine: SceneEngineSupport) {
  engine.setSceneBySymbol = function (scene: string) {
    const compiler = this.compilerManager.getCompiler(MODULE_TYPE.SCENE)!;
    if (compiler.map.has(scene)) {
      this.setScene(compiler.map.get(scene)!.puppet);
    } else {
      console.warn("can not found scene", scene);
    }
    return this;
  };
}
