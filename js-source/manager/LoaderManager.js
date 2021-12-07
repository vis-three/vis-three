import { EventDispatcher, ImageLoader } from "three";
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { MTLLoader } from "three/examples/jsm/loaders/MTLLoader";
export var LOADEEVENTTYPE;
(function (LOADEEVENTTYPE) {
    LOADEEVENTTYPE["LOADING"] = "loading";
    LOADEEVENTTYPE["DETAILLOADING"] = "detailLoading";
    LOADEEVENTTYPE["DETAILLOADED"] = "detailLoaded";
    LOADEEVENTTYPE["LOADED"] = "loaded";
})(LOADEEVENTTYPE || (LOADEEVENTTYPE = {}));
export class LoaderManager extends EventDispatcher {
    resourceMap;
    loaderMap;
    loadTotal;
    loadSuccess;
    loadError;
    isError;
    isLoading;
    isLoaded;
    loadDetailMap;
    constructor() {
        super();
        this.resourceMap = new Map();
        this.loadTotal = 0;
        this.loadSuccess = 0;
        this.loadError = 0;
        this.isError = false;
        this.isLoading = false;
        this.isLoaded = false;
        this.loadDetailMap = {};
        const imageLoader = new ImageLoader();
        this.loaderMap = {
            'jpg': imageLoader,
            'png': imageLoader,
            'jpeg': imageLoader,
            'obj': new OBJLoader(),
            'mtl': new MTLLoader()
        };
    }
    load(urlList) {
        this.isLoading = true;
        if (urlList.length <= 0) {
            this.checkLoaded();
            console.warn(`url list is empty.`);
            return this;
        }
        this.loadTotal += urlList.length;
        const loaderMap = this.loaderMap;
        const loadDetailMap = this.loadDetailMap;
        for (let url of urlList) {
            const detail = {
                url,
                progress: 0,
                error: false,
                message: url
            };
            loadDetailMap[url] = detail;
            const ext = url.split('.').pop()?.toLocaleLowerCase();
            if (!ext) {
                detail.message = `url: ${url} 地址有误，无法获取文件格式。`;
                detail.error = true;
                this.isError = true;
                this.loadError += 1;
                continue;
            }
            const loader = loaderMap[ext];
            if (!loader) {
                detail.message = `url: ${url} 不支持此文件格式加载。`;
                detail.error = true;
                this.isError = true;
                this.loadError += 1;
                continue;
            }
            loader.loadAsync(url, (event) => {
                detail.progress = Number((event.loaded / event.total).toFixed(2));
                this.dispatchEvent({
                    type: 'detailLoading',
                    detail
                });
            }).then(res => {
                detail.progress = 1;
                this.loadSuccess += 1;
                this.resourceMap.set(url, res);
                this.dispatchEvent({
                    type: 'detailLoaded',
                    detail
                });
                this.dispatchEvent({
                    type: 'loading',
                    loadTotal: this.loadTotal,
                    loadSuccess: this.loadSuccess,
                    loadError: this.loadError
                });
                this.checkLoaded();
            }).catch(err => {
                detail.error = true;
                detail.message = JSON.stringify(err);
                this.loadError += 1;
                this.dispatchEvent({
                    type: 'detailLoaded',
                    detail
                });
                this.dispatchEvent({
                    type: 'loading',
                    loadTotal: this.loadTotal,
                    loadSuccess: this.loadSuccess,
                    loadError: this.loadError
                });
                this.checkLoaded();
            });
        }
        return this;
    }
    loaded() {
        this.dispatchEvent({
            type: 'loaded',
            loadTotal: this.loadTotal,
            loadSuccess: this.loadSuccess,
            loadError: this.loadError,
            resourceMap: this.resourceMap
        });
        return this;
    }
    reset() {
        this.loadTotal = 0;
        this.loadSuccess = 0;
        this.loadError = 0;
        this.isError = false;
        this.isLoading = false;
        this.isLoaded = false;
        this.loadDetailMap = {};
        return this;
    }
    dispose() {
        this.resourceMap.clear();
        return this;
    }
    checkLoaded() {
        if (this.loadTotal === this.loadSuccess + this.loadError) {
            this.isError = true;
            this.isLoaded = true;
            this.isLoading = false;
            this.loaded();
        }
        return this;
    }
}
//# sourceMappingURL=LoaderManager.js.map