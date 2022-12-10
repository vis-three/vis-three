import {
  EngineSupport,
  syncObject,
  ImageTexture,
  defineProcessor,
} from "@vis-three/core";
import { CanvasTexture } from "three";

import { CONFIGTYPE } from "../../constants/configType";
import { CanvasTextureConfig } from "../TextureConfig";
import { needUpdateRegCommand, urlHanlder } from "./common";

export default defineProcessor<CanvasTextureConfig, CanvasTexture>({
  configType: CONFIGTYPE.CANVASTEXTURE,
  commands: {
    set: {
      url: urlHanlder,
      $reg: [needUpdateRegCommand],
    },
  },
  create(config: CanvasTextureConfig, engine: EngineSupport): CanvasTexture {
    const texture = new CanvasTexture(
      engine.compilerManager.textureCompiler.getResource(
        config.url,
        HTMLCanvasElement
      ) as HTMLCanvasElement
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
