import { Loader } from "three";
import { BaseEvent, EventDispatcher } from "@vis-three/core";
export declare enum LOADER_EVENT {
    BEFORELOAD = "beforeLoad",
    LOADING = "loading",
    DETAILLOADING = "detailLoading",
    DETAILLOADED = "detailLoaded",
    LOADED = "loaded"
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
export type LoadUnit = string | {
    url: string;
    ext: string;
};
export interface LoaderManagerParameters {
    loaderExtends: {
        [key: string]: Loader;
    };
}
export declare class LoaderManager extends EventDispatcher {
    private resourceMap;
    private loaderMap;
    private urlList;
    private loadTotal;
    private loadSuccess;
    private loadError;
    private isError;
    private isLoading;
    private isLoaded;
    private loadDetailMap;
    path: string;
    constructor(parameters?: LoaderManagerParameters);
    private loaded;
    private checkLoaded;
    /**
     * 设置统一资源路径前缀
     * @param path
     * @returns
     */
    setPath(path: string): this;
    /**
     * 设置请求头
     * @param headers
     * @returns this
     */
    setRequestHeader(headers: Record<string, string>): this;
    /**
     * 设置响应类型
     * @param responseType
     * @returns this
     */
    setResponseType(responseType: string): this;
    /**
     * 获取加载器
     * @param ext 资源类型
     * @returns
     */
    getLoader(ext: string): Loader | null;
    /**
     * 加载资源
     * @param urlList string[] | [{ext: string, url: string}]
     * @returns this
     */
    load(urlList: Array<LoadUnit>): this;
    /**
     * 重置加载管理器属性
     * @returns
     */
    reset(): this;
    /**
     * 注册loader
     * @param ext 文件格式: jpg
     * @param loader extend THREE.Loader
     * @returns this
     */
    register(ext: string, loader: Loader): this;
    hasLoaded(url: string): boolean;
    /**
     * 获取url下的资源
     * @param url
     * @returns
     */
    getResource(url: string): unknown;
    /**
     * @deprecated
     * 获取详细资源信息
     * @returns
     */
    getLoadDetailMap(): {
        [key: string]: LoadDetail;
    };
    /**
     * @deprecated
     * 设置详细资源信息
     * @param map
     * @returns
     */
    setLoadDetailMap(map: {
        [key: string]: LoadDetail;
    }): this;
    remove(url: string): void;
    toJSON(): string;
    /**
     * 导出配置单
     * @returns
     * @todo 对比缓存
     */
    exportConfig(): string[];
    /**
     * 清空缓存
     * @returns
     */
    dispose(): this;
}
