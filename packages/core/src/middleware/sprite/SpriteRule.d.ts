import { Sprite } from "three";
import { SolidObjectRule } from "../solidObject/SolidObjectRule";
import { SpriteCompiler } from "./SpriteCompiler";
import { SpriteConfig } from "./SpriteConfig";
export type SpriteRule = SolidObjectRule<SpriteCompiler, SpriteConfig, Sprite>;
export declare const SpriteRule: SpriteRule;
