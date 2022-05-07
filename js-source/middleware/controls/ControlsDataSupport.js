import { DataSupport } from "../../core/DataSupport";
import { MODULETYPE } from "../constants/MODULETYPE";
import { ControlsRule } from "./ControlsRule";
export class ControlsDataSupport extends DataSupport {
    MODULE = MODULETYPE.CONTROLS;
    constructor(data, ignore) {
        !data && (data = {});
        super(ControlsRule, data, ignore);
    }
}
//# sourceMappingURL=ControlsDataSupport.js.map