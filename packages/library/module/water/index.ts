import { SUPPORT_LIFE_CYCLE } from "@vis-three/middleware";
import { WaterCompiler } from "./WaterCompiler";
import { WaterRule } from "./WaterRule";
import DeepWaterProcessor from "./processors/DeepWaterProcessor";

export default {
  type: "water",
  object: true,
  compiler: WaterCompiler,
  rule: WaterRule,
  processors: [DeepWaterProcessor],
  lifeOrder: SUPPORT_LIFE_CYCLE.THREE,
};
