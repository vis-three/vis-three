import { DataSupport } from "../../core/DataSupport";
import { TextureCompiler, TextureCompilerTarget } from "./TextureCompiler";
import { TextureRule } from "./TextureRule";

export class TextureDataSupport extends DataSupport<TextureCompilerTarget, TextureCompiler> {
  constructor (data?: TextureCompilerTarget) {
    !data && (data = {})
    super(TextureRule, data)
  }
}