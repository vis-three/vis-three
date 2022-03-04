import { Sprite } from "three";
import { ObjectRule } from "../object/ObjectRule";
import { SpriteCompiler, SpriteCompilerTarget } from "./SpriteCompiler";
import { SpriteConfig } from "./SpriteConfig";
export declare type SpriteRule = ObjectRule<SpriteCompiler, SpriteConfig, SpriteCompilerTarget, Sprite>;
export declare const SpriteRule: SpriteRule;
