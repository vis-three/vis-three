import { SUPPORT_LIFE_CYCLE } from "@vis-three/middleware";
import { SpriteCompiler } from "./SpriteCompiler";
import SpriteProcessor from "./processors/SpriteProcessor";
import { SpriteRule } from "./SpriteRule";

export * from "./SpriteCompiler";
export * from "./SpriteConfig";

export default {
  type: "sprite",
  object: true,
  compiler: SpriteCompiler,
  rule: SpriteRule,
  processors: [SpriteProcessor],
  lifeOrder: SUPPORT_LIFE_CYCLE.THREE,
};
