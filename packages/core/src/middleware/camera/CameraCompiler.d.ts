import { Camera } from "three";
import { CameraConfigAllType } from "./CameraConfig";
import { ObjectCompiler } from "../object/ObjectCompiler";
import { MODULETYPE } from "../constants/MODULETYPE";
export declare class CameraCompiler extends ObjectCompiler<CameraConfigAllType, Camera> {
    MODULE: MODULETYPE;
    constructor();
}
