import CameraExtend, { CameraEngineSupport } from "./CameraExtend";
import { defineModule, SUPPORT_LIFE_CYCLE } from "@vis-three/tdcm";
import { ObjectRule } from "@vis-three/module-object";
import OrthographicCameraModel from "./models/OrthographicCameraModel";
import PerspectiveCameraModel from "./models/PerspectiveCameraModel";

export * from "./CameraConfig";
export * from "./CameraExtend";

export default defineModule<CameraEngineSupport>({
  type: "camera",
  object: true,
  rule: ObjectRule,
  extend: CameraExtend,
  models: [OrthographicCameraModel, PerspectiveCameraModel],
  lifeOrder: SUPPORT_LIFE_CYCLE.THREE,
});
