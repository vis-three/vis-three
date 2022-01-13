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
    private loaded;
    private checkLoaded;
    load(urlList: Array<string>): this;
    reset(): this;
    hasLoaded(url: string): boolean;
    getResource(url: string): unknown;
    getLoadDetailMap(): {
        [key: string]: LoadDetail;
    };
    setLoadDetailMap(map: {
        [key: string]: LoadDetail;
    }): this;
    dispose(): this;
}
