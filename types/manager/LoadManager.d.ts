import { BaseEvent, EventDispatcher, Loader } from "three";
export interface LoaderMap {
    [key: string]: Loader;
}
export interface LoadDetail {
    url: string;
    progress: number;
    error: boolean;
    message: string;
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
export declare enum LOADEEVENTTYPE {
    LOADING = "loading",
    DETAILLOADING = "detailLoading",
    DETAILLOADED = "detailLoaded",
    LOADED = "loaded"
}
export declare class LoaderManager extends EventDispatcher<LoadingEvent | DetailEvent | LoadedEvent> {
    private resourceMap;
    private loaderMap;
    private loadTotal;
    private loadSuccess;
    private loadError;
    private isError;
    private isLoading;
    private isLoaded;
    private loadDetailMap;
    constructor();
    load(urlList: Array<string>): this;
    private loaded;
    reset(): this;
    dispose(): this;
    private checkLoaded;
}
