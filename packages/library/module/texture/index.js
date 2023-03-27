import CanvasTextureProcessor from "./processors/CanvasTextureProcessor";
import CubeTextureProcessor from "./processors/CubeTextureProcessor";
import ImageTextureProcessor from "./processors/ImageTextureProcessor";
import LoadTextureProcessor from "./processors/LoadTextureProcessor";
import { TextureCompiler } from "./TextureCompiler";
import { TextureRule } from "./TextureRule";
import VideoTextureProcessor from "./processors/VideoTextureProcessor";
export default {
    type: "texture",
    compiler: TextureCompiler,
    rule: TextureRule,
    processors: [
        CanvasTextureProcessor,
        CubeTextureProcessor,
        ImageTextureProcessor,
        LoadTextureProcessor,
        VideoTextureProcessor,
    ],
};
