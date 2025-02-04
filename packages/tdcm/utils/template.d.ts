import { BasicConfig } from "../module";
import { EngineSupportLoadOptions } from "../engine";
import { LoadOptions } from "../plugin/DataSupportManagerPlugin";
export interface CloneResult {
    config: EngineSupportLoadOptions;
    detail: Record<string, string>;
}
/**
 * 克隆整个配置单
 * @param object EngineSupportLoadOptions
 * @param options 额外选项
 * - detail:bolean 返回clone映射 old -> new
 * - fillName 是否填充未命名的单位
 * - filter 过滤的选项，不会被克隆
 * @returns EngineSupportLoadOptions | CloneResult
 */
export declare const clone: (object: EngineSupportLoadOptions, options?: {
    filter?: string[];
    detail?: boolean;
    fillName?: boolean | ((BasicConfig: any) => string);
}) => EngineSupportLoadOptions | CloneResult;
/**
 * 对配置单中的每个配置项做处理
 * @param object 需要模板处理的对象
 * @param handler 每个配置的处理方法
 * @param options
 * - filter 过滤的选项，不会被处理
 * - clone 是否为克隆处理，不克隆会直接影响原对象
 * @return 原对象或克隆对象
 */
export declare const handler: (object: EngineSupportLoadOptions, handler: (config: BasicConfig) => BasicConfig, options?: {
    filter?: string[];
    clone?: boolean;
}) => EngineSupportLoadOptions;
export declare const planish: (configs: LoadOptions) => Record<string, BasicConfig>;
/**
 * 将整个对象进行观察者转化，内部会进行深度拷贝，和使用`generateConfig` api
 * @param object 配置单结构
 * @param obCallback 转化完成后的处理
 * @returns 可观察的配置
 */
export declare const observable: (object: EngineSupportLoadOptions | string, obCallback?: (config: BasicConfig) => BasicConfig) => EngineSupportLoadOptions;
declare const _default: {
    clone: (object: EngineSupportLoadOptions, options?: {
        filter?: string[];
        detail?: boolean;
        fillName?: boolean | ((BasicConfig: any) => string);
    }) => EngineSupportLoadOptions | CloneResult;
    handler: (object: EngineSupportLoadOptions, handler: (config: BasicConfig) => BasicConfig, options?: {
        filter?: string[];
        clone?: boolean;
    }) => EngineSupportLoadOptions;
    planish: (configs: LoadOptions) => Record<string, BasicConfig>;
    observable: (object: EngineSupportLoadOptions | string, obCallback?: (config: BasicConfig) => BasicConfig) => EngineSupportLoadOptions;
};
export default _default;
