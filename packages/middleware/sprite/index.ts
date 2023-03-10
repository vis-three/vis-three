import { defineModule } from "../module";
import { SpriteCompiler } from "./SpriteCompiler";
import SpriteProcessor from "./SpriteProcessor";
import { SpriteRule } from "./SpriteRule";

export default defineModule({
  type: "sprite",
  compiler: SpriteCompiler,
  rule: SpriteRule,
  processors: [SpriteProcessor],
});
