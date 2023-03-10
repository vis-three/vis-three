import { ImageTexture } from "@vis-three/core";
import { syncObject } from "@vis-three/utils";
import { EngineSupport } from "../engine";
import { defineProcessor } from "../module";
import { getImageTextureConfig, ImageTextureConfig } from "./TextureConfig";
import { needUpdateRegCommand, urlHanlder } from "./common";
import { TextureCompiler } from "./TextureCompiler";

export default defineProcessor<
  ImageTextureConfig,
  ImageTexture,
  EngineSupport,
  TextureCompiler
>({
  type: "ImageTexture",
  config: getImageTextureConfig,
  commands: {
    set: {
      url: urlHanlder,
      $reg: [needUpdateRegCommand],
    },
  },
  create(config: ImageTextureConfig, engine: EngineSupport): ImageTexture {
    const texture = new ImageTexture();
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
