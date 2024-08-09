import { DeepPartial } from "@vis-three/utils";
import { BasicConfig } from "../module/common";
import { EngineSupport } from "../engine";
/**
 * 配置单生成的附加选项
 */
export interface GenerateOptions<C extends BasicConfig> {
    /**是否生成响应式配置，默认为true */
    observer?: boolean;
    /**严格模式，只允许合并CONFIGTYPE规定的属性，自定义扩展配置下关闭 */
    strict?: boolean;
    /**控制台是否输出warn */
    warn?: boolean;
    /**
     * 配置额外处理方法，不过建议使用 全局选项`defineOption`,除非特殊情况再使用此方法。
     */
    handler?: (c: C) => C;
}
export interface GenerateConfig {
    <C extends BasicConfig>(type: string, merge?: DeepPartial<C>, options?: GenerateOptions<C>): C;
    autoInject: boolean;
    injectEngine: EngineSupport | null;
    injectScene: string | boolean;
}
/**
 * 生成相关对象配置单
 * @param type 对象类型 CONFIGTYPE
 * @param merge 合并的对象
 * @param options 函数的拓展选项
 * @returns config object
 */
export declare const generateConfig: GenerateConfig;
