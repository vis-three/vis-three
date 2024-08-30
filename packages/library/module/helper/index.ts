import { defineModule, SUPPORT_LIFE_CYCLE } from "@vis-three/tdcm";
import ObjectHelperModel from "./models/ObjectHelperModel";

export * from "./HelperConfig";

export default defineModule({
  type: "helper",
  models: [ObjectHelperModel],
  lifeOrder: SUPPORT_LIFE_CYCLE.FOUR,
});
