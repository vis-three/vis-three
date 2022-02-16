import { EventDispatcher } from './../core/EventDispatcher';
import { ImageLoader } from "three";
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { MTLLoader } from "three/examples/jsm/loaders/MTLLoader";
import { LOADERMANAGER } from "../middleware/constants/EVENTTYPE";
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
    loaded() {
        this.dispatchEvent({
            type: LOADERMANAGER.LOADED,
            loadTotal: this.loadTotal,
            loadSuccess: this.loadSuccess,
            loadError: this.loadError,
            resourceMap: this.resourceMap
        });
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
    load(urlList) {
        this.reset();
        this.isLoading = true;
        if (urlList.length <= 0) {
            this.checkLoaded();
            console.warn(`url list is empty.`);
            return this;
        }
        this.loadTotal += urlList.length;
        const resourceMap = this.resourceMap;
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
            // 判断有无缓存
            if (resourceMap.has(url)) {
                detail.progress = 1;
                this.loadSuccess += 1;
                this.dispatchEvent({
                    type: LOADERMANAGER.DETAILLOADED,
                    detail
                });
                this.dispatchEvent({
                    type: LOADERMANAGER.LOADING,
                    loadTotal: this.loadTotal,
                    loadSuccess: this.loadSuccess,
                    loadError: this.loadError
                });
                this.checkLoaded();
                continue;
            }
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
                    type: LOADERMANAGER.DETAILLOADING,
                    detail
                });
            }).then(res => {
                detail.progress = 1;
                this.loadSuccess += 1;
                this.resourceMap.set(url, res);
                this.dispatchEvent({
                    type: LOADERMANAGER.DETAILLOADED,
                    detail
                });
                this.dispatchEvent({
                    type: LOADERMANAGER.LOADING,
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
                    type: LOADERMANAGER.DETAILLOADED,
                    detail
                });
                this.dispatchEvent({
                    type: LOADERMANAGER.LOADING,
                    loadTotal: this.loadTotal,
                    loadSuccess: this.loadSuccess,
                    loadError: this.loadError
                });
                this.checkLoaded();
            });
        }
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
    // 注册自定loader
    register(ext, loader) {
        this.loaderMap[ext] = loader;
        return this;
    }
    // 资源是否已经加装
    hasLoaded(url) {
        return this.resourceMap.has(url);
    }
    getResource(url) {
        return this.resourceMap.get(url);
    }
    // 获取详细资源信息
    getLoadDetailMap() {
        return this.loadDetailMap;
    }
    // 设置详细资源信息
    setLoadDetailMap(map) {
        this.loadDetailMap = map;
        return this;
    }
    dispose() {
        this.resourceMap.clear();
        return this;
    }
}
//# sourceMappingURL=LoaderManager.js.map