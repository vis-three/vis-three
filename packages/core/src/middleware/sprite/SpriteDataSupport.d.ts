import { Sprite } from "three";
import { MODULETYPE } from "../constants/MODULETYPE";
import { SolidObjectDataSupport } from "../solidObject/SolidDataSupport";
import { SpriteCompiler } from "./SpriteCompiler";
import { SpriteConfig } from "./SpriteConfig";
export declare class SpriteDataSupport extends SolidObjectDataSupport<SpriteConfig, Sprite, SpriteCompiler> {
    MODULE: MODULETYPE;
    constructor(data?: Array<SpriteConfig>);
}
