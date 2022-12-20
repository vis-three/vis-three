import { Camera } from "three";
import { CameraConfigAllType } from "./CameraConfig";
import { ObjectCompiler } from "../object/ObjectCompiler";
import PerspectiveCameraProcessor from "./processor/PerspectiveCameraProcessor";
import OrthographicCameraProcessor from "./processor/OrthographicCameraProcessor";
import { MODULETYPE } from "../constants";
import { Compiler } from "../module";

export class CameraCompiler extends ObjectCompiler<
  CameraConfigAllType,
  Camera
> {
  MODULE: MODULETYPE = MODULETYPE.CAMERA;

  constructor() {
    super();
  }
}

Compiler.processor(PerspectiveCameraProcessor);
Compiler.processor(OrthographicCameraProcessor);
