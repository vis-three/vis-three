import { SymbolConfig } from "../middleware/common/CommonConfig";
import { MODULETYPE } from "../middleware/constants/MODULETYPE";
import { Compiler, CompilerTarget } from "./Compiler";
import { IgnoreAttribute } from "./ProxyBroadcast";
import { Rule } from "./Rule";
export declare abstract class DataSupport<D extends CompilerTarget, C extends Compiler<D, object>> {
    abstract MODULE: MODULETYPE;
    private data;
    private broadcast;
    private translater;
    constructor(rule: Rule<C>, data: D, ignore?: IgnoreAttribute);
    getData(): D;
    setData(data: D): this;
    proxyData(data: D): D;
    existSymbol(vid: string): boolean;
    addConfig(config: valueOf<D>): this;
    getConfig<T extends SymbolConfig>(vid: string): T;
    removeConfig(vid: string): void;
    addCompiler(compiler: C): this;
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
    exportConfig(compress?: boolean): D;
    /**
     * 加载配置
     * @param configMap this module configMap
     * @returns true
     */
    load(configMap: D): this;
    remove(config: D): this;
    getModule(): MODULETYPE;
}
