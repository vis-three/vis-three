import { Texture } from "three";
import { CompilerTarget } from "../../core/Compiler";
import { DataSupport } from "../../core/DataSupport";
import { IgnoreAttribute } from "../../core/ProxyBroadcast";
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

  constructor(data?: CompilerTarget<TextureAllType>, ignore?: IgnoreAttribute) {
    !data && (data = {});
    super(TextureRule, data, ignore);
  }
}
