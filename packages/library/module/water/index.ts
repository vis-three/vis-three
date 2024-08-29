import { defineModule, SUPPORT_LIFE_CYCLE } from "@vis-three/tdcm";
import { ObjectRule } from "@vis-three/module-object";
import DeepWaterModel from "./models/DeepWaterModel";

export default defineModule({
  type: "water",
  object: true,
  rule: ObjectRule,
  models: [DeepWaterModel],
  lifeOrder: SUPPORT_LIFE_CYCLE.THREE,
});
