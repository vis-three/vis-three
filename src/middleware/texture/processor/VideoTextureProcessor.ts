import { VideoTexture } from "three";
import { defineProcessor } from "../../../core/Processor";
import { EngineSupport } from "../../../engine/EngineSupport";
import { ImageTexture } from "../../../extends/texture/ImageTexture";
import { syncObject } from "../../../utils/utils";
import { CONFIGTYPE } from "../../constants/configType";
import { VideoTextureConfig } from "../TextureConfig";
import { getResource } from "./common";

export default defineProcessor<VideoTextureConfig, VideoTexture>({
  configType: CONFIGTYPE.VIDEOTEXTURE,
  commands: {
    set: {
      url({ target, value, engine }) {
        target.image = getResource(value, engine, HTMLVideoElement);
      },
    },
  },
  create(config: VideoTextureConfig, engine: EngineSupport): VideoTexture {
    const texture = new VideoTexture(document.createElement("video"));

    if (config.url) {
      texture.image = getResource(config.url, engine, HTMLVideoElement);
    }

    syncObject(config, texture, {
      type: true,
      url: true,
    });

    return texture;
  },

  dispose(target: ImageTexture): void {
    target.dispose();
  },
});
