import { Sprite } from "three";
import { MODULETYPE } from "../constants/MODULETYPE";
import { SolidObjectCompiler, SolidObjectCompilerTarget } from "../solidObject/SolidObjectCompiler";
import { SpriteConfig } from "./SpriteConfig";
export interface SpriteCompilerTarget extends SolidObjectCompilerTarget<SpriteConfig> {
    [key: string]: SpriteConfig;
}
export declare class SpriteCompiler extends SolidObjectCompiler<SpriteConfig, SpriteCompilerTarget, Sprite> {
    MODULE: MODULETYPE;
    constructor();
}
