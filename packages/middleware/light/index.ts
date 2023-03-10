import { defineModule } from "../module";
import { LightCompiler } from "./LightCompiler";
import { LightRule } from "./LightRule";

import AmbientLightProcessor from "./AmbientLightProcessor";
import DirectionalLightProcessor from "./DirectionalLightProcessor";
import HemisphereLightProcessor from "./HemisphereLightProcessor";
import PointLightProcessor from "./PointLightProcessor";
import RectAreaLightProcessor from "./RectAreaLightProcessor";
import SpotLightProcessor from "./SpotLightProcessor";

export default defineModule({
  type: "light",
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
});
