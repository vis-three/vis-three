import { Texture } from "three";
import { Compiler } from "../../core/Compiler";
import { MODULETYPE } from "../constants/MODULETYPE";
import ImageTextureProcessor from "./processor/ImageTextureProcessor";
import CanvasTextureProcessor from "./processor/CanvasTextureProcessor";
import CubeTextureProcessor from "./processor/CubeTextureProcessor";
import VideoTextureProcessor from "./processor/VideoTextureProcessor";
import { TextureAllType } from "./TextureConfig";

export class TextureCompiler extends Compiler<TextureAllType, Texture> {
  MODULE: MODULETYPE = MODULETYPE.TEXTURE;

  constructor() {
    super();
  }
}

Compiler.processor(ImageTextureProcessor);
Compiler.processor(CanvasTextureProcessor);
Compiler.processor(CubeTextureProcessor);
Compiler.processor(VideoTextureProcessor);
