import { EventDispatcher, BaseEvent } from './../core/EventDispatcher';
import { Loader } from "three";
export declare enum LOADERMANAGER {
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
export interface LoaderManagerParameters {
    loaderExtends: {
        [key: string]: Loader;
    };
}
export declare class LoaderManager extends EventDispatcher {
    private resourceMap;
    private loaderMap;
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
    setPath(path: string): this;
    load(urlList: Array<string>): this;
    reset(): this;
    register(ext: string, loader: Loader): this;
    hasLoaded(url: string): boolean;
    getResource(url: string): unknown;
    getLoadDetailMap(): {
        [key: string]: LoadDetail;
    };
    setLoadDetailMap(map: {
        [key: string]: LoadDetail;
    }): this;
    remove(url: string): void;
    toJSON(): string;
    dispose(): this;
}
