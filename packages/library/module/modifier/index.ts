import { SUPPORT_LIFE_CYCLE } from "@vis-three/tdcm";
import { ModifierCompiler } from "./ModifierCompiler";
import { defineModule } from "@vis-three/tdcm";
import BooleanModifierModel from "./models/BooleanModifierModel";

export * from "./ModifierCompiler";
export * from "./ModifierConfig";

export default defineModule({
  type: "modifier",
  compiler: ModifierCompiler,
  models: [BooleanModifierModel],
  lifeOrder: SUPPORT_LIFE_CYCLE.NINE,
});
