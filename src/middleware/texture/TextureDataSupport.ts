import { DataSupport } from "../../core/DataSupport";
import { IgnoreAttribute } from "../../core/ProxyBroadcast";
import { MODULETYPE } from "../constants/MODULETYPE";
import { TextureCompiler, TextureCompilerTarget } from "./TextureCompiler";
import { TextureRule } from "./TextureRule";

export class TextureDataSupport extends DataSupport<
  TextureCompilerTarget,
  TextureCompiler
> {
  MODULE: MODULETYPE = MODULETYPE.TEXTURE;

  constructor(data?: TextureCompilerTarget, ignore?: IgnoreAttribute) {
    !data && (data = {});
    super(TextureRule, data, ignore);
  }
}
