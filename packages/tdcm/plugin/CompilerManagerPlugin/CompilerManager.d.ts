import { EventDispatcher } from "@vis-three/core";
import { BasicConfig } from "../../module/common";
import { Compiler, Model } from "../../module";
import { EngineSupport } from "../../engine";
export declare class CompilerManager extends EventDispatcher {
    compilerMap: Map<string, Compiler<any>>;
    constructor();
    /**
     * 编译器拓展
     * @param compiler 拓展的编译器
     * @param focus 强制覆盖
     */
    extend<C extends Compiler<any>>(compiler: C, focus?: boolean): void;
    /**
     * 获取编译器
     * @param module 编译器所属的模块
     * @returns compiler | null
     */
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
    /**
     * 通过vid标识获取相应的配置化模型
     * @param vid vid标识
     * @returns model
     */
    getModelBySymbol<M extends Model<any, any, any> = Model<any, any, any>>(vid: string): M | null;
    /**
     * @deprecated use getObjectFromModule
     * @param module
     * @param vid
     * @returns
     */
    getObjectfromModule(module: string, vid: string): any;
    /**
     * 从一个模块中通过vid获取物体对象
     * @param module 指定模块
     * @param vid vid标识
     * @returns object | null
     */
    getObjectFromModule(module: string, vid: string): any;
    /**
     * @deprecated use getObjectFromModules
     * @param modules
     * @param vid
     * @returns
     */
    getObjectfromModules<O extends object = object>(modules: string[] | Record<string, any>, vid: string): O | null;
    /**
     * 从多个模块中通过vid获取物体
     * @param modules 指定的多个模块
     * @param vid vid标识
     * @returns object | null
     */
    getObjectFromModules<O extends object = object>(modules: string[] | Record<string, any>, vid: string): O | null;
    /**
     * 整个编译器的销毁方法
     * @returns this
     */
    dispose(): this;
}
