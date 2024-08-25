import { SUPPORT_LIFE_CYCLE } from "@vis-three/tdcm";
import { defineModule } from "@vis-three/tdcm";
import FloatParticleModel from "./models/FloatParticleModel";

export default defineModule({
  type: "particle",
  object: true,
  models: [FloatParticleModel],
  lifeOrder: SUPPORT_LIFE_CYCLE.THREE,
});
