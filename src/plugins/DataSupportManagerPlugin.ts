import {
  DataSupportManager,
  DataSupportManagerParameters,
} from "../manager/DataSupportManager";
import { CONFIGTYPE } from "../middleware/constants/configType";
import { MODULETYPE } from "../middleware/constants/MODULETYPE";
import { ControlsDataSupport } from "../middleware/controls/ControlsDataSupport";
import { RendererDataSupport } from "../middleware/renderer/RendererDataSupport";
import { generateConfig } from "../convenient/generateConfig";
import { Plugin } from "./plugin";
import { EngineSupport } from "../engine/EngineSupport";
import { WebGLRendererConfig } from "../middleware/renderer/RendererConfig";
import {
  OrbitControlsConfig,
  TransformControlsConfig,
} from "../middleware/controls/ControlsConfig";

export const DataSupportManagerPlugin: Plugin<DataSupportManagerParameters> =
  function (
    this: EngineSupport,
    params: DataSupportManagerParameters
  ): boolean {
    if (this.dataSupportManager) {
      console.warn("engine has installed dataSupportManager plugin.");
      return false;
    }

    const dataSupportManager = new DataSupportManager(params);

    this.dataSupportManager = dataSupportManager;

    this.applyConfig = function (...config) {
      this.dataSupportManager.applyConfig(...config);
      return this;
    };

    this.getConfigBySymbol = function (vid) {
      return this.dataSupportManager.getConfigBySymbol(vid);
    };

    this.removeConfigBySymbol = function (...vids) {
      this.dataSupportManager.removeConfigBySymbol(...vids);
      return this;
    };

    this.toJSON = function () {
      if (this.loaderManager) {
        const assets = {
          assets: JSON.parse(this.loaderManager.toJSON()),
        };
        return this.dataSupportManager!.toJSON(assets);
      }
      return this.dataSupportManager!.toJSON();
    };

    this.exportConfig = function () {
      let extendConfig = {};
      if (this.loaderManager) {
        extendConfig = {
          assets: this.loaderManager.exportConfig(),
        };
      }

      return this.dataSupportManager.exportConfig(extendConfig);
    };

    return true;
  };
