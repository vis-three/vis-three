import { Camera } from "three";
import { MODULETYPE } from "../constants/MODULETYPE";
import { ObjectDataSupport } from "../object/ObjectDataSupport";
import { CameraCompiler } from "./CameraCompiler";
import { CameraConfigAllType } from "./CameraConfig";
export declare class CameraDataSupport extends ObjectDataSupport<CameraConfigAllType, Camera, CameraCompiler> {
    MODULE: MODULETYPE;
    constructor(data?: Array<CameraConfigAllType>);
}
