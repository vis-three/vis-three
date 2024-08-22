import { defineModule, SUPPORT_LIFE_CYCLE } from "@vis-three/tdcm";
import AmbientLightModel from "./models/AmbientLightModel";
import DirectionalLightModel from "./models/DirectionalLightModel";
import HemisphereLightModel from "./models/HemisphereLightModel";
import PointLightModel from "./models/PointLightModel";
import RectAreaLightModel from "./models/RectAreaLightModel";
import SpotLightModel from "./models/SpotLightModel";

export * from "./LightConfig";

export default defineModule({
  type: "light",
  object: true,
  models: [
    AmbientLightModel,
    DirectionalLightModel,
    HemisphereLightModel,
    PointLightModel,
    RectAreaLightModel,
    SpotLightModel,
  ],
  lifeOrder: SUPPORT_LIFE_CYCLE.THREE,
});
