import { Loader, LoadingManager } from "three";
export declare class VideoLoader extends Loader {
    static autoplay: boolean;
    static preload: "" | "none" | "metadata" | "auto";
    static muted: boolean;
    static loop: boolean;
    constructor(manager?: LoadingManager);
    load(url: string, onLoad?: (video: HTMLVideoElement) => void, onProgress?: (event: ProgressEvent) => void, onError?: (event: string | Event) => void): HTMLVideoElement;
}
