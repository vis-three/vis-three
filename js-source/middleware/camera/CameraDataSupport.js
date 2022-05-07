import { MODULETYPE } from "../constants/MODULETYPE";
import { ObjectDataSupport } from "../object/ObjectDataSupport";
import { CameraRule } from "./CameraRule";
export class CameraDataSupport extends ObjectDataSupport {
    MODULE = MODULETYPE.CAMERA;
    constructor(data, ignore) {
        !data && (data = {});
        super(CameraRule, data, ignore);
    }
}
//# sourceMappingURL=CameraDataSupport.js.map