import { Texture } from "three";
import { Compiler, CompilerTarget } from "../../core/Compiler";
import { MODULETYPE } from "../constants/MODULETYPE";
import { TextureAllType } from "./TextureConfig";
export interface TextureCompilerTarget extends CompilerTarget<TextureAllType> {
}
export declare class TextureCompiler extends Compiler<TextureAllType, TextureCompilerTarget, Texture> {
    MODULE: MODULETYPE;
    constructor();
}
