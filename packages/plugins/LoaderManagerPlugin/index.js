import { LoaderManager, LOADER_EVENT, } from "./LoaderManager";
import { transPkgName } from "@vis-three/utils";
import { name as pkgname } from "./package.json";
export * from "./LoaderManager";
export const LOADER_MANAGER_PLUGIN = transPkgName(pkgname);
export const LoaderManagerPlugin = function (params) {
    return {
        name: LOADER_MANAGER_PLUGIN,
        install(engine) {
            const loaderManager = new LoaderManager(params);
            if (params?.path) {
                loaderManager.setPath(params.path);
            }
            engine.loaderManager = loaderManager;
            engine.loadResources = (urlList, callback) => {
                const lodedFun = (event) => {
                    callback(undefined, event);
                    loaderManager.removeEventListener(LOADER_EVENT.LOADED, lodedFun);
                };
                try {
                    loaderManager.addEventListener(LOADER_EVENT.LOADED, lodedFun);
                }
                catch (error) {
                    callback(error);
                }
                loaderManager.load(urlList);
                return engine;
            };
            engine.loadResourcesAsync = (urlList) => {
                return new Promise((resolve, reject) => {
                    const lodedFun = (event) => {
                        resolve(event);
                        loaderManager.removeEventListener(LOADER_EVENT.LOADED, lodedFun);
                    };
                    try {
                        loaderManager.addEventListener(LOADER_EVENT.LOADED, lodedFun);
                    }
                    catch (error) {
                        reject(error);
                    }
                    loaderManager.load(urlList);
                });
            };
        },
        dispose(engine) {
            engine.loaderManager.dispose();
            delete engine.loaderManager;
            delete engine.loadResources;
            delete engine.loadResourcesAsync;
        },
    };
};
