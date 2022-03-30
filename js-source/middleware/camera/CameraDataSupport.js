import { MODULETYPE } from "../constants/MODULETYPE";
import { ObjectDataSupport } from "../object/ObjectDataSupport";
import { CameraRule } from "./CameraRule";
export class CameraDataSupport extends ObjectDataSupport {
    MODULE = MODULETYPE.CAMERA;
    constructor(data) {
        !data && (data = {});
        super(CameraRule, data);
    }
}
//# sourceMappingURL=CameraDataSupport.js.map