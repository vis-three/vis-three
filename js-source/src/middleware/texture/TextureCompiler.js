import { Compiler } from "../../core/Compiler";
import { MODULETYPE } from "../constants/MODULETYPE";
import ImageTextureProcessor from "./processor/ImageTextureProcessor";
import CanvasTextureProcessor from "./processor/CanvasTextureProcessor";
import CubeTextureProcessor from "./processor/CubeTextureProcessor";
import VideoTextureProcessor from "./processor/VideoTextureProcessor";
export class TextureCompiler extends Compiler {
    MODULE = MODULETYPE.TEXTURE;
    constructor() {
        super();
    }
}
Compiler.processor(ImageTextureProcessor);
Compiler.processor(CanvasTextureProcessor);
Compiler.processor(CubeTextureProcessor);
Compiler.processor(VideoTextureProcessor);
//# sourceMappingURL=TextureCompiler.js.map