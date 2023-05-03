import { SUPPORT_LIFE_CYCLE } from "@vis-three/middleware";
import { CameraCompiler } from "./CameraCompiler";
import CameraExtend from "./CameraExtend";
import { CameraRule } from "./CameraRule";
import OrthographicCameraProcessor from "./processors/OrthographicCameraProcessor";
import PerspectiveCameraProcessor from "./processors/PerspectiveCameraProcessor";

export default {
  type: "camera",
  object: true,
  compiler: CameraCompiler,
  rule: CameraRule,
  processors: [OrthographicCameraProcessor, PerspectiveCameraProcessor],
  extend: CameraExtend,
  lifeOrder: SUPPORT_LIFE_CYCLE.THREE,
};
