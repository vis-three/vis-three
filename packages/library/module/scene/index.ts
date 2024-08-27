import { defineModule, SUPPORT_LIFE_CYCLE } from "@vis-three/tdcm";
import SceneExtend, { SceneEngineSupport } from "./SceneExtend";
import SceneRule from "./SceneRule";
import SceneModel from "./models/SceneModel";

export * from "./SceneConfig";
export * from "./SceneExtend";

export default defineModule<SceneEngineSupport>({
  type: "scene",
  object: true,
  rule: SceneRule,
  models: [SceneModel],
  extend: SceneExtend,
  lifeOrder: SUPPORT_LIFE_CYCLE.THREE + 1,
});
