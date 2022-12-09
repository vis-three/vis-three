import { Camera } from "three";
import { CameraConfigAllType } from "./CameraConfig";
import { ObjectCompiler } from "../object/ObjectCompiler";
import { MODULETYPE } from "../../core/middleware/MODULETYPE";
import { Compiler } from "../../core/Compiler";
import PerspectiveCameraProcessor from "./processor/PerspectiveCameraProcessor";
import OrthographicCameraProcessor from "./processor/OrthographicCameraProcessor";

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
