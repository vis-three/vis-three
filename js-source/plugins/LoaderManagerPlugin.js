import { LoaderManager } from "../manager/LoaderManager";
export const LoaderManagerPlugin = function (params) {
    if (this.loaderManager) {
        console.warn('engine has installed loaderManager plugin.');
        return false;
    }
    const loaderManager = new LoaderManager(params);
    this.loaderManager = loaderManager;
    this.loadResources = (urlList) => {
        this.loaderManager.load(urlList);
        return this;
    };
    return true;
};
//# sourceMappingURL=LoaderManagerPlugin.js.map