import { Camera } from "three";
import { CameraConfigAllType } from "./CameraConfig";
import { ObjectCompiler, ObjectCompilerTarget } from "../object/ObjectCompiler";
import { MODULETYPE } from "../constants/MODULETYPE";
export interface CameraCompilerTarget extends ObjectCompilerTarget<CameraConfigAllType> {
    [key: string]: CameraConfigAllType;
}
export declare class CameraCompiler extends ObjectCompiler<CameraConfigAllType, CameraCompilerTarget, Camera> {
    MODULE: MODULETYPE;
    constructor();
}
