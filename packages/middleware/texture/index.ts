import { defineModule } from "../module";
import CanvasTextureProcessor from "./CanvasTextureProcessor";
import CubeTextureProcessor from "./CubeTextureProcessor";
import ImageTextureProcessor from "./ImageTextureProcessor";
import LoadTextureProcessor from "./LoadTextureProcessor";
import { TextureCompiler } from "./TextureCompiler";
import { TextureRule } from "./TextureRule";
import VideoTextureProcessor from "./VideoTextureProcessor";

export default defineModule({
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
});
