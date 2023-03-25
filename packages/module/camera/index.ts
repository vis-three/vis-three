import { CameraCompiler } from "./CameraCompiler";
import CameraExtend from "./CameraExtend";
import { CameraRule } from "./CameraRule";
import OrthographicCameraProcessor from "./OrthographicCameraProcessor";
import PerspectiveCameraProcessor from "./PerspectiveCameraProcessor";

export default {
  type: "camera",
  object: true,
  compiler: CameraCompiler,
  rule: CameraRule,
  processors: [OrthographicCameraProcessor, PerspectiveCameraProcessor],
  extend: CameraExtend,
};
