import { LightCompiler } from "./LightCompiler";
import { LightRule } from "./LightRule";

import AmbientLightProcessor from "./AmbientLightProcessor";
import DirectionalLightProcessor from "./DirectionalLightProcessor";
import HemisphereLightProcessor from "./HemisphereLightProcessor";
import PointLightProcessor from "./PointLightProcessor";
import RectAreaLightProcessor from "./RectAreaLightProcessor";
import SpotLightProcessor from "./SpotLightProcessor";
import { SUPPORT_LIFE_CYCLE } from "@vis-three/middleware";

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
