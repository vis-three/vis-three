import { Compiler } from "../compiler";
import { Container } from "../container";
import { BasicConfig } from "../common";
import { Ruler } from "../ruler";
export interface ConverterParameters {
    module: string;
    ruler: Ruler;
}
export declare class Converter<C extends BasicConfig, P extends Compiler = Compiler> {
    MODULE: string;
    container: Container<C>;
    ruler: Ruler;
    constructor(params: ConverterParameters);
    getData(): Record<string, C>;
    existSymbol(vid: string): boolean;
    addConfig(config: C): this;
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
