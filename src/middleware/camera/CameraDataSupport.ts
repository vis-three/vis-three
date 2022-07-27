import { Camera } from "three";
import { CompilerTarget } from "../../core/Compiler";
import { IgnoreAttribute } from "../../core/ProxyBroadcast";
import { MODULETYPE } from "../constants/MODULETYPE";
import { ObjectDataSupport } from "../object/ObjectDataSupport";
import { CameraCompiler } from "./CameraCompiler";
import { CameraConfigAllType } from "./CameraConfig";
import { CameraRule } from "./CameraRule";
export class CameraDataSupport extends ObjectDataSupport<
  CameraConfigAllType,
  Camera,
  CameraCompiler
> {
  MODULE: MODULETYPE = MODULETYPE.CAMERA;

  constructor(
    data?: CompilerTarget<CameraConfigAllType>,
    ignore?: IgnoreAttribute
  ) {
    !data && (data = {});
    super(CameraRule, data, ignore);
  }
}
