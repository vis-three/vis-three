import { Compiler, CompilerTarget } from "../compiler";
import { Rule } from "../rule";
import { Translater } from "../translater";
import { DataContainer } from "../dataContainer";
import { SymbolConfig } from "../common";
import { valueOf } from "@vis-three/utils";
export declare class DataSupport<C extends SymbolConfig, O extends object, P extends Compiler<C, O>> {
    MODULE: string;
    dataContainer: DataContainer<C>;
    translater: Translater<C, O, P>;
    constructor(rule: Rule<P>, data?: Array<C>);
    getData(): CompilerTarget<C>;
    existSymbol(vid: string): boolean;
    addConfig(config: valueOf<CompilerTarget<C>>): this;
    getConfig(vid: string): C;
    removeConfig(vid: string): void;
    addCompiler(compiler: P): this;
    /**
     * 导出json化配置单
     * @returns json config
     */
    toJSON(compress?: boolean): string;
    /**
     * 导出配置单
     * @param compress 是否压缩配置单 default true
     * @returns config
     */
    exportConfig(compress?: boolean): Array<C>;
    /**
     * 加载配置
     * @param configs this module configs
     * @returns true
     */
    load(configs: Array<C>): this;
    remove(configs: Array<C>): this;
}
export interface DataSupportSimplifier<C extends SymbolConfig, O extends object, P extends Compiler<C, O>> {
    new (data: Array<C>): DataSupport<C, O, P>;
}
export declare const DataSupportFactory: <C extends SymbolConfig, O extends object, P extends Compiler<C, O>>(type: string, rule: Rule<P>) => DataSupportSimplifier<C, O, P>;
