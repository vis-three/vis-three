import { DataSupportManager } from "../manager/DataSupportManager";
export const DataSupportManagerPlugin = function (params) {
    if (this.dataSupportManager) {
        console.warn('engine has installed dataSupportManager plugin.');
        return false;
    }
    const dataSupportManager = new DataSupportManager(params);
    this.dataSupportManager = dataSupportManager;
    return true;
};
//# sourceMappingURL=DataSupportManagerPlugin.js.map