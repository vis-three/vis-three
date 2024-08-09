import { defineModule, SUPPORT_LIFE_CYCLE } from "@vis-three/tdcm";
import NumberConstraintorModel from "./models/NumberConstraintorModel";
import BoundingBoxConstraintorModel from "./models/BoundingBoxConstraintorModel";

export default defineModule({
  type: "constraintor",
  models: [NumberConstraintorModel, BoundingBoxConstraintorModel],
  lifeOrder: SUPPORT_LIFE_CYCLE.NINE,
});
