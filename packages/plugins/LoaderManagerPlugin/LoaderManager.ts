import { FileLoader, ImageLoader, Loader } from "three";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
import { MTLLoader } from "three/examples/jsm/loaders/MTLLoader";
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";
import { KTX2Loader } from "three/examples/jsm/loaders/KTX2Loader.js";
import { MeshoptDecoder } from "three/examples/jsm/libs/meshopt_decoder.module.js";
import { BaseEvent, EventDispatcher } from "@vis-three/core";
import { VideoLoader } from "./loader";

export enum LOADER_EVENT {
  BEFORELOAD = "beforeLoad",
  LOADING = "loading",
  DETAILLOADING = "detailLoading",
  DETAILLOADED = "detailLoaded",
  LOADED = "loaded",
}

export interface LoadDetail {
  url: string;
  progress: number;
  error: boolean;
  message: string;
}

export interface BeforeLoadEvent extends BaseEvent {
  urlList: string[];
}

export interface LoadingEvent extends BaseEvent {
  loadTotal: number;
  loadSuccess: number;
  loadError: number;
}

export interface DetailEvent extends BaseEvent {
  detail: LoadDetail;
}

export interface LoadedEvent extends BaseEvent {
  loadTotal: number;
  loadSuccess: number;
  loadError: number;
  resourceMap: Map<string, unknown>;
}

export type LoadUnit =
  | string
  | {
      url: string;
      ext: string;
    };

export interface LoaderManagerParameters {
  loaderExtends: { [key: string]: Loader };
}

//TODO: sync three cache
export class LoaderManager extends EventDispatcher {
  private resourceMap: Map<string, unknown>;
  private loaderMap: { [key: string]: Loader };
  private urlList: Array<string | LoadUnit> = [];
  private loadTotal: number;
  private loadSuccess: number;
  private loadError: number;
  private isError: boolean;
  private isLoading: boolean;
  private isLoaded: boolean;
  private loadDetailMap: { [key: string]: LoadDetail };

  path = "";

  constructor(parameters?: LoaderManagerParameters) {
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
    };

