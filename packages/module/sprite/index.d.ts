import { SpriteCompiler } from "./SpriteCompiler";
import { SpriteRule } from "./SpriteRule";
declare const _default: {
    type: string;
    object: boolean;
    compiler: typeof SpriteCompiler;
    rule: SpriteRule;
    processors: import("@vis-three/middleware").Processor<import("./SpriteConfig").SpriteConfig, import("three").Sprite, import("@vis-three/middleware").EngineSupport, SpriteCompiler>[];
};
export default _default;
