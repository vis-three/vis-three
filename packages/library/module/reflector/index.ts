import { defineModule, SUPPORT_LIFE_CYCLE } from "@vis-three/tdcm";
import { ObjectRule } from "@vis-three/module-object";
import ReflectorModel from "./models/ReflectorModel";

export default defineModule({
  type: "reflector",
  object: true,
  rule: ObjectRule,
  models: [ReflectorModel],
  lifeOrder: SUPPORT_LIFE_CYCLE.THREE,
});
