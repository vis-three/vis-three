import { Sprite } from "three";
import { CompilerTarget } from "../../core/Compiler";
import { IgnoreAttribute } from "../../core/ProxyBroadcast";
import { MODULETYPE } from "../constants/MODULETYPE";
import { SolidObjectDataSupport } from "../solidObject/SolidDataSupport";
import { SpriteCompiler } from "./SpriteCompiler";
import { SpriteConfig } from "./SpriteConfig";
import { SpriteRule } from "./SpriteRule";

export class SpriteDataSupport extends SolidObjectDataSupport<
  SpriteConfig,
  Sprite,
  SpriteCompiler
> {
  MODULE: MODULETYPE = MODULETYPE.SPRITE;

  constructor(data?: CompilerTarget<SpriteConfig>, ignore?: IgnoreAttribute) {
    !data && (data = {});
    super(SpriteRule, data, ignore);
  }
}
