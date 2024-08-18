import { defineModule, SUPPORT_LIFE_CYCLE } from "@vis-three/tdcm";
import AnimationActionModel from "./models/AnimationActionModel";

export * from "./AnimationActionConfig";

export default defineModule({
  type: "animationAction",
  models: [AnimationActionModel],
  lifeOrder: SUPPORT_LIFE_CYCLE.NINE + 1,
});
