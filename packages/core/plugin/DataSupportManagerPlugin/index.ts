import { SymbolConfig } from "@vis-three/middleware";
import { Engine } from "../../engine";
import { LoaderManagerEngine } from "../LoaderManagerPlugin";
import { Plugin } from "../plugin";
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

export interface LoaderDataSupportEngine
  extends LoaderManagerEngine,
    DataSupportEngine {}

const DataSupportManagerPlugin: Plugin<DataSupportEngine> = function (
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
    installed: {
      LoaderManagerPlugin(engine: LoaderDataSupportEngine) {
        engine.toJSON = function () {
          const assets = {
            assets: JSON.parse(engine.loaderManager.toJSON()),
          };
          return engine.dataSupportManager.toJSON(assets);
        };

        engine.exportConfig = function () {
          let extendConfig = {};

          extendConfig = {
            assets: engine.loaderManager.exportConfig(),
          };

          return engine.dataSupportManager.exportConfig(extendConfig);
        };
      },
    },
    dispose() {},
  };
};

export default DataSupportManagerPlugin;
