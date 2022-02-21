import { DataSupportManager } from "../manager/DataSupportManager";
import { CONFIGTYPE } from "../middleware/constants/configType";
import { MODULETYPE } from "../middleware/constants/MODULETYPE";
import { generateConfig } from "../convenient/generateConfig";
export const DataSupportManagerPlugin = function (params) {
    if (this.dataSupportManager) {
        console.warn('engine has installed dataSupportManager plugin.');
        return false;
    }
    if (!this.webGLRenderer) {
        console.warn(`must install webGLRenderer before compilerManager plugin.`);
        return false;
    }
    if (!this.scene) {
        console.warn(`must install scene before compilerManager plugin.`);
        return false;
    }
    if (!this.renderManager) {
        console.warn(`must install renderManager before compilerManager plugin.`);
        return false;
    }
    const dataSupportManager = new DataSupportManager(params);
    this.dataSupportManager = dataSupportManager;
    this.toJSON = function () {
        return this.dataSupportManager.toJSON();
    };
    // 帮助其他插件进行support初始化
    const rendererData = this.dataSupportManager.getDataSupport(MODULETYPE.RENDERER).getData();
    if (!rendererData.WebGLRenderer) {
        rendererData.WebGLRenderer = generateConfig(CONFIGTYPE.WEBGLRENDERER);
    }
    const sceneData = this.dataSupportManager.getDataSupport(MODULETYPE.SCENE).getData();
    if (!sceneData.scene) {
        sceneData.scene = generateConfig(CONFIGTYPE.SCENE);
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
    return true;
};
//# sourceMappingURL=DataSupportManagerPlugin.js.map