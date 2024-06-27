import { Engine, Plugin } from "@vis-three/core";
import { Optional } from "@vis-three/utils";
import { Object3D } from "three";
import { OBJECTMODULE } from "../../module";
import { CompilerManager } from "./CompilerManager";

export * from "./CompilerManager";

export interface CompilerManagerEngine extends Engine {
  compilerManager: CompilerManager;
  getObjectSymbol: (object: any) => string | null;
  getObjectBySymbol: <O = any>(vid: string) => O | null;
  getObjectfromModule: <O = any>(module: string, vid: string) => O | null;
  getObjectfromModules: <O = any>(
    modules: string[] | Record<string, any>,
    vid: string
  ) => O | null;
  getObject3D: <O extends Object3D = Object3D>(vid: string) => O | null;
}

export interface CompilerManagerPluginParameters {}

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

        engine.getObjectBySymbol = function <O = any>(vid: string) {
          return compilerManager.getObjectBySymbol(vid) as O;
        };

        engine.getObjectfromModule = function <O = any>(
          module: string,
          vid: string
        ) {
          return compilerManager.getObjectfromModule(module, vid) as O;
        };

        engine.getObjectfromModules = function <O = any>(
          modules: string[] | Record<string, any>,
          vid: string
        ) {
          return compilerManager.getObjectfromModules(modules, vid) as O;
        };

        engine.getObject3D = function <O = Object3D>(vid: string) {
          return compilerManager.getObjectfromModules(OBJECTMODULE, vid) as O;
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
