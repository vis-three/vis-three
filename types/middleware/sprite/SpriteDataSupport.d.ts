import { Sprite } from "three";
import { MODULETYPE } from "../constants/MODULETYPE";
import { SolidObjectDataSupport } from "../solidObject/SolidDataSupport";
import { SpriteCompiler, SpriteCompilerTarget } from "./SpriteCompiler";
import { SpriteConfig } from "./SpriteConfig";
import { SpriteRule } from "./SpriteRule";
export declare class SpriteDataSupport extends SolidObjectDataSupport<SpriteRule, SpriteCompiler, SpriteConfig, SpriteCompilerTarget, Sprite> {
    MODULE: MODULETYPE;
    constructor(data?: SpriteCompilerTarget);
}
