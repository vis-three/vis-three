import { CanvasTexture } from "three";
import { defineProcessor } from "../../../core/Processor";
import { EngineSupport } from "../../../engine/EngineSupport";
import { ImageTexture } from "../../../extends/texture/ImageTexture";
import { syncObject } from "../../../utils/utils";
import { CONFIGTYPE } from "../../constants/configType";
import { CanvasTextureConfig } from "../TextureConfig";
import { getResource, replaceImage } from "./common";

export default defineProcessor<CanvasTextureConfig, CanvasTexture>({
  configType: CONFIGTYPE.CANVASTEXTURE,
  commands: {
    set: {
      url({ target, value, engine }) {
        target.image = getResource(value, engine, HTMLCanvasElement);
        target.needsUpdate = true;
      },
    },
  },
  create(config: CanvasTextureConfig, engine: EngineSupport): CanvasTexture {
    const texture = new CanvasTexture(replaceImage);

    if (config.url) {
      texture.image = getResource(config.url, engine, HTMLCanvasElement);
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
