import { SolidObjectRule } from "@vis-three/module-solid-object";
import { Sprite } from "three";
import { SpriteCompiler } from "./SpriteCompiler";
import { SpriteConfig } from "./SpriteConfig";
export type SpriteRule = SolidObjectRule<SpriteCompiler, SpriteConfig, Sprite>;
export declare const SpriteRule: SpriteRule;
