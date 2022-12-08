import { EngineSupportLoadOptions } from "../engine/EngineSupport";
import { SymbolConfig } from "../middleware/common/CommonConfig";
import { LoadOptions } from "../manager/DataSupportManager";
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
}) => any;
export declare const planish: (configs: LoadOptions) => Record<string, SymbolConfig>;
declare const _default: {
    clone: (object: EngineSupportLoadOptions, options?: {
        detail?: boolean | undefined;
        fillName?: boolean | ((SymbolConfig: any) => string) | undefined;
    }) => any;
    handler: (object: EngineSupportLoadOptions, handler: (config: SymbolConfig) => SymbolConfig, options?: {
        clone?: boolean | undefined;
        assets?: boolean | undefined;
    }) => any;
    planish: (configs: LoadOptions) => Record<string, SymbolConfig>;
};
export default _default;
