var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
import { Loader, Cache, ImageLoader } from "three";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
import { MTLLoader } from "three/examples/jsm/loaders/MTLLoader";
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";
import { KTX2Loader } from "three/examples/jsm/loaders/KTX2Loader.js";
import { DDSLoader } from "three/examples/jsm/loaders/DDSLoader.js";
import { MeshoptDecoder } from "three/examples/jsm/libs/meshopt_decoder.module.js";
import { LUTCubeLoader } from "three/examples/jsm/loaders/LUTCubeLoader";
import { LUT3dlLoader } from "three/examples/jsm/loaders/LUT3dlLoader";
import { EventDispatcher } from "@vis-three/core";
import { transPkgName } from "@vis-three/utils";
const _VideoLoader = class extends Loader {
  constructor(manager) {
    super(manager);
  }
  load(url, onLoad, onProgress, onError) {
    if (this.path !== void 0) {
      url = this.path + url;
    }
    this.manager.itemStart(url);
    url = this.manager.resolveURL(url);
    const cached = Cache.get(url);
    if (cached !== void 0) {
      setTimeout(() => {
        if (onLoad)
          onLoad(cached);
        this.manager.itemEnd(url);
      }, 0);
      return cached;
    }
    const video = document.createElement("video");
    video.preload = _VideoLoader.preload;
    video.autoplay = _VideoLoader.autoplay;
    video.loop = _VideoLoader.loop;
    video.muted = _VideoLoader.muted;
    video.src = url;
    video.style.position = "fixed";
    video.style.top = "0";
    video.style.left = "0";
    video.style.zIndex = "-1";
    document.body.appendChild(video);
    video.oncanplay = () => {
      Cache.add(url, video);
      this.manager.itemEnd(url);
      if (onLoad)
        onLoad(video);
    };
    video.onerror = (e) => {
      this.manager.itemEnd(url);
      if (onError)
        onError(e);
    };
    return video;
  }
};
let VideoLoader = _VideoLoader;
__publicField(VideoLoader, "autoplay", true);
__publicField(VideoLoader, "preload", "auto");
__publicField(VideoLoader, "muted", true);
__publicField(VideoLoader, "loop", true);
var LOADER_EVENT = /* @__PURE__ */ ((LOADER_EVENT2) => {
  LOADER_EVENT2["BEFORELOAD"] = "beforeLoad";
  LOADER_EVENT2["LOADING"] = "loading";
  LOADER_EVENT2["DETAILLOADING"] = "detailLoading";
  LOADER_EVENT2["DETAILLOADED"] = "detailLoaded";
  LOADER_EVENT2["LOADED"] = "loaded";
  return LOADER_EVENT2;
})(LOADER_EVENT || {});
class LoaderManager extends EventDispatcher {
  constructor(parameters) {
    super();
    __publicField(this, "resourceMap");
    __publicField(this, "loaderMap");
    __publicField(this, "urlList", []);
    __publicField(this, "loadTotal");
    __publicField(this, "loadSuccess");
    __publicField(this, "loadError");
    __publicField(this, "isError");
    __publicField(this, "isLoading");
    __publicField(this, "isLoaded");
    __publicField(this, "loadDetailMap");
    __publicField(this, "path", "");
    this.resourceMap = /* @__PURE__ */ new Map();
    this.loadTotal = 0;
    this.loadSuccess = 0;
    this.loadError = 0;
    this.isError = false;
    this.isLoading = false;
    this.isLoaded = false;
    this.loadDetailMap = {};
    const imageLoader = new ImageLoader();
    const videoLoader = new VideoLoader();
    const gltfLoader = new GLTFLoader();
    gltfLoader.setDRACOLoader(new DRACOLoader());
    gltfLoader.setKTX2Loader(new KTX2Loader());
    gltfLoader.setMeshoptDecoder(MeshoptDecoder);
    this.loaderMap = {
      jpg: imageLoader,
      png: imageLoader,
      jpeg: imageLoader,
      obj: new OBJLoader(),
      mtl: new MTLLoader(),
      mp4: videoLoader,
      webm: videoLoader,
      ogg: videoLoader,
      hdr: new RGBELoader(),
      gltf: gltfLoader,
      glb: gltfLoader,
      fbx: new FBXLoader(),
      dds: new DDSLoader(),
      cube: new LUTCubeLoader(),
      "3dl": new LUT3dlLoader()
    };
    if (parameters) {
      this.loaderMap = Object.assign(this.loaderMap, parameters.loaderExtends);
    }
  }
  loaded() {
    this.dispatchEvent({
      type: "loaded",
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
  setPath(path) {
    this.path = path;
    return this;
  }
  setRequestHeader(headers) {
    Object.values(this.loaderMap).forEach((loader) => {
      loader.setRequestHeader(headers);
    });
    return this;
  }
  setResponseType(responseType) {
    Object.values(this.loaderMap).forEach((loader) => {
      loader.setResponseType && loader.setResponseType(responseType);
    });
    return this;
  }
  getLoader(ext) {
    if (this.loaderMap[ext]) {
      return this.loaderMap[ext];
    } else {
      return null;
    }
  }
  load(urlList) {
    var _a;
    this.reset();
    this.isLoading = true;
    this.dispatchEvent({
      type: "beforeLoad",
      urlList: [...urlList]
    });
    if (urlList.length <= 0) {
      this.checkLoaded();
      console.warn(`url list is empty.`);
      return this;
    }
    this.loadTotal += urlList.length;
    const resourceMap = this.resourceMap;
    const loaderMap = this.loaderMap;
    const loadDetailMap = this.loadDetailMap;
    for (const unit of urlList) {
      let url;
      let ext;
      if (typeof unit === "string") {
        url = unit;
        ext = ((_a = url.split(".").pop()) == null ? void 0 : _a.toLocaleLowerCase()) || "";
      } else {
        url = unit.url;
        ext = unit.ext.toLocaleLowerCase();
        if (ext.startsWith(".")) {
          ext = ext.slice(1);
        }
      }
      const detail = {
        url,
        progress: 0,
        error: false,
        message: url
      };
      loadDetailMap[url] = detail;
      if (resourceMap.has(url)) {
        detail.progress = 1;
        this.loadSuccess += 1;
        this.dispatchEvent({
          type: "detailLoaded",
          detail
        });
        this.dispatchEvent({
          type: "loading",
          loadTotal: this.loadTotal,
          loadSuccess: this.loadSuccess,
          loadError: this.loadError,
          loadProgress: (this.loadSuccess + this.loadError) / this.loadTotal
        });
        this.checkLoaded();
        continue;
      }
      if (!ext) {
        detail.message = `url: ${url} \u5730\u5740\u6709\u8BEF\uFF0C\u65E0\u6CD5\u83B7\u53D6\u6587\u4EF6\u683C\u5F0F\u3002`;
        console.warn(detail.message);
        detail.error = true;
        this.isError = true;
        this.loadError += 1;
        this.dispatchEvent({
          type: "detailLoaded",
          detail
        });
        this.dispatchEvent({
          type: "loading",
          loadTotal: this.loadTotal,
          loadSuccess: this.loadSuccess,
          loadError: this.loadError,
          loadProgress: (this.loadSuccess + this.loadError) / this.loadTotal
        });
        continue;
      }
      const loader = loaderMap[ext];
      if (!loader) {
        detail.message = `url: ${url} \u4E0D\u652F\u6301\u6B64\u6587\u4EF6\u683C\u5F0F\u52A0\u8F7D\u3002`;
        console.warn(detail.message);
        detail.error = true;
        this.isError = true;
        this.loadError += 1;
        this.dispatchEvent({
          type: "detailLoaded",
          detail
        });
        this.dispatchEvent({
          type: "loading",
          loadTotal: this.loadTotal,
          loadSuccess: this.loadSuccess,
          loadError: this.loadError,
          loadProgress: (this.loadSuccess + this.loadError) / this.loadTotal
        });
        continue;
      }
      const pathAnalysis = url.replace(/\\/g, "/").split("/");
      const filename = pathAnalysis.pop();
      const path = this.path + pathAnalysis.join("/") + "/";
      loader.setPath(path).loadAsync(filename, (event) => {
        detail.progress = Number((event.loaded / event.total).toFixed(2));
        this.dispatchEvent({
          type: "detailLoading",
          detail
        });
      }).then((res) => {
        detail.progress = 1;
        this.loadSuccess += 1;
        this.resourceMap.set(url, res);
        this.urlList.push(unit);
        this.dispatchEvent({
          type: "detailLoaded",
          detail
        });
        this.dispatchEvent({
          type: "loading",
          loadTotal: this.loadTotal,
          loadSuccess: this.loadSuccess,
          loadError: this.loadError,
          loadProgress: (this.loadSuccess + this.loadError) / this.loadTotal
        });
        this.checkLoaded();
      }).catch((err) => {
        detail.error = true;
        detail.message = JSON.stringify(err);
        this.loadError += 1;
        this.dispatchEvent({
          type: "detailLoaded",
          detail
        });
        this.dispatchEvent({
          type: "loading",
          loadTotal: this.loadTotal,
          loadSuccess: this.loadSuccess,
          loadError: this.loadError,
          loadProgress: (this.loadSuccess + this.loadError) / this.loadTotal
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
  register(ext, loader) {
    this.loaderMap[ext] = loader;
    return this;
  }
  hasLoaded(url) {
    return this.resourceMap.has(url);
  }
  getResource(url) {
    return this.resourceMap.get(url);
  }
  getLoadDetailMap() {
    return this.loadDetailMap;
  }
  setLoadDetailMap(map) {
    this.loadDetailMap = map;
    return this;
  }
  remove(url) {
  }
  toJSON() {
    return JSON.stringify(this.urlList);
  }
  exportConfig() {
    return JSON.parse(JSON.stringify(this.urlList));
  }
  dispose() {
    this.resourceMap.clear();
    return this;
  }
}
const name = "@vis-three/plugin-loader-manager";
const LOADER_MANAGER_PLUGIN = transPkgName(name);
const LoaderManagerPlugin = function(params) {
  return {
    name: LOADER_MANAGER_PLUGIN,
    install(engine) {
      const loaderManager = new LoaderManager(params);
      if (params == null ? void 0 : params.path) {
        loaderManager.setPath(params.path);
      }
      engine.loaderManager = loaderManager;
      engine.loadResources = (urlList, callback) => {
        const lodedFun = (event) => {
          callback(void 0, event);
          loaderManager.removeEventListener(
            LOADER_EVENT.LOADED,
            lodedFun
          );
        };
        try {
          loaderManager.addEventListener(
            LOADER_EVENT.LOADED,
            lodedFun
          );
        } catch (error) {
          callback(error);
        }
        loaderManager.load(urlList);
        return engine;
      };
      engine.loadResourcesAsync = (urlList) => {
        return new Promise((resolve, reject) => {
          const lodedFun = (event) => {
            resolve(event);
            loaderManager.removeEventListener(
              LOADER_EVENT.LOADED,
              lodedFun
            );
          };
          try {
            loaderManager.addEventListener(
              LOADER_EVENT.LOADED,
              lodedFun
            );
          } catch (error) {
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
    }
  };
};
export { LOADER_EVENT, LOADER_MANAGER_PLUGIN, LoaderManager, LoaderManagerPlugin };
