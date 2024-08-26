import { defineModule, SUPPORT_LIFE_CYCLE } from "@vis-three/tdcm";
export * from "./PathConfig";
import PathModel from "./models/PathModel";
import Path3Model from "./models/Path3Model";

export default defineModule({
  type: "path",
  models: [PathModel, Path3Model],
  lifeOrder: SUPPORT_LIFE_CYCLE.ZERO,
});
