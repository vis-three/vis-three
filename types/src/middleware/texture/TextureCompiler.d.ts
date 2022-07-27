import { Texture } from "three";
import { Compiler } from "../../core/Compiler";
import { MODULETYPE } from "../constants/MODULETYPE";
import { TextureAllType } from "./TextureConfig";
export declare class TextureCompiler extends Compiler<TextureAllType, Texture> {
    MODULE: MODULETYPE;
    constructor();
}
