import { defineModule, SUPPORT_LIFE_CYCLE } from "@vis-three/tdcm";
import SpriteRule from "./SpriteRule";
import SpriteModel from "./models/SpriteModel";

export * from "./SpriteConfig";

export default defineModule({
  type: "sprite",
  object: true,
  rule: SpriteRule,
  models: [SpriteModel],
  lifeOrder: SUPPORT_LIFE_CYCLE.THREE,
});
