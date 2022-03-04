import { ObjectDataSupport } from "../object/ObjectDataSupport";
import { CameraRule } from "./CameraRule";
export class CameraDataSupport extends ObjectDataSupport {
    constructor(data) {
        !data && (data = {});
        super(CameraRule, data);
    }
}
//# sourceMappingURL=CameraDataSupport.js.map