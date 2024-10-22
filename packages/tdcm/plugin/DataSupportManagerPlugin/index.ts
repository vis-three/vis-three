import { Engine, Plugin } from "@vis-three/core";
import { Optional } from "@vis-three/utils";
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
  getConfigFromModule: <C extends BasicConfig = any>(
    module: string,
    vid: string
  ) => C | null;
  /**从多个模块中通过vid标识获取配置*/
  getConfigFromModules: <C extends BasicConfig = any>(
    modules: string[] | Record<string, any>,
    vid: string
  ) => C | null;
  /**导出为json */
  toJSON: () => string;
  /**导出为js对象 */
  exportConfig: () => LoadOptions;
}

export interface DataSupportPluginParameters {}

export * from "./DataSupportManager";

export const DATA_SUPPORT_MANAGER_PLUGIN = "DataSupportManagerPlugin";

export const DataSupportManagerPlugin: Plugin<
  DataSupportEngine,
  DataSupportPluginParameters
> = function () {
  return {
    name: DATA_SUPPORT_MANAGER_PLUGIN,
    install(engine) {
      const dataSupportManager = new DataSupportManager();

      engine.dataSupportManager = dataSupportManager;

      engine.applyConfig = function (...config: BasicConfig[]) {
        dataSupportManager.applyConfig(...config);
        return engine;
      };

      engine.getConfigBySymbol = function <C extends BasicConfig = any>(
        vid: string
      ) {
        return dataSupportManager.getConfigBySymbol<C>(vid);
      };

      engine.getConfigFromModule = function <C extends BasicConfig = any>(
        module: string,
        vid: string
      ) {
        return dataSupportManager.getConfigfromModule<C>(module, vid);
      };

      engine.getConfigFromModules = function <C extends BasicConfig = any>(
        modules: string[] | Record<string, any>,
        vid: string
      ) {
        return dataSupportManager.getConfigfromModules<C>(modules, vid);
      };

      engine.removeConfigBySymbol = function (...vids) {
        dataSupportManager.removeConfigBySymbol(...vids);
        return engine;
      };

      engine.toJSON = function () {
        return dataSupportManager.toJSON();
      };

      engine.exportConfig = function () {
        return dataSupportManager.exportConfig();
      };
    },
    dispose(
      engine: Optional<
        DataSupportEngine,
        | "dataSupportManager"
        | "applyConfig"
        | "getConfigBySymbol"
        | "removeConfigBySymbol"
        | "toJSON"
        | "exportConfig"
      >
    ) {
      delete engine.dataSupportManager;
      delete engine.applyConfig;
      delete engine.getConfigBySymbol;
      delete engine.removeConfigBySymbol;
      delete engine.toJSON;
      delete engine.exportConfig;
    },
  };
};
