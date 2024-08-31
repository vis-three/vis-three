import { EventDispatcher } from "@vis-three/core";
import { BasicConfig } from "../../module/common";
import { Compiler, Model } from "../../module";
import { EngineSupport } from "../../engine";
export declare class CompilerManager extends EventDispatcher {
    compilerMap: Map<string, Compiler<any>>;
    constructor();
    /**
     * 编译器扩展
     * @param compiler
     */
    extend<C extends Compiler<any>>(compiler: C, focus?: boolean): void;
    getCompiler<D extends Compiler<any> = Compiler<EngineSupport>>(module: string): D | null;
    /**
     * 获取该three物体的vid标识
     * @param object three object
     * @returns vid or null
     */
    getObjectSymbol(object: object): BasicConfig["vid"] | null;
    /**
     * 通过vid标识获取相应的three对象
     * @param vid vid标识
     * @returns three object || null
     */
    getObjectBySymbol(vid: string): any | null;
    getModelBySymbol<M extends Model<any, any, any> = Model<any, any, any>>(vid: string): M | null;
    /**
     * @deprecated use getObjectFromModule
     * @param module
     * @param vid
     * @returns
     */
    getObjectfromModule(module: string, vid: string): any;
    getObjectFromModule(module: string, vid: string): any;
    /**
     * @deprecated use getObjectFromModules
     * @param modules
     * @param vid
     * @returns
     */
    getObjectfromModules<O extends object = object>(modules: string[] | Record<string, any>, vid: string): O | null;
    getObjectFromModules<O extends object = object>(modules: string[] | Record<string, any>, vid: string): O | null;
    dispose(): this;
}
