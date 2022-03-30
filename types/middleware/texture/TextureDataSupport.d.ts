import { DataSupport } from "../../core/DataSupport";
import { MODULETYPE } from "../constants/MODULETYPE";
import { TextureCompiler, TextureCompilerTarget } from "./TextureCompiler";
export declare class TextureDataSupport extends DataSupport<TextureCompilerTarget, TextureCompiler> {
    MODULE: MODULETYPE;
    constructor(data?: TextureCompilerTarget);
}
