import { EventDispatcher } from "@vis-three/core";
import { SymbolConfig } from "../../module/common";
import { BasicCompiler, Compiler } from "../../module";
export declare class CompilerManager extends EventDispatcher {
    compilerMap: Map<string, BasicCompiler>;
    constructor();
    /**
     * 编译器扩展
     * @param compiler
     */
    extend<C extends Compiler<any, any>>(compiler: C, focus?: boolean): void;
    getCompiler<D>(module: string): D | null;
    /**
     * 获取该three物体的vid标识
     * @param object three object
     * @returns vid or null
     */
    getObjectSymbol<O extends object>(object: O): SymbolConfig["vid"] | null;
    /**
     * 通过vid标识获取相应的three对象
     * @param vid vid标识
     * @returns three object || null
     */
    getObjectBySymbol(vid: string): any | null;
    getObjectfromModule(module: string, vid: string): object | null;
    getObjectfromModules(modules: string[] | Record<string, any>, vid: string): object | null;
    dispose(): this;
}
