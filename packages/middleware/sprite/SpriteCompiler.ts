import { Compiler } from "../module";
import { Sprite } from "three";
import { MODULETYPE } from "../constants";
import { SolidObjectCompiler } from "../solidObject/SolidObjectCompiler";
import { SpriteConfig } from "./SpriteConfig";
import SpriteProcessor from "./SpriteProcessor";

export class SpriteCompiler extends SolidObjectCompiler<SpriteConfig, Sprite> {
  MODULE: MODULETYPE = MODULETYPE.SPRITE;

  constructor() {
    super();
  }
}

Compiler.processor(SpriteProcessor);
