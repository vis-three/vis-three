import { DeepPartial } from "@vis-three/utils";
import { SymbolConfig } from "../module/common";
import { EngineSupport } from "../engine";
export interface GenerateOptions<C extends SymbolConfig> {
    strict: boolean;
    warn: boolean;
    handler?: (c: C) => C;
}
export interface GenerateConfig {
    <C extends SymbolConfig>(type: string, merge?: DeepPartial<C>, options?: GenerateOptions<C>): C;
    autoInject: boolean;
    injectEngine: EngineSupport | null;
    injectScene: string | boolean;
}
/**
 * 生成相关对象配置单
 * @param type 对象类型 CONFIGTYPE
 * @param merge 合并的对象
 * @param options.strict 严格模式，只允许合并CONFIGTYPE规定的属性，自定义扩展配置下关闭
 * @param options.warn 是否输出warn
 * @param options.handler 配置额外处理方法
 * @returns config object
 */
export declare const generateConfig: GenerateConfig;
