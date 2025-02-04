import { Engine, Plugin } from "@vis-three/core";
import { Object3D } from "three";
import { CompilerManager } from "./CompilerManager";
export * from "./CompilerManager";
export interface CompilerManagerEngine extends Engine {
    /**编译器管理器 */
    compilerManager: CompilerManager;
    /**通过物体对象获取唯一标识 */
    getObjectSymbol: (object: any) => string | null;
    /**通过唯一标识获取物体对象 */
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
    getObjectfromModules: <O = any>(modules: string[] | Record<string, any>, vid: string) => O | null;
    /**从一个模块中通过唯一标识获取物体 */
    getObjectFromModule: <O = any>(module: string, vid: string) => O | null;
    /**从多个模块中通过唯一标识获取物体 */
    getObjectFromModules: <O = any>(modules: string[] | Record<string, any>, vid: string) => O | null;
    /**通过唯一标识获取3D物体对象 */
    getObject3D: <O extends Object3D = Object3D>(vid: string) => O | null;
}
export interface CompilerManagerPluginParameters {
}
export declare const COMPILER_MANAGER_PLUGIN = "CompilerManagerPlugin";
export declare const CompilerManagerPlugin: Plugin<CompilerManagerEngine, object>;
