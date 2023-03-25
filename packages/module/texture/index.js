import CanvasTextureProcessor from "./processors/CanvasTextureProcessor";
import CubeTextureProcessor from "./processors/CubeTextureProcessor";
import ImageTextureProcessor from "./processors/ImageTextureProcessor";
import LoadTextureProcessor from "./processors/LoadTextureProcessor";
import { TextureCompiler } from "./TextureCompiler";
import { TextureParser } from "./parsers/TextureParser";
import { TextureRule } from "./TextureRule";
import VideoTextureProcessor from "./processors/VideoTextureProcessor";
import { HTMLCanvasElementParser } from "./parsers/HTMLCanvasElementParser";
import { HTMLImageElementParser } from "./parsers/HTMLImageElementParser";
import { HTMLVideoElementParser } from "./parsers/HTMLVideoElementParser";
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
    parsers: [
        TextureParser,
        HTMLCanvasElementParser,
        HTMLImageElementParser,
        HTMLVideoElementParser,
    ],
};
