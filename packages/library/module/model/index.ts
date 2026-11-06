import { SUPPORT_LIFE_CYCLE } from "@vis-three/tdcm";
import { defineModule } from "@vis-three/tdcm";
import { ObjectRule } from "@vis-three/module-object";
import LoadModelModel from "./models/LoadModelModel";

export default defineModule({
  type: "model",
  object: true,
  rule: ObjectRule,
  models: [LoadModelModel],
  lifeOrder: SUPPORT_LIFE_CYCLE.THREE,
});
