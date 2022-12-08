import { SymbolConfig } from "../middleware/common/CommonConfig";
import { MODULETYPE } from "../middleware/constants/MODULETYPE";
import { Compiler, CompilerTarget } from "./Compiler";
import { Rule } from "./Rule";
export declare abstract class DataSupport<C extends SymbolConfig, O extends object, P extends Compiler<C, O>> {
    abstract MODULE: MODULETYPE;
    private dataContainer;
    private translater;
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
    getModule(): MODULETYPE;
}
