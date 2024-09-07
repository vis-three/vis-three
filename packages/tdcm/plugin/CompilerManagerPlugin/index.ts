import { Engine, Plugin } from "@vis-three/core";
import { Optional } from "@vis-three/utils";
import { Object3D } from "three";
import { OBJECT_MODULE } from "../../module";
import { CompilerManager } from "./CompilerManager";

export * from "./CompilerManager";

export interface CompilerManagerEngine extends Engine {
  compilerManager: CompilerManager;
  getObjectSymbol: (object: any) => string | null;
  getObjectBySymbol: <O = any>(vid: string) => O | null;
  /**
   * @deprecated use getObjectFromModule
   * @param module
   * @param vid
   * @returns
   */
  getObjectfromModule: <O = any>(module: string, vid: string) => O | null;
  /**
   * @deprecated use getObjectFromModules
   * @param module
   * @param vid
   * @returns
   */
  getObjectfromModules: <O = any>(
    modules: string[] | Record<string, any>,
    vid: string
  ) => O | null;
  getObjectFromModule: <O = any>(module: string, vid: string) => O | null;
  getObjectFromModules: <O = any>(
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

        engine.getObjectFromModule = function <O = any>(
          module: string,
          vid: string
        ) {
          return compilerManager.getObjectFromModule(module, vid) as O;
        };

        engine.getObjectFromModules = function <O = any>(
          modules: string[] | Record<string, any>,
          vid: string
        ) {
          return compilerManager.getObjectFromModules(modules, vid) as O;
        };

        engine.getObject3D = function <O = Object3D>(vid: string) {
          return compilerManager.getObjectFromModules(OBJECT_MODULE, vid) as O;
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
          | "getObjectFromModule"
          | "getObjectFromModules"
          | "getObject3D"
        >
      ) {
        engine.compilerManager!.dispose();

        delete engine.compilerManager;
        delete engine.getObjectSymbol;
        delete engine.getObjectBySymbol;
        delete engine.getObjectfromModule;
        delete engine.getObjectfromModules;
        delete engine.getObjectFromModule;
        delete engine.getObjectFromModules;
        delete engine.getObject3D;
      },
    };
  };
