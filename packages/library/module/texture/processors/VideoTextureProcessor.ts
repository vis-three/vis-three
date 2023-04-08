import { getVideoTextureConfig, VideoTextureConfig } from "../TextureConfig";
import { needUpdateRegCommand, urlHanlder } from "./common";
import { syncObject } from "@vis-three/utils";
import { TextureCompiler } from "../TextureCompiler";
import { defineProcessor, EngineSupport } from "@vis-three/middleware";
import { VideoTexture } from "../extends/VideoTexture";

export default defineProcessor<
  VideoTextureConfig,
  VideoTexture,
  EngineSupport,
  TextureCompiler
>({
  type: "VideoTexture",
  config: getVideoTextureConfig,
  commands: {
    set: {
      url: urlHanlder,
      $reg: [needUpdateRegCommand],
    },
  },
  create(config: VideoTextureConfig, engine: EngineSupport): VideoTexture {
    const texture = new VideoTexture(document.createElement("video"));

    if (config.url) {
      urlHanlder({ target: texture, value: config.url, engine });
    }

    syncObject(config, texture, {
      type: true,
      url: true,
    });

    texture.needsUpdate = true;

    return texture;
  },

  dispose(target: VideoTexture): void {
    target.dispose();
  },
});
