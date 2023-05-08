import { SymbolConfig } from "../module/common";
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
 * - detail:bolean 返回clone映射
 * - fillName 是否填充未命名的单位
 * @returns EngineSupportLoadOptions | CloneResult
 */
export declare const clone: (object: EngineSupportLoadOptions, options?: {
    detail?: boolean | undefined;
    fillName?: boolean | ((SymbolConfig: any) => string) | undefined;
}) => EngineSupportLoadOptions | CloneResult;
/**
 * 对配置单中的每个配置项做处理
 * @param object
 * @param handler
 * @param options
 */
export declare const handler: (object: EngineSupportLoadOptions, handler: (config: SymbolConfig) => SymbolConfig, options?: {
    clone?: boolean;
    assets?: boolean;
}) => EngineSupportLoadOptions;
export declare const planish: (configs: LoadOptions) => Record<string, SymbolConfig>;
export declare const observable: (object: EngineSupportLoadOptions | string, obCallback?: ((config: SymbolConfig) => SymbolConfig) | undefined) => EngineSupportLoadOptions;
declare const _default: {
    clone: (object: EngineSupportLoadOptions, options?: {
        detail?: boolean | undefined;
        fillName?: boolean | ((SymbolConfig: any) => string) | undefined;
    }) => CloneResult | EngineSupportLoadOptions;
    handler: (object: EngineSupportLoadOptions, handler: (config: SymbolConfig) => SymbolConfig, options?: {
        clone?: boolean | undefined;
        assets?: boolean | undefined;
    }) => EngineSupportLoadOptions;
    planish: (configs: LoadOptions) => Record<string, SymbolConfig>;
    observable: (object: string | EngineSupportLoadOptions, obCallback?: ((config: SymbolConfig) => SymbolConfig) | undefined) => EngineSupportLoadOptions;
};
export default _default;
