import { ImageTexture } from "@vis-three/core";
import { syncObject } from "@vis-three/utils";
import { CanvasTexture } from "three";
import { MODULETYPE } from "../../constants";

import { CONFIGTYPE } from "../../constants/configType";
import { EngineSupport } from "../../engine";
import { defineProcessor } from "../../module";
import { TextureCompiler } from "../TextureCompiler";
import { CanvasTextureConfig } from "../TextureConfig";
import { needUpdateRegCommand, urlHanlder } from "./common";

export default defineProcessor<
  CanvasTextureConfig,
  CanvasTexture,
  EngineSupport
>({
  configType: CONFIGTYPE.CANVASTEXTURE,
  commands: {
    set: {
      url: urlHanlder,
      $reg: [needUpdateRegCommand],
    },
  },
  create(config: CanvasTextureConfig, engine: EngineSupport): CanvasTexture {
    const texture = new CanvasTexture(
      engine.compilerManager
        .getCompiler<TextureCompiler>(MODULETYPE.TEXTURE)!
        .getResource(config.url, HTMLCanvasElement) as HTMLCanvasElement
    );

    urlHanlder({ target: texture, value: config.url, engine });

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
