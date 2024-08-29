import { getImageTextureConfig, ImageTextureConfig } from "../TextureConfig";
import { defineTextureModel, TextureModelShared } from "./TextureModel";
import { syncObject } from "@vis-three/utils";
import { ImageTexture } from "../extends/ImageTexture";

export default defineTextureModel<
  ImageTextureConfig,
  ImageTexture,
  {},
  TextureModelShared
>(() => ({
  type: "ImageTexture",
  config: getImageTextureConfig,
  commands: {
    set: {
      url({ model, target, value, engine }) {
        model.toAsync((finish) => {
          target.image = model.getResource(value, engine, [
            HTMLImageElement,
            HTMLVideoElement,
            HTMLCanvasElement,
          ]);

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
    const texture = new ImageTexture(model.replaceImage);
    if (config.url) {
      model.toAsync((finish) => {
        texture.image = model.getResource(config.url, engine, [
          HTMLImageElement,
          HTMLVideoElement,
          HTMLCanvasElement,
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
