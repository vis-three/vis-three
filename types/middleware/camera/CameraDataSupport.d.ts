import { Camera } from "three";
import { MODULETYPE } from "../constants/MODULETYPE";
import { ObjectDataSupport } from "../object/ObjectDataSupport";
import { CameraCompiler, CameraCompilerTarget } from "./CameraCompiler";
import { CameraConfigAllType } from "./CameraConfig";
import { CameraRule } from "./CameraRule";
export declare class CameraDataSupport extends ObjectDataSupport<CameraRule, CameraCompiler, CameraConfigAllType, CameraCompilerTarget, Camera> {
    MODULE: MODULETYPE;
    constructor(data?: CameraCompilerTarget);
}
