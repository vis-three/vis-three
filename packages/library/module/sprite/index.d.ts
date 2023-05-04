import { SUPPORT_LIFE_CYCLE } from "@vis-three/middleware";
import { SpriteCompiler } from "./SpriteCompiler";
import { SpriteRule } from "./SpriteRule";
export * from "./SpriteCompiler";
export * from "./SpriteConfig";
declare const _default: {
    type: string;
    object: boolean;
    compiler: typeof SpriteCompiler;
    rule: SpriteRule;
    processors: import("@vis-three/middleware").Processor<import("./SpriteConfig").SpriteConfig, import("three").Sprite, import("@vis-three/middleware").EngineSupport, SpriteCompiler>[];
    lifeOrder: SUPPORT_LIFE_CYCLE;
};
export default _default;
