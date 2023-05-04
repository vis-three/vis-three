import { LightCompiler } from "./LightCompiler";
import { LightRule } from "./LightRule";

import AmbientLightProcessor from "./processors/AmbientLightProcessor";
import DirectionalLightProcessor from "./processors/DirectionalLightProcessor";
import HemisphereLightProcessor from "./processors/HemisphereLightProcessor";
import PointLightProcessor from "./processors/PointLightProcessor";
import RectAreaLightProcessor from "./processors/RectAreaLightProcessor";
import SpotLightProcessor from "./processors/SpotLightProcessor";
import { SUPPORT_LIFE_CYCLE } from "@vis-three/middleware";

export * from "./LightConfig";
export * from "./LightCompiler";

export default {
  type: "light",
  object: true,
  compiler: LightCompiler,
  rule: LightRule,
  processors: [
    AmbientLightProcessor,
    PointLightProcessor,
    DirectionalLightProcessor,
    HemisphereLightProcessor,
    RectAreaLightProcessor,
    SpotLightProcessor,
  ],
  lifeOrder: SUPPORT_LIFE_CYCLE.THREE,
};
