import { Engine, Plugin } from "@vis-three/core";
import { Object3D } from "three";
import { CompilerManager } from "./CompilerManager";
export * from "./CompilerManager";
export interface CompilerManagerEngine extends Engine {
    compilerManager: CompilerManager;
    getObjectSymbol: (object: any) => string | null;
    getObjectBySymbol: <O = any>(vid: string) => O | null;
    getObjectfromModule: <O = any>(module: string, vid: string) => O | null;
    getObjectfromModules: <O = any>(modules: string[] | Record<string, any>, vid: string) => O | null;
    getObject3D: <O extends Object3D = Object3D>(vid: string) => O | null;
}
export interface CompilerManagerPluginParameters {
}
export declare const COMPILER_MANAGER_PLUGIN = "CompilerManagerPlugin";
export declare const CompilerManagerPlugin: Plugin<CompilerManagerEngine, object>;
