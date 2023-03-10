import { Camera } from "three";
import { CameraConfigAllType } from "./CameraConfig";
import { ObjectCompiler } from "../object/ObjectCompiler";
import { SetSizeEvent } from "@vis-three/core";

export class CameraCompiler extends ObjectCompiler<
  CameraConfigAllType,
  Camera
> {
  cacheCameraMap = new WeakMap<Camera, (event: SetSizeEvent) => void>();

  constructor() {
    super();
  }
}
