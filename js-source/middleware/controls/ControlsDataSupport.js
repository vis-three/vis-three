import { DataSupport } from "../../core/DataSupport";
import { ControlsRule } from "./ControlsRule";
export class ControlsDataSupport extends DataSupport {
    constructor(data) {
        !data && (data = {});
        super(ControlsRule, data);
    }
}
//# sourceMappingURL=ControlsDataSupport.js.map