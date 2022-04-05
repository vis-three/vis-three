import { ImageLoader, Loader, LoadingManager, Cache } from "three";

export class VideoLoader extends Loader {
  static autoplay = true;
  static preload: "" | "none" | "metadata" | "auto" = "auto";
  static muted = true;
  static loop = true;

  constructor(manager?: LoadingManager) {
    super(manager);
  }

  load(
    url: string,
    onLoad?: (video: HTMLVideoElement) => void,
    onProgress?: (event: ProgressEvent) => void,
    onError?: (event: string | Event) => void
  ): HTMLVideoElement {
    if (this.path !== undefined) {
      url = this.path + url;
    }

    this.manager.itemStart(url);
    url = this.manager.resolveURL(url);

    const cached = Cache.get(url);

    if (cached !== undefined) {
      setTimeout(() => {
        if (onLoad) onLoad(cached);

        this.manager.itemEnd(url);
      }, 0);

      return cached;
    }

    const video = document.createElement("video");
    video.preload = VideoLoader.preload;
    video.autoplay = VideoLoader.autoplay;
    video.loop = VideoLoader.loop;
    video.muted = VideoLoader.muted;
    video.src = url;
    video.style.position = "fixed";
    video.style.top = "0";
    video.style.left = "0";
    video.style.zIndex = "-1";
    document.body.appendChild(video);

    video.oncanplay = () => {
      Cache.add(url, video);
      this.manager.itemEnd(url);
      if (onLoad) onLoad(video);
    };

    video.onerror = (e) => {
      this.manager.itemEnd(url);
      if (onError) onError(e);
    };

    return video;
  }
}

ImageLoader;
