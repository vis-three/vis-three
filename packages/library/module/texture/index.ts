import CanvasTextureModel from "./models/CanvasTextureModel";
import CubeTextureModel from "./models/CubeTextureModel";
import ImageTextureModel from "./models/ImageTextureModel";
import LoadTextureModel from "./models/LoadTextureModel";
import VideoTextureModel from "./models/VideoTextureModel";
import TextureExtend from "./TextureExtend";
import { defineModule } from "@vis-three/tdcm";

export * from "./TextureConfig";
export * from "./TextureExtend";

export default defineModule({
  type: "texture",
  models: [
    CanvasTextureModel,
    CubeTextureModel,
    ImageTextureModel,
    LoadTextureModel,
    VideoTextureModel,
  ],
  extend: TextureExtend,
});
