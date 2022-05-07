import { Sprite } from "three";
import { IgnoreAttribute } from "../../core/ProxyBroadcast";
import { MODULETYPE } from "../constants/MODULETYPE";
import { SolidObjectDataSupport } from "../solidObject/SolidDataSupport";
import { SpriteCompiler, SpriteCompilerTarget } from "./SpriteCompiler";
import { SpriteConfig } from "./SpriteConfig";
import { SpriteRule } from "./SpriteRule";

export class SpriteDataSupport extends SolidObjectDataSupport<
  SpriteRule,
  SpriteCompiler,
  SpriteConfig,
  SpriteCompilerTarget,
  Sprite
> {
  MODULE: MODULETYPE = MODULETYPE.SPRITE;

  constructor(data?: SpriteCompilerTarget, ignore?: IgnoreAttribute) {
    !data && (data = {});
    super(SpriteRule, data, ignore);
  }
}
