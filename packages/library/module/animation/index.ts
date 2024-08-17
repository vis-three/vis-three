import { defineModule, SUPPORT_LIFE_CYCLE } from "@vis-three/tdcm";
import AnimationRule from "./AnimationRule";
import ScriptAnimationModel from "./models/ScriptAnimationModel";
import MixerAnimationModel from "./models/MixerAnimationModel";

export * from "./AnimationConfig";
export * from "./AniScriptManager";

export default defineModule({
  type: "animation",
  rule: AnimationRule,
  models: [ScriptAnimationModel, MixerAnimationModel],
  lifeOrder: SUPPORT_LIFE_CYCLE.NINE,
});
