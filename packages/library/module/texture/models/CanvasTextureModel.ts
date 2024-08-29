import { CanvasTexture } from "three";
import { CanvasTextureConfig, getCanvasTextureConfig } from "../TextureConfig";
import { defineTextureModel, TextureModelShared } from "./TextureModel";
import { syncObject } from "@vis-three/utils";

export default defineTextureModel<
  CanvasTextureConfig,
  CanvasTexture,
  {},
  TextureModelShared
>(() => ({
  type: "CanvasTexture",
  config: getCanvasTextureConfig,
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
    const texture = new CanvasTexture(model.replaceImage);

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
