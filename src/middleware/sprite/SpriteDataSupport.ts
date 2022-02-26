import { Sprite } from "three";
import { DataSupport } from "../../core/DataSupport";
import { ObjectDataSupport } from "../object/ObjectDataSupport";
import { SpriteCompiler, SpriteCompilerTarget } from "./SpriteCompiler";
import { SpriteConfig } from "./SpriteConfig";
import { SpriteRule } from "./SpriteRule";

export class SpriteDataSupport extends ObjectDataSupport<
  SpriteRule,
  SpriteCompiler,
  SpriteConfig,
  SpriteCompilerTarget, 
  Sprite
> {
  constructor (data?: SpriteCompilerTarget) {
    !data && (data = {})
    super(SpriteRule, data)
  }
}