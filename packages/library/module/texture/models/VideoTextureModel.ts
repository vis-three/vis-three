import { VideoTexture } from "../extends/VideoTexture";
import { getVideoTextureConfig, VideoTextureConfig } from "../TextureConfig";
import { defineTextureModel, TextureModelShared } from "./TextureModel";
import { syncObject } from "@vis-three/utils";

export default defineTextureModel<
  VideoTextureConfig,
  VideoTexture,
  {},
  TextureModelShared
>(() => ({
  type: "VideoTexture",
  config: getVideoTextureConfig,
  commands: {
    set: {
      url({ model, target, value, engine }) {
        model.toAsync((finish) => {
          target.image = model.getResource(value, engine, [HTMLVideoElement]);

          target.needsUpdate = true;

          if (target.image === model.replaceImage) {
            return false;
          }

          return true;
        });
      },
    },
  },
  create({ model, config, engine }) {
    const texture = new VideoTexture(document.createElement("video"));
    if (config.url) {
      model.toAsync((finish) => {
        texture.image = model.getResource(config.url, engine, [
          HTMLVideoElement,
        ]);

        texture.needsUpdate = true;

        if (texture.image === model.replaceImage) {
          return false;
        }

        return true;
      });
    }

    syncObject(config, texture, {
      type: true,
      url: true,
    });

    texture.needsUpdate = true;

    return texture;
  },

  dispose({ target }) {
    target.dispose();
  },
}));
