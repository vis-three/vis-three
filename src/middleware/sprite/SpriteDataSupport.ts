import { DataSupport } from "../../core/DataSupport";
import { SpriteCompiler, SpriteCompilerTarget } from "./SpriteCompiler";
import { SpriteRule } from "./SpriteRule";

export class SpriteDataSupport extends DataSupport<SpriteCompilerTarget, SpriteCompiler> {
  constructor (data?: SpriteCompilerTarget) {
    !data && (data = {})
    super(SpriteRule, data)
  }
}