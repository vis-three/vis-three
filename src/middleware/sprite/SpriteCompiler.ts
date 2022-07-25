import {
  BufferGeometry,
  PlaneBufferGeometry,
  Sprite,
  SpriteMaterial,
} from "three";
import { Compiler } from "../../core/Compiler";
import { MODULETYPE } from "../constants/MODULETYPE";
import {
  SolidObjectCompiler,
  SolidObjectCompilerTarget,
} from "../solidObject/SolidObjectCompiler";
import { SpriteConfig } from "./SpriteConfig";
import SpriteProcessor from "./SpriteProcessor";

export interface SpriteCompilerTarget
  extends SolidObjectCompilerTarget<SpriteConfig> {
  [key: string]: SpriteConfig;
}

export class SpriteCompiler extends SolidObjectCompiler<
  SpriteConfig,
  SpriteCompilerTarget,
  Sprite
> {
  MODULE: MODULETYPE = MODULETYPE.SPRITE;

  constructor() {
    super();
  }
}

Compiler.processor(SpriteProcessor);
