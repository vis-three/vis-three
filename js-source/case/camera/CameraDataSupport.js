import { DataSupport } from "../../middleware/DataSupport";
import { CameraRule } from "./CameraRule";
export class CameraDataSupport extends DataSupport {
    constructor(data) {
        !data && (data = {});
        super(CameraRule, data);
    }
}
//# sourceMappingURL=CameraDataSupport.js.map