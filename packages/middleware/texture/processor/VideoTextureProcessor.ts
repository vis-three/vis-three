import { CONFIGTYPE } from "../../constants/CONFIGTYPE";
import { VideoTextureConfig } from "../TextureConfig";
import { needUpdateRegCommand, urlHanlder } from "./common";
import { VideoTexture } from "@vis-three/core";
import { EngineSupport } from "../../engine";
import { defineProcessor } from "../../module";
import { syncObject } from "@vis-three/utils";

export default defineProcessor<VideoTextureConfig, VideoTexture, EngineSupport>(
  {
    configType: CONFIGTYPE.VIDEOTEXTURE,
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
  }
);
