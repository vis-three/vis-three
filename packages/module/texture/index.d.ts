import { TextureCompiler } from "./TextureCompiler";
declare const _default: {
    type: string;
    compiler: typeof TextureCompiler;
    rule: import("@vis-three/middleware").Rule<TextureCompiler>;
    processors: (import("@vis-three/middleware").Processor<import("./TextureConfig").CanvasTextureConfig, import("three").CanvasTexture, import("@vis-three/middleware").EngineSupport, TextureCompiler> | import("@vis-three/middleware").Processor<import("./TextureConfig").CubeTextureConfig, import("three").CubeTexture, import("@vis-three/middleware").EngineSupport, TextureCompiler> | import("@vis-three/middleware").Processor<import("./TextureConfig").ImageTextureConfig, import("@vis-three/core").ImageTexture, import("@vis-three/middleware").EngineSupport, TextureCompiler> | import("@vis-three/middleware").Processor<import("./TextureConfig").LoadTextureConfig, import("@vis-three/core").LoadTexture, import("@vis-three/middleware").EngineSupport, TextureCompiler> | import("@vis-three/middleware").Processor<import("./TextureConfig").VideoTextureConfig, import("@vis-three/core").VideoTexture, import("@vis-three/middleware").EngineSupport, TextureCompiler>)[];
};
export default _default;
