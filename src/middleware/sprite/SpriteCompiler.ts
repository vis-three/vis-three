import {
  BufferGeometry,
  PlaneBufferGeometry,
  Sprite,
  SpriteMaterial,
} from "three";
import { Compiler } from "../../core/Compiler";
import { MODULETYPE } from "../constants/MODULETYPE";
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
