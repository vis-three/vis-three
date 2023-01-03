import { Texture } from "three";

import { ImageTexture, LoadTexture } from "@vis-three/core";
import { CONFIGTYPE } from "../../constants/CONFIGTYPE";
import { LoadTextureConfig } from "../TextureConfig";
import { needUpdateRegCommand } from "./common";
import { defineProcessor } from "../../module";
import { EngineSupport } from "../../engine";
import { syncObject } from "@vis-three/utils";
import { TextureCompiler } from "../TextureCompiler";
import { MODULETYPE } from "../../constants";

export default defineProcessor<LoadTextureConfig, LoadTexture, EngineSupport>({
  configType: CONFIGTYPE.LOADTEXTURE,
  commands: {
    set: {
      // 当前的LoadTexture是一次性的
      url({}) {},
      $reg: [needUpdateRegCommand],
    },
  },
  create(config: LoadTextureConfig, engine: EngineSupport): LoadTexture {
    let texture: LoadTexture;

    const resource = engine.compilerManager
      .getCompiler<TextureCompiler>(MODULETYPE.TEXTURE)!
      .getResource(config.url, Texture);

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

  dispose(target: ImageTexture): void {
    target.dispose();
  },
});
