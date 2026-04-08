import { SUPPORT_LIFE_CYCLE } from "@vis-three/tdcm";
import { defineModule } from "@vis-three/tdcm";
import { ObjectRule } from "@vis-three/module-object";
import Object3dModel from "./models/Object3dModel";
import LoadObject3DModel from "./models/LoadObject3DModel";

export * from "./Object3DConfig";

export default defineModule({
  type: "object3D",
  object: true,
  rule: ObjectRule,
  models: [Object3dModel, LoadObject3DModel],
  lifeOrder: SUPPORT_LIFE_CYCLE.THREE,
});
