import { defineModule, SUPPORT_LIFE_CYCLE } from "@vis-three/tdcm";
import SkeletonModel from "./models/SkeletonModel";
import LoadSkeletonModel from "./models/LoadSkeletonModel";

export * from "./SkeletonConfig";

export default defineModule({
  type: "skeleton",
  models: [SkeletonModel, LoadSkeletonModel],
  lifeOrder: SUPPORT_LIFE_CYCLE.THREE - 1,
});
