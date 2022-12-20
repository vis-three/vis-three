import { Engine, Plugin } from "@vis-three/core";
import { Optional } from "@vis-three/utils";
import { CompilerManager, CompilerManagerParameters } from "./CompilerManager";

export * from "./CompilerManager";

export interface CompilerManagerEngine extends Engine {
  compilerManager: CompilerManager;
  getObjectSymbol: (object: any) => string | null;
  getObjectBySymbol: (vid: string) => any | null;
}

export const COMPILER_MANAGER_PLUGIN = "CompilerManagerPlugin";

export const CompilerManagerPlugin: Plugin<CompilerManagerEngine> = function (
  params?: CompilerManagerParameters
) {
  return {
    name: COMPILER_MANAGER_PLUGIN,
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
    dispose(
      engine: Optional<
        CompilerManagerEngine,
        "compilerManager" | "getObjectSymbol" | "getObjectBySymbol"
      >
    ) {
      engine.compilerManager!.dispose();

      delete engine.compilerManager;
      delete engine.getObjectSymbol;
      delete engine.getObjectBySymbol;
    },
  };
};
