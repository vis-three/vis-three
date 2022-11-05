import { Camera } from "three";
import { CompilerTarget } from "../../core/Compiler";
import { IgnoreAttribute } from "../../core/DataContainer";
import { MODULETYPE } from "../constants/MODULETYPE";
import { ObjectDataSupport } from "../object/ObjectDataSupport";
import { CameraCompiler } from "./CameraCompiler";
import { CameraConfigAllType } from "./CameraConfig";
export declare class CameraDataSupport extends ObjectDataSupport<
  CameraConfigAllType,
  Camera,
  CameraCompiler
> {
  MODULE: MODULETYPE;
  constructor(
    data?: CompilerTarget<CameraConfigAllType>,
    ignore?: IgnoreAttribute
  );
}
