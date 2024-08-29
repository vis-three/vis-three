import { getLoadTextureConfig, LoadTextureConfig } from "../TextureConfig";
import { defineTextureModel, TextureModelShared } from "./TextureModel";
import { syncObject } from "@vis-three/utils";
import { LoadTexture } from "../extends/LoadTexture";
import { Texture } from "three";

export default defineTextureModel<
  LoadTextureConfig,
  LoadTexture,
  {},
  TextureModelShared
>(() => ({
  type: "LoadTexture",
  config: getLoadTextureConfig,
  commands: {
    set: {
      url() {},
    },
  },
  create({ model, config, engine }) {
    let texture: LoadTexture;

    const resource = model.getResource(config.url, engine, Texture);

    if (resource instanceof Texture) {
      texture = new LoadTexture(resource);
    } else {
      const tempTexture = new Texture(resource);
      texture = new LoadTexture(tempTexture);
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
