import { Sprite } from "three";
import { ObjectDataSupport } from "../object/ObjectDataSupport";
import { SpriteCompiler, SpriteCompilerTarget } from "./SpriteCompiler";
import { SpriteConfig } from "./SpriteConfig";
import { SpriteRule } from "./SpriteRule";
export declare class SpriteDataSupport extends ObjectDataSupport<SpriteRule, SpriteCompiler, SpriteConfig, SpriteCompilerTarget, Sprite> {
    constructor(data?: SpriteCompilerTarget);
}
