import { Sprite } from "three";
import { MODULETYPE } from "../constants/MODULETYPE";
import { SolidObjectCompiler } from "../solidObject/SolidObjectCompiler";
import { SpriteConfig } from "./SpriteConfig";
export declare class SpriteCompiler extends SolidObjectCompiler<SpriteConfig, Sprite> {
    MODULE: MODULETYPE;
    constructor();
}
