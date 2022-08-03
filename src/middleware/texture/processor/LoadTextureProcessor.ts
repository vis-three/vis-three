import { Texture } from "three";
import { defineProcessor } from "../../../core/Processor";
import { EngineSupport } from "../../../engine/EngineSupport";
import { ImageTexture } from "../../../extends/texture/ImageTexture";
import { LoadTexture } from "../../../extends/texture/LoadTexture";
import { syncObject } from "../../../utils/utils";
import { CONFIGTYPE } from "../../constants/configType";
import { LoadTextureConfig } from "../TextureConfig";
import { needUpdateRegCommand } from "./common";

export default defineProcessor<LoadTextureConfig, LoadTexture>({
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

    const resource = engine.compilerManager.textureCompiler.getResource(
      config.url,
      Texture
    );

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
