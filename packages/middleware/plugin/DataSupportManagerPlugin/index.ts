import { Engine } from "@vis-three/core/engine";

import {
  DataSupportManager,
  DataSupportManagerParameters,
  LoadOptions,
} from "./DataSupportManager";

export interface DataSupportEngine extends Engine {
  dataSupportManager: DataSupportManager;
  applyConfig: (...args: SymbolConfig[]) => DataSupportEngine;
  getConfigBySymbol: (vid: string) => SymbolConfig | null;
  removeConfigBySymbol: (...args: string[]) => DataSupportEngine;
  toJSON: () => string;
  exportConfig: () => LoadOptions;
}

export * from "./DataSupportManager";

export interface LoaderDataSupportEngine
  extends LoaderManagerEngine,
    DataSupportEngine {}

export const DataSupportManagerPlugin: Plugin<DataSupportEngine> = function (
  params: DataSupportManagerParameters
) {
  return {
    name: "DataSupportManagerPlugin",
    install(engine) {
      const dataSupportManager = new DataSupportManager(params);

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
    dispose() {},
  };
};
