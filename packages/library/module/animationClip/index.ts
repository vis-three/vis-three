import { defineModule, SUPPORT_LIFE_CYCLE } from "@vis-three/tdcm";

import AnimationClipModel from "./models/AnimationClipModel";
import LoadAnimationClipModel from "./models/LoadAnimationClipModel";

export * from "./AnimationClipConfig";

export default defineModule({
  type: "animationClip",
  models: [AnimationClipModel, LoadAnimationClipModel],
  lifeOrder: SUPPORT_LIFE_CYCLE.ZERO,
});
