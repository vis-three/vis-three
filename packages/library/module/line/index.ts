import { defineModule, SUPPORT_LIFE_CYCLE } from "@vis-three/tdcm";
import { ObjectRule } from "@vis-three/module-object";
import LineModel from "./models/LineModel";
import LineSegmentsModel from "./models/LineSegmentsModel";

export * from "./LineConfig";

export default defineModule({
  type: "line",
  object: true,
  rule: ObjectRule,
  models: [LineModel, LineSegmentsModel],
  lifeOrder: SUPPORT_LIFE_CYCLE.THREE,
});
