import {
  CONFIG_TYPE,
  EngineSupport,
  generateConfig,
} from "@vis-three/tdcm";
import { LoadTextureConfig } from "./TextureConfig";
import { Texture } from "three";
import { getResource } from "./models/TextureModel";

export interface TextureEngineSupport extends EngineSupport {
  generateLoadTextureConfig: (url: string) => LoadTextureConfig | null;
}

export default function (engine: TextureEngineSupport) {
  engine.generateLoadTextureConfig = function (url: string) {
    const resource = getResource(url, this, Texture);

    if (resource instanceof HTMLCanvasElement) {
      return null;
    }

    return generateConfig<LoadTextureConfig>(CONFIG_TYPE.LOADTEXTURE, {
      url,
      flipY: resource.flipY,
      format: resource.format,
      mapping: resource.mapping,
      minFilter: resource.minFilter,
      magFilter: resource.magFilter,
    });
  };
}
