import { SolidObjectCompiler } from "@vis-three/module-solid-object";
import { Sprite } from "three";
import { SpriteConfig } from "./SpriteConfig";

export class SpriteCompiler extends SolidObjectCompiler<SpriteConfig, Sprite> {
  constructor() {
    super();
  }
}
