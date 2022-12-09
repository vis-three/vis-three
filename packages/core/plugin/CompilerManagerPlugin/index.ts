import { Engine } from "../../engine";
import { EngineSupport } from "../../engine/EngineSupport";
import { Plugin } from "../plugin";
import { CompilerManager, CompilerManagerParameters } from "./CompilerManager";

export interface CompilerManagerEngine extends Engine {
  compilerManager: CompilerManager;
  getObjectSymbol: (object: any) => string | null;
  getObjectBySymbol: (vid: string) => any | null;
}

const CompilerManagerPlugin: Plugin<CompilerManagerEngine> = function (
  params?: CompilerManagerParameters
) {
  return {
    name: "CompilerManagerPlugin",
    deps: ["DataSupportManagerPlugin", "RenderManagerPlugin"],
    install(engine) {
      const compilerManager = new CompilerManager(params);

      engine.compilerManager = compilerManager;

      engine.getObjectSymbol = function (object) {
        return compilerManager.getObjectSymbol(object);
      };

      engine.getObjectBySymbol = function (vid) {
        return compilerManager.getObjectBySymbol(vid);
      };
    },
    dispose(engine) {
      engine.compilerManager.dispose();
    },
    finally(engine: EngineSupport) {
      engine.compilerManager.support(engine);
    },
  };
};

export default CompilerManagerPlugin;
