import { syncObject } from "@vis-three/utils";
import { CanvasTexture } from "three";

import { needUpdateRegCommand, urlHanlder } from "./common";
import {
  defineProcessor,
  EngineSupport,
  MODULETYPE,
} from "@vis-three/middleware";
import { CanvasTextureConfig, getCanvasTextureConfig } from "../TextureConfig";
import { TextureCompiler } from "../TextureCompiler";

export default defineProcessor<
  CanvasTextureConfig,
  CanvasTexture,
  EngineSupport,
  TextureCompiler
>({
  type: "CanvasTexture",
  config: getCanvasTextureConfig,
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

  dispose(target): void {
    target.dispose();
  },
});
