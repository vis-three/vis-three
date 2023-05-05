import { Engine, Plugin } from "@vis-three/core";
import { Optional } from "@vis-three/utils";
import { SymbolConfig } from "../../module/common";
import { DataSupportManager, LoadOptions } from "./DataSupportManager";

export interface DataSupportEngine extends Engine {
  dataSupportManager: DataSupportManager;
  applyConfig: (...args: SymbolConfig[]) => DataSupportEngine;
  getConfigBySymbol: (vid: string) => SymbolConfig | null;
  removeConfigBySymbol: (...args: string[]) => DataSupportEngine;
  toJSON: () => string;
  exportConfig: () => LoadOptions;
}

export * from "./DataSupportManager";

export const DATA_SUPPORT_MANAGER_PLUGIN = "DataSupportManagerPlugin";

export const DataSupportManagerPlugin: Plugin<DataSupportEngine, object> =
  function () {
    return {
      name: DATA_SUPPORT_MANAGER_PLUGIN,
      install(engine) {
        const dataSupportManager = new DataSupportManager();

        engine.dataSupportManager = dataSupportManager;

        engine.applyConfig = function (...config: SymbolConfig[]) {
          dataSupportManager.applyConfig(...config);
          return engine;
        };

        engine.getConfigBySymbol = function (vid: string) {
          return dataSupportManager.getConfigBySymbol(vid);
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
