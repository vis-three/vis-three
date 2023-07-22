import {
  CONFIGTYPE,
  EngineSupport,
  MODULETYPE,
  generateConfig,
} from "@vis-three/middleware";
import { LoadTextureConfig } from "./TextureConfig";
import { TextureCompiler } from "./TextureCompiler";
import { Texture } from "three";

export interface TextureModuleEngine extends EngineSupport {
  generateLoadTextureConfig: (url: string) => LoadTextureConfig | null;
}

export default function (engine: TextureModuleEngine) {
  engine.generateLoadTextureConfig = function (url: string) {
    const resource = this.compilerManager
      .getCompiler<TextureCompiler>(MODULETYPE.TEXTURE)!
      .getResource(url, Texture);

    if (resource instanceof HTMLCanvasElement) {
      return null;
    }

    return generateConfig<LoadTextureConfig>(CONFIGTYPE.LOADTEXTURE, {
      url,
      flipY: resource.flipY,
      format: resource.format,
      mapping: resource.mapping,
      encoding: resource.encoding,
      minFilter: resource.minFilter,
      magFilter: resource.magFilter,
    });
  };
}
