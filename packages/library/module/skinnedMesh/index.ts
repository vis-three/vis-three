import { ObjectRule } from "@vis-three/module-object";
import { defineModule, SUPPORT_LIFE_CYCLE } from "@vis-three/tdcm";
import SkinnedMeshModel from "./models/SkinnedMeshModel";

export * from "./SkinnedMeshConfig";

export default defineModule({
  type: "skinnedMesh",
  object: true,
  rule: ObjectRule,
  models: [SkinnedMeshModel],
  lifeOrder: SUPPORT_LIFE_CYCLE.THREE,
});
