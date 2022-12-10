import { Sprite } from "three";
import { MODULETYPE } from "../constants";
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

  constructor(data: Array<SpriteConfig> = []) {
    super(SpriteRule, data);
  }
}
