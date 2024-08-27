import { defineModule, SUPPORT_LIFE_CYCLE } from "@vis-three/tdcm";
import ShapeModel from "./models/ShapeModel";

export * from "./ShapeConfig";

export default defineModule({
  type: "shape",
  models: [ShapeModel],
  lifeOrder: SUPPORT_LIFE_CYCLE.ONE,
});
