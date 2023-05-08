import { Engine, Plugin } from "@vis-three/core";
import { Object3D } from "three";
import { CompilerManager } from "./CompilerManager";
export * from "./CompilerManager";
export interface CompilerManagerEngine extends Engine {
    compilerManager: CompilerManager;
    getObjectSymbol: (object: any) => string | null;
    getObjectBySymbol: (vid: string) => any | null;
    getObjectfromModule: (module: string, vid: string) => object | null;
    getObjectfromModules: (modules: string[] | Record<string, any>, vid: string) => object | null;
    getObject3D: (vid: string) => Object3D | null;
}
export declare const COMPILER_MANAGER_PLUGIN = "CompilerManagerPlugin";
export declare const CompilerManagerPlugin: Plugin<CompilerManagerEngine, object>;
