import { LoaderManager } from "../manager/LoaderManager";
export const LoaderManagerPlugin = function (params) {
    if (this.loaderManager) {
        console.warn('engine has installed loaderManager plugin.');
        return false;
    }
    const loaderManager = new LoaderManager(params);
    this.loaderManager = loaderManager;
    this.loadResources = (urlList, callback) => {
        const lodedFun = (event) => {
            callback(undefined, event);
            this.loaderManager.removeEventListener('loaded', lodedFun);
        };
        try {
            this.loaderManager.addEventListener('loaded', lodedFun);
        }
        catch (error) {
            callback(error);
        }
        this.loaderManager.load(urlList);
        return this;
    };
    this.loadResourcesAsync = (urlList) => {
        return new Promise((resolve, reject) => {
            const lodedFun = (event) => {
                resolve(event);
                this.loaderManager.removeEventListener('loaded', lodedFun);
            };
            try {
                this.loaderManager.addEventListener('loaded', lodedFun);
            }
            catch (error) {
                reject(error);
            }
            this.loaderManager.load(urlList);
        });
    };
    return true;
};
//# sourceMappingURL=LoaderManagerPlugin.js.map