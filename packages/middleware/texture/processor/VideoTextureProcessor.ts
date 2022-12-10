import { CONFIGTYPE } from "../../constants/configType";
import { VideoTextureConfig } from "../TextureConfig";
import { needUpdateRegCommand, urlHanlder } from "./common";
import {
  EngineSupport,
  VideoTexture,
  syncObject,
  defineProcessor,
} from "@vis-three/core";

export default defineProcessor<VideoTextureConfig, VideoTexture>({
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
});
