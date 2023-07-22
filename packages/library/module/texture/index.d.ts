import { TextureCompiler } from "./TextureCompiler";
import TextureExtend from "./TextureExtend";
export * from "./TextureCompiler";
export * from "./TextureConfig";
export * from "./TextureExtend";
declare const _default: {
    type: string;
    compiler: typeof TextureCompiler;
    rule: import("@vis-three/middleware").Rule<TextureCompiler>;
    processors: (import("@vis-three/middleware").Processor<import("./TextureConfig").CanvasTextureConfig, import("three").CanvasTexture, import("@vis-three/middleware").EngineSupport, TextureCompiler> | import("@vis-three/middleware").Processor<import("./TextureConfig").CubeTextureConfig, import("three").CubeTexture, import("@vis-three/middleware").EngineSupport, TextureCompiler> | import("@vis-three/middleware").Processor<import("./TextureConfig").ImageTextureConfig, import("./extends/ImageTexture").ImageTexture, import("@vis-three/middleware").EngineSupport, TextureCompiler> | import("@vis-three/middleware").Processor<import("./TextureConfig").LoadTextureConfig, import("./extends/LoadTexture").LoadTexture, import("@vis-three/middleware").EngineSupport, TextureCompiler> | import("@vis-three/middleware").Processor<import("./TextureConfig").VideoTextureConfig, import("./extends/VideoTexture").VideoTexture, import("@vis-three/middleware").EngineSupport, TextureCompiler>)[];
    extend: typeof TextureExtend;
};
export default _default;
