import { Sprite } from "three";
import { SolidObjectCompiler } from "../solidObject/SolidObjectCompiler";
import { SpriteConfig } from "./SpriteConfig";

export class SpriteCompiler extends SolidObjectCompiler<SpriteConfig, Sprite> {
  constructor() {
    super();
  }
}
