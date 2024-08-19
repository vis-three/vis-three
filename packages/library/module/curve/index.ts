import { defineModule, SUPPORT_LIFE_CYCLE } from "@vis-three/tdcm";
import ArcCurveModel from "./models/ArcCurveModel";
import LineCurveModel from "./models/LineCurveModel";

export * from "./extends";
export * from "./CurveConfig";

export default defineModule({
  type: "curve",
  models: [ArcCurveModel, LineCurveModel],
  lifeOrder: SUPPORT_LIFE_CYCLE.ZERO - 1,
});
