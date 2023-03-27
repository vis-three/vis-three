import { SpriteCompiler } from "./SpriteCompiler";
import SpriteProcessor from "./SpriteProcessor";
import { SpriteRule } from "./SpriteRule";

export default {
  type: "sprite",
  object: true,
  compiler: SpriteCompiler,
  rule: SpriteRule,
  processors: [SpriteProcessor],
};
