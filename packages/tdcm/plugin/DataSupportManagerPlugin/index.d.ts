import { Engine, Plugin } from "@vis-three/core";
import { BasicConfig } from "../../module/common";
import { DataSupportManager, LoadOptions } from "./DataSupportManager";
export interface DataSupportEngine extends Engine {
    /**转换器管理器 */
    dataSupportManager: DataSupportManager;
    /**应用配置 */
    applyConfig: (...args: BasicConfig[]) => DataSupportEngine;
    /**通过vid标识获取配置 */
    getConfigBySymbol: <C extends BasicConfig = any>(vid: string) => C | null;
    /**通过vid标识移除配置 */
    removeConfigBySymbol: (...args: string[]) => DataSupportEngine;
    /**从一个模块中通过vid标识获取配置*/
    getConfigFromModule: <C extends BasicConfig = any>(module: string, vid: string) => C | null;
    /**从多个模块中通过vid标识获取配置*/
    getConfigFromModules: <C extends BasicConfig = any>(modules: string[] | Record<string, any>, vid: string) => C | null;
    /**导出为json */
    toJSON: () => string;
    /**导出为js对象 */
    exportConfig: () => LoadOptions;
}
export interface DataSupportPluginParameters {
}
export * from "./DataSupportManager";
export declare const DATA_SUPPORT_MANAGER_PLUGIN = "DataSupportManagerPlugin";
export declare const DataSupportManagerPlugin: Plugin<DataSupportEngine, DataSupportPluginParameters>;
