import { Texture } from "three";
import { Compiler } from "../../core/Compiler";
import { MODULETYPE } from "../../core/middleware/MODULETYPE";
import ImageTextureProcessor from "./processor/ImageTextureProcessor";
import CanvasTextureProcessor from "./processor/CanvasTextureProcessor";
import CubeTextureProcessor from "./processor/CubeTextureProcessor";
import VideoTextureProcessor from "./processor/VideoTextureProcessor";
import { TextureAllType } from "./TextureConfig";
import { CanvasGenerator } from "../../convenient/CanvasGenerator";
import LoadTextureProcessor from "./processor/LoadTextureProcessor";

export class TextureCompiler extends Compiler<TextureAllType, Texture> {
  static replaceImage = new CanvasGenerator({
    width: 512,
    height: 512,
  })
    .draw((ctx) => {
      ctx.translate(256, 256);
      ctx.font = "72px";
      ctx.fillStyle = "white";
      ctx.fillText("暂无图片", 0, 0);
    })
    .getDom();

  MODULE: MODULETYPE = MODULETYPE.TEXTURE;

  constructor() {
    super();
  }

  getResource<T extends abstract new (...args: any) => any>(
    url: string,
    instanceClasses: T | T[]
  ): InstanceType<T> | HTMLCanvasElement {
    const resourceMap = this.engine.resourceManager.resourceMap;

    if (!resourceMap.has(url)) {
      console.warn(`engine resourceManager can not found this url: ${url}`);
      return TextureCompiler.replaceImage;
    }

    const resource = resourceMap.get(url)!;

    if (Array.isArray(instanceClasses)) {
      for (const instanceClass of instanceClasses) {
        if (resource instanceof instanceClass) {
          return resource;
        }
      }

      console.warn(
        `this url mapping resource is not a texture image class: ${url}`,
        resource
      );
      return TextureCompiler.replaceImage;
    } else {
      if (resource instanceof instanceClasses) {
        return resource;
      } else {
        console.warn(
          `this url mapping resource is not a texture image class: ${url}`,
          resource
        );
        return TextureCompiler.replaceImage;
      }
    }
  }
}

Compiler.processor(ImageTextureProcessor);
Compiler.processor(CanvasTextureProcessor);
Compiler.processor(CubeTextureProcessor);
Compiler.processor(VideoTextureProcessor);
Compiler.processor(LoadTextureProcessor);
