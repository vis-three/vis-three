import { defineProcessor } from "../../../core/Processor";
import { EngineSupport } from "../../../engine/EngineSupport";
import { ImageTexture } from "../../../extends/texture/ImageTexture";
import { VideoTexture } from "../../../optimize/VideoTexture";
import { syncObject } from "../../../utils/utils";
import { CONFIGTYPE } from "../../constants/configType";
import { VideoTextureConfig } from "../TextureConfig";
import { needUpdateRegCommand, urlHanlder } from "./common";

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

  dispose(target: ImageTexture): void {
    target.dispose();
  },
});
