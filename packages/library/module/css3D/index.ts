import { defineModule, SUPPORT_LIFE_CYCLE } from "@vis-three/tdcm";
import { ObjectRule } from "@vis-three/module-object";
import CSS3DPlaneModel from "./models/CSS3DPlaneModel";
import CSS3DSpriteModel from "./models/CSS3DSpriteModel";

export * from "./CSS3DConfig";

export default defineModule({
  type: "css3D",
  object: true,
  rule: ObjectRule,
  models: [CSS3DPlaneModel, CSS3DSpriteModel],
  lifeOrder: SUPPORT_LIFE_CYCLE.THREE,
});
