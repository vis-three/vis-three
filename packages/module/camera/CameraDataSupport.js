import { MODULETYPE } from "../constants";
import { ObjectDataSupport } from "../object/ObjectDataSupport";
import { CameraRule } from "./CameraRule";
export class CameraDataSupport extends ObjectDataSupport {
    MODULE = MODULETYPE.CAMERA;
    constructor(data = []) {
        super(CameraRule, data);
    }
}
