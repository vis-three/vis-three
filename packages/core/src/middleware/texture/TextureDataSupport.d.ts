import { Texture } from "three";
import { DataSupport } from "../../core/DataSupport";
import { MODULETYPE } from "../constants/MODULETYPE";
import { TextureCompiler } from "./TextureCompiler";
import { TextureAllType } from "./TextureConfig";
export declare class TextureDataSupport extends DataSupport<TextureAllType, Texture, TextureCompiler> {
    MODULE: MODULETYPE;
    constructor(data?: Array<TextureAllType>);
}
