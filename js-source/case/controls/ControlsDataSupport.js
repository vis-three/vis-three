import { DataSupport } from "../../middleware/DataSupport";
import { getTransformControlsConfig } from "./ControlsConfig";
import { ControlsRule } from "./ControlsRule";
export class ControlsDataSupport extends DataSupport {
    constructor(data) {
        !data && (data = {
            TransformControls: getTransformControlsConfig()
        });
        super(ControlsRule, data);
    }
}
//# sourceMappingURL=ControlsDataSupport.js.map