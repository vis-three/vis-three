import { defineProcessor } from "../../../core/Processor";
import { EngineSupport } from "../../../engine/EngineSupport";
import { ImageTexture } from "../../../extends/texture/ImageTexture";
import { syncObject } from "../../../utils/utils";
import { CONFIGTYPE } from "../../constants/configType";
import { ImageTextureConfig } from "../TextureConfig";
import { needUpdateRegCommand } from "./common";

export default defineProcessor<ImageTextureConfig, ImageTexture>({
  configType: CONFIGTYPE.IMAGETEXTURE,
  commands: {
    set: {
      url({ target, value, engine }) {
        target.image = engine.compilerManager.textureCompiler.getResource(
          value,
          HTMLImageElement
        );
        target.needsUpdate = true;
      },
      $reg: [needUpdateRegCommand],
    },
  },
  create(config: ImageTextureConfig, engine: EngineSupport): ImageTexture {
    const texture = new ImageTexture();
    if (config.url) {
      texture.image = engine.compilerManager.textureCompiler.getResource(
        config.url,
        HTMLImageElement
      );
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
