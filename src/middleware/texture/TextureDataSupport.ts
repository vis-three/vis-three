import { Texture } from "three";
import { DataSupport } from "../../core/DataSupport";
import { MODULETYPE } from "../constants/MODULETYPE";
import { TextureCompiler } from "./TextureCompiler";
import { TextureAllType } from "./TextureConfig";
import { TextureRule } from "./TextureRule";

export class TextureDataSupport extends DataSupport<
  TextureAllType,
  Texture,
  TextureCompiler
> {
  MODULE: MODULETYPE = MODULETYPE.TEXTURE;

  constructor(data: Array<TextureAllType> = []) {
    super(TextureRule, data);
  }
}
