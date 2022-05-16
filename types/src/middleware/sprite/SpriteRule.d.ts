import { Sprite } from "three";
import { SolidObjectRule } from "../solidObject/SolidObjectRule";
import { SpriteCompiler, SpriteCompilerTarget } from "./SpriteCompiler";
import { SpriteConfig } from "./SpriteConfig";
export declare type SpriteRule = SolidObjectRule<SpriteCompiler, SpriteConfig, SpriteCompilerTarget, Sprite>;
export declare const SpriteRule: SpriteRule;