    if (parameters) {
      this.loaderMap = Object.assign(this.loaderMap, parameters.loaderExtends);
    }
  }

  private loaded(): this {
    this.dispatchEvent({
      type: LOADER_EVENT.LOADED,
      loadTotal: this.loadTotal,
      loadSuccess: this.loadSuccess,
      loadError: this.loadError,
      resourceMap: this.resourceMap,
    });
    return this;
  }

  private checkLoaded(): this {
    if (this.loadTotal === this.loadSuccess + this.loadError) {
      this.isError = true;
      this.isLoaded = true;
      this.isLoading = false;
      this.loaded();
    }
    return this;
  }

  /**
   * 设置统一资源路径前缀
   * @param path
   * @returns
   */
  setPath(path: string): this {
    this.path = path;
    return this;
  }

  /**
   * 设置请求头
   * @param headers
   * @returns this
   */
  setRequestHeader(headers: Record<string, string>): this {
    Object.values(this.loaderMap).forEach((loader) => {
      loader.setRequestHeader(headers);
    });
    return this;
  }

  /**
   * 设置响应类型
   * @param responseType
   * @returns this
   */
  setResponseType(responseType: string): this {
    Object.values(this.loaderMap).forEach((loader) => {
      (<FileLoader>loader).setResponseType &&
        (<FileLoader>loader).setResponseType(responseType);
    });
    return this;
  }

  /**
   * 获取加载器
   * @param ext 资源类型
   * @returns
   */
  getLoader(ext: string): Loader | null {
    if (this.loaderMap[ext]) {
      return this.loaderMap[ext];
    } else {
      return null;
    }
  }

  /**
   * 加载资源
   * @param urlList string[] | [{ext: string, url: string}]
   * @returns this
   */
  load(urlList: Array<LoadUnit>): this {
    this.reset();
    this.isLoading = true;

    this.dispatchEvent({
      type: LOADER_EVENT.BEFORELOAD,
      urlList: [...urlList],
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
      let url: string;
      let ext: string;
      if (typeof unit === "string") {
        url = unit;
        ext = url.split(".").pop()?.toLocaleLowerCase() || "";
      } else {
        url = unit.url;
        ext = unit.ext.toLocaleLowerCase();

        if (ext.startsWith(".")) {
          ext = ext.slice(1);
        }
      }
      const detail: LoadDetail = {
        url,
        progress: 0,
        error: false,
        message: url,
      };

      loadDetailMap[url] = detail;

      // 判断有无缓存
      if (resourceMap.has(url)) {
        detail.progress = 1;
        this.loadSuccess += 1;
        this.dispatchEvent({
          type: LOADER_EVENT.DETAILLOADED,
          detail,
        });
        this.dispatchEvent({
          type: LOADER_EVENT.LOADING,
          loadTotal: this.loadTotal,
          loadSuccess: this.loadSuccess,
          loadError: this.loadError,
        });
        this.checkLoaded();
        continue;
      }

      if (!ext) {
        detail.message = `url: ${url} 地址有误，无法获取文件格式。`;
        console.warn(detail.message);
        detail.error = true;
        this.isError = true;
        this.loadError += 1;
        this.dispatchEvent({
          type: LOADER_EVENT.DETAILLOADED,
          detail,
        });
        this.dispatchEvent({
          type: LOADER_EVENT.LOADING,
          loadTotal: this.loadTotal,
          loadSuccess: this.loadSuccess,
          loadError: this.loadError,
        });
        continue;
      }

      const loader = loaderMap[ext!];

      if (!loader) {
        detail.message = `url: ${url} 不支持此文件格式加载。`;
        console.warn(detail.message);
        detail.error = true;
        this.isError = true;
        this.loadError += 1;
        this.dispatchEvent({
          type: LOADER_EVENT.DETAILLOADED,
          detail,
        });
        this.dispatchEvent({
          type: LOADER_EVENT.LOADING,
          loadTotal: this.loadTotal,
          loadSuccess: this.loadSuccess,
          loadError: this.loadError,
        });
        continue;
      }

      const pathAnalysis = url.replace(/\\/g, "/").split("/");

      const filename = pathAnalysis.pop()!;
      const path = this.path + pathAnalysis.join("/") + "/";

      loader
        .setPath(path)
        .loadAsync(filename, (event: ProgressEvent) => {
          detail.progress = Number((event.loaded / event.total).toFixed(2));
          this.dispatchEvent({
            type: LOADER_EVENT.DETAILLOADING,
            detail,
          });
        })
        .then((res) => {
          detail.progress = 1;
          this.loadSuccess += 1;
          this.resourceMap.set(url, res);
          this.urlList.push(unit);

          this.dispatchEvent({
            type: LOADER_EVENT.DETAILLOADED,
            detail,
          });
          this.dispatchEvent({
            type: LOADER_EVENT.LOADING,
            loadTotal: this.loadTotal,
            loadSuccess: this.loadSuccess,
            loadError: this.loadError,
          });
          this.checkLoaded();
        })
        .catch((err) => {
          detail.error = true;
          detail.message = JSON.stringify(err);
          this.loadError += 1;
          this.dispatchEvent({
            type: LOADER_EVENT.DETAILLOADED,
            detail,
          });
          this.dispatchEvent({
            type: LOADER_EVENT.LOADING,
            loadTotal: this.loadTotal,
            loadSuccess: this.loadSuccess,
            loadError: this.loadError,
          });
          this.checkLoaded();
        });
    }

    return this;
  }

  /**
   * 重置加载管理器属性
   * @returns
   */
  reset(): this {
    this.loadTotal = 0;
    this.loadSuccess = 0;
    this.loadError = 0;
    this.isError = false;
    this.isLoading = false;
    this.isLoaded = false;
    this.loadDetailMap = {};
    return this;
  }

  /**
   * 注册loader
   * @param ext 文件格式: jpg
   * @param loader extend THREE.Loader
   * @returns this
   */
  register(ext: string, loader: Loader): this {
    this.loaderMap[ext] = loader;
    return this;
  }

  // 资源是否已经加装
  hasLoaded(url: string): boolean {
    return this.resourceMap.has(url);
  }

  /**
   * 获取url下的资源
   * @param url
   * @returns
   */
  getResource(url: string): unknown {
    return this.resourceMap.get(url);
  }

  /**
   * @deprecated
   * 获取详细资源信息
   * @returns
   */
  getLoadDetailMap(): { [key: string]: LoadDetail } {
    return this.loadDetailMap;
  }

  /**
   * @deprecated
   * 设置详细资源信息
   * @param map
   * @returns
   */
  setLoadDetailMap(map: { [key: string]: LoadDetail }): this {
    this.loadDetailMap = map;
    return this;
  }

  // TODO:
  remove(url: string) {}

  // 导出json资源单
  toJSON(): string {
    return JSON.stringify(this.urlList);
  }

  /**
   * 导出配置单
   * @returns
   * @todo 对比缓存
   */
  exportConfig(): string[] {
    return JSON.parse(JSON.stringify(this.urlList));
  }

  /**
   * 清空缓存
   * @returns
   */
  dispose(): this {
    this.resourceMap.clear();
    return this;
  }
}
