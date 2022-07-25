import { Camera } from "three";
import { CameraConfigAllType } from "./CameraConfig";
import { ObjectCompiler, ObjectCompilerTarget } from "../object/ObjectCompiler";
import { MODULETYPE } from "../constants/MODULETYPE";
import { Compiler } from "../../core/Compiler";
import PerspectiveCameraProcessor from "./processor/PerspectiveCameraProcessor";
import OrthographicCameraProcessor from "./processor/OrthographicCameraProcessor";

export interface CameraCompilerTarget
  extends ObjectCompilerTarget<CameraConfigAllType> {
  [key: string]: CameraConfigAllType;
}

export class CameraCompiler extends ObjectCompiler<
  CameraConfigAllType,
  CameraCompilerTarget,
  Camera
> {
  MODULE: MODULETYPE = MODULETYPE.CAMERA;

  constructor() {
    super();
  }
}

Compiler.processor(PerspectiveCameraProcessor);
Compiler.processor(OrthographicCameraProcessor);
