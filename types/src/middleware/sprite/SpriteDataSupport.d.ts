import { Sprite } from "three";
import { CompilerTarget } from "../../core/Compiler";
import { IgnoreAttribute } from "../../core/DataContainer";
import { MODULETYPE } from "../constants/MODULETYPE";
import { SolidObjectDataSupport } from "../solidObject/SolidDataSupport";
import { SpriteCompiler } from "./SpriteCompiler";
import { SpriteConfig } from "./SpriteConfig";
export declare class SpriteDataSupport extends SolidObjectDataSupport<
  SpriteConfig,
  Sprite,
  SpriteCompiler
> {
  MODULE: MODULETYPE;
  constructor(data?: CompilerTarget<SpriteConfig>, ignore?: IgnoreAttribute);
}
