import { DataSupport } from "../../middleware/DataSupport";
import { TextureCompiler, TextureCompilerTarget } from "./TextureCompiler";
export declare class TextureDataSupport extends DataSupport<TextureCompilerTarget, TextureCompiler> {
    constructor(data?: TextureCompilerTarget);
}
