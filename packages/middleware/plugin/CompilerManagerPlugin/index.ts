import { Engine, Plugin } from "@vis-three/core";
import { Optional } from "@vis-three/utils";
import { Object3D } from "three";
import { OBJECTMODULE } from "../../module";
import { CompilerManager } from "./CompilerManager";

export * from "./CompilerManager";

export interface CompilerManagerEngine extends Engine {
  compilerManager: CompilerManager;
  getObjectSymbol: (object: any) => string | null;
  getObjectBySymbol: (vid: string) => any | null;
  getObjectfromModule: (module: string, vid: string) => object | null;
  getObjectfromModules: (
    modules: string[] | Record<string, any>,
    vid: string
  ) => object | null;
  getObject3D: (vid: string) => Object3D | null;
}

export const COMPILER_MANAGER_PLUGIN = "CompilerManagerPlugin";

export const CompilerManagerPlugin: Plugin<CompilerManagerEngine, object> =
  function () {
    return {
      name: COMPILER_MANAGER_PLUGIN,
      install(engine) {
        const compilerManager = new CompilerManager();

        engine.compilerManager = compilerManager;

        engine.getObjectSymbol = function (object) {
          return compilerManager.getObjectSymbol(object);
        };

        engine.getObjectBySymbol = function (vid) {
          return compilerManager.getObjectBySymbol(vid);
        };

        engine.getObjectfromModule = function (module, vid) {
          return compilerManager.getObjectfromModule(module, vid);
        };

        engine.getObjectfromModules = function (modules, vid) {
          return compilerManager.getObjectfromModules(modules, vid);
        };

        engine.getObject3D = function (vid) {
          return compilerManager.getObjectfromModules(
            OBJECTMODULE,
            vid
          ) as Object3D;
        };
      },
      dispose(
        engine: Optional<
          CompilerManagerEngine,
          | "compilerManager"
          | "getObjectSymbol"
          | "getObjectBySymbol"
          | "getObjectfromModule"
          | "getObjectfromModules"
          | "getObject3D"
        >
      ) {
        engine.compilerManager!.dispose();

        delete engine.compilerManager;
        delete engine.getObjectSymbol;
        delete engine.getObjectBySymbol;
        delete engine.getObjectfromModule;
        delete engine.getObjectfromModules;
        delete engine.getObject3D;
      },
    };
  };
