import { Strategy } from "@vis-three/core";
import {
  LoaderManagerEngine,
  LOADER_MANAGER_PLUGIN,
} from "@vis-three/loader-manager-plugin";
import {
  DataSupportEngine,
  DATA_SUPPORT_MANAGER_PLUGIN,
  LoadOptions,
} from "../../plugin/DataSupportManagerPlugin";

export interface LoaderDataSupportEngine
  extends DataSupportEngine,
    LoaderManagerEngine {}

export const LOADER_DATA_SUPPORT_STRATEGY = "LoaderDataSupportStrategy";

export const LoaderDataSupportStrategy: Strategy<LoaderDataSupportEngine> =
  function () {
    let cacheToJSON: () => string;
    let cacheExportConfig: () => LoadOptions;
    return {
      name: LOADER_DATA_SUPPORT_STRATEGY,
      condition: [DATA_SUPPORT_MANAGER_PLUGIN, LOADER_MANAGER_PLUGIN],
      exec(engine) {
        cacheToJSON = engine.toJSON;

        engine.toJSON = function () {
          const assets = {
            assets: JSON.parse(engine.loaderManager.toJSON()),
          };
          return engine.dataSupportManager.toJSON(assets);
        };

        cacheExportConfig = engine.exportConfig;

        engine.exportConfig = function () {
          let extendConfig = {};

          extendConfig = {
            assets: engine.loaderManager.exportConfig(),
          };

          return engine.dataSupportManager.exportConfig(extendConfig);
        };
      },
      rollback(engine) {
        engine.toJSON = cacheToJSON;
        engine.exportConfig = cacheExportConfig;
      },
    };
  };
