import { DataSupportManager, } from "../manager/DataSupportManager";
import { CONFIGTYPE } from "../middleware/constants/configType";
import { MODULETYPE } from "../middleware/constants/MODULETYPE";
import { generateConfig } from "../convenient/generateConfig";
export const DataSupportManagerPlugin = function (params) {
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
    this.reactiveConfig = function (config) {
        return this.dataSupportManager.reactiveConfig(config);
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
            return this.dataSupportManager.toJSON(assets);
        }
        return this.dataSupportManager.toJSON();
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
    this.completeSet.add(() => {
        // 帮助其他插件进行support初始化
        const rendererData = this.dataSupportManager.getDataSupport(MODULETYPE.RENDERER).getData();
        if (!rendererData.WebGLRenderer) {
            rendererData.WebGLRenderer = generateConfig(CONFIGTYPE.WEBGLRENDERER);
        }
        const controlsData = this.dataSupportManager.getDataSupport(MODULETYPE.CONTROLS).getData();
        if (this.transformControls) {
            if (!controlsData[CONFIGTYPE.TRNASFORMCONTROLS]) {
                controlsData[CONFIGTYPE.TRNASFORMCONTROLS] = generateConfig(CONFIGTYPE.TRNASFORMCONTROLS);
            }
        }
        if (this.orbitControls) {
            if (!controlsData[CONFIGTYPE.ORBITCONTROLS]) {
                controlsData[CONFIGTYPE.ORBITCONTROLS] = generateConfig(CONFIGTYPE.ORBITCONTROLS);
            }
        }
    });
    return true;
};
//# sourceMappingURL=DataSupportManagerPlugin.js.map